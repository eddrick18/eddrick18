import assert from 'node:assert/strict';
import { test, mock } from 'node:test';
import handler from '../api/visitors.js';

const original={...process.env};
function response(){return {headers:{},statusCode:200,setHeader(k,v){this.headers[k]=v;},end(body){this.body=JSON.parse(body);}};}
const request=(method='POST',body={visitorId:'62b42534-945f-40b5-a3b0-44f0446d364d'})=>({method,body,headers:{host:'eddrickmiano.vercel.app',origin:'https://eddrickmiano.vercel.app','content-type':'application/json','x-forwarded-for':'203.0.113.7'}});
function configure(){process.env.UPSTASH_REDIS_REST_URL='https://example.upstash.io';process.env.UPSTASH_REDIS_REST_TOKEN='test-secret';process.env.VERCEL_ENV='production';}
test('visitor API boundary and storage contract',async t=>{
 t.afterEach(()=>{mock.restoreAll(); for(const k of ['UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN','KV_REST_API_URL','KV_REST_API_TOKEN','VERCEL_ENV']){if(original[k]===undefined) delete process.env[k];else process.env[k]=original[k];}});
 await t.test('rejects invalid IDs and cross-site registration before accessing storage',async()=>{
  configure(); let calls=0;mock.method(globalThis,'fetch',async()=>{calls++;throw Error('unexpected');});
  for(const body of [{visitorId:'invalid'}, {},{visitorId:7}]){const res=response();await handler(request('POST',body),res);assert.equal(res.statusCode,400);}
  const req=request();req.headers.origin='https://other.example';const res=response();await handler(req,res);assert.equal(res.statusCode,403);assert.equal(calls,0);
 });
 await t.test('missing storage returns unavailable, not a fabricated zero',async()=>{
  delete process.env.UPSTASH_REDIS_REST_URL;delete process.env.UPSTASH_REDIS_REST_TOKEN;const res=response();await handler(request('GET'),res);assert.equal(res.statusCode,503);assert.equal(res.body.count,undefined);
 });
 await t.test('accepts Vercel KV integration variable names',async()=>{
  delete process.env.UPSTASH_REDIS_REST_URL;delete process.env.UPSTASH_REDIS_REST_TOKEN;
  process.env.KV_REST_API_URL='https://example.upstash.io';process.env.KV_REST_API_TOKEN='test-kv-secret';
  mock.method(globalThis,'fetch',async(url,options)=>{assert.equal(url,'https://example.upstash.io');assert.equal(options.headers.Authorization,'Bearer test-kv-secret');return {ok:true,json:async()=>({result:3})};});
  const res=response();await handler(request('GET'),res);assert.equal(res.statusCode,200);assert.equal(res.body.count,3);
 });
 await t.test('uses an atomic storage operation and a stable hashed identity',async()=>{
  configure();const commands=[];mock.method(globalThis,'fetch',async(url,options)=>{commands.push(JSON.parse(options.body));assert.equal(options.headers.Authorization,'Bearer test-secret');return {ok:true,json:async()=>({result:7})};});
  for(let i=0;i<2;i++){const res=response();await handler(request(),res);assert.equal(res.body.count,7);assert.equal(res.headers['Cache-Control'],'no-store');}
  assert.equal(commands[0][0],'EVAL');assert.match(commands[0][1],/SADD/);assert.match(commands[0][1],/SCARD/);assert.deepEqual(commands[0],commands[1]);assert.ok(!JSON.stringify(commands).includes('62b42534-945f-40b5-a3b0-44f0446d364d'));
 });
 await t.test('GET only reads; preview POST cannot add visitors',async()=>{
  configure();process.env.VERCEL_ENV='preview';const commands=[];mock.method(globalThis,'fetch',async(url,options)=>{commands.push(JSON.parse(options.body));return {ok:true,json:async()=>({result:4})};});
  for(const method of ['GET','POST']){const res=response();await handler(request(method),res);assert.equal(res.body.count,4);}
  assert.deepEqual(commands,[['SCARD','{portfolio-visitors}:ids'],['SCARD','{portfolio-visitors}:ids']]);
 });
 await t.test('storage failures, invalid counts, rate limits, and unsupported methods fail safely',async()=>{
  configure();for(const result of [{error:'private error'}, {result:'bad'}, {result:-1}]){mock.method(globalThis,'fetch',async()=>({ok:true,json:async()=>result}));const res=response();await handler(request(),res);assert.equal(res.statusCode,result.result===-1?429:503);assert.equal(res.body.count,undefined);mock.restoreAll();}
  const res=response();await handler(request('DELETE'),res);assert.equal(res.statusCode,405);
 });
});
