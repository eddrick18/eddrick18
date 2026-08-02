# Eddrick Portfolio — Final Photo Icon Version

This version uses `public/eddrick-face-tab-icon.png` as the browser-tab photo.

# Eddrick Miano Portfolio

A responsive one-page portfolio built with React and Vite.

This version includes:

- Eddrick's graduation portrait beside the hero name
- A circular photo logo in the fixed navigation bar
- The same portrait as the browser favicon and mobile touch icon
- A responsive layout for desktop, tablet, and mobile

## Run locally

After extracting the ZIP, open the extracted folder in VS Code. The `package.json` file is already at the top level of the folder.

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

The project is configured for:

- GitHub username: `eddrick18`
- Repository: `eddrick18`
- Site URL: `https://eddrick18.github.io/eddrick18/`

In GitHub:

1. Open **Settings**.
2. Open **Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push the project to the `main` branch.

The workflow in `.github/workflows/deploy.yml` will build and publish the site.

## Replace the profile photo

Replace this file while keeping the same filename:

```text
public/profile-photo.jpg
```

## Add project links

Edit `src/data/projects.js`. Each project has a `links` array. Example:

```js
links: [
  { label: "GitHub", url: "https://github.com/your-repository" },
  { label: "Live demo", url: "https://your-demo.com" },
],
```

## Main content files

- `src/data/projects.js`
- `src/data/experience.js`
- `src/data/stack.js`
- `src/components/About.jsx`
- `src/components/Contact.jsx`

The résumé is stored in `public/Eddrick_Miano_Resume_2026.pdf`.

## Layout update

The hero portrait now appears before the name, and the caption below the portrait has been removed.


## Updated résumé

The website résumé links now use `Eddrick_Miano_Resume_2026.pdf`. A version query is included to prevent an older cached PDF from appearing.
