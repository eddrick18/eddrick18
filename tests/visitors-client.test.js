import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createVisitRequest } from '../src/lib/visitors.js';

function browser() {
  const values = new Map();
  return { getItem:key=>values.get(key)??null, setItem:(key,value)=>values.set(key,value), removeItem:key=>values.delete(key) };
}
const site = {hostname:'eddrickmiano.vercel.app',search:'',production:true};
test('repeat visits reuse the browser identity; another browser gets a different identity',()=>{
  const storage=browser();
  const first=createVisitRequest({...site,storage});
  assert.equal(first.method,'POST');
  assert.equal(createVisitRequest({...site,storage}).body,first.body);
  assert.notEqual(createVisitRequest({...site,storage:browser()}).body,first.body);
});
test('owner exclusion persists and never registers a visit',()=>{
  const storage=browser();
  assert.equal(createVisitRequest({...site,storage,search:'?exclude_visits=1'}).method,'GET');
  assert.equal(createVisitRequest({...site,storage}).method,'GET');
});
test('development, previews, and unavailable storage do not generate transient identities',()=>{
  const storage=browser();
  for(const hostname of ['localhost','127.0.0.1','[::1]']) assert.equal(createVisitRequest({...site,hostname,storage}).method,'GET');
  assert.equal(createVisitRequest({...site,storage,production:false}).method,'GET');
  assert.equal(createVisitRequest({...site,storage:{getItem(){throw Error('blocked');}}}).method,'GET');
});
