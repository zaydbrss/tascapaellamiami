# Tasca Paella Miami — website

Website for **Tasca Paella**, a Spanish fusion restaurant at Bayside Marketplace,
401 Biscayne Blvd, Unit 1030, Miami, FL 33132.

A static site: plain HTML, CSS and JavaScript. No build step, no framework, no dependencies.
It can be hosted for free on GitHub Pages, Netlify, Vercel or Cloudflare Pages.

## Project structure

```
tasca-paella/
├── index.html            Home page (all sections)
├── 404.html              "Page not found" page
├── favicon.svg           Browser tab icon
├── favicon-32.png        Fallback tab icon for older browsers
├── apple-touch-icon.png  Icon when saved to an iPhone home screen
├── site.webmanifest      App name, colors and icons for phones
├── robots.txt            Tells search engines they may index the site
├── sitemap.xml           Page list for Google Search Console
├── .nojekyll             Tells GitHub Pages to serve files as they are
├── .gitignore            Files Git should ignore
├── README.md             This file
└── assets/
    ├── css/styles.css    All styles
    ├── js/main.js        Menu, tabs, hours, gallery viewer, contact form
    └── images/           Photos, social preview image and app icons
```

## Before going live

Search the project for `YOUR-DOMAIN.com` and replace it with the real address
(in `index.html`, `robots.txt` and `sitemap.xml`).

Confirm these with the restaurant, since they are sample content:

- Opening hours and happy hour times: in `index.html` (Hours & location section)
  **and** in `assets/js/main.js` (the `hours` object that powers "Open now").
  Also update `openingHoursSpecification` in the structured data in `index.html`.
- Menu dishes and prices.
- The three guest testimonials. Replace with real reviews, with permission.
- Photos: the current photos come from Google Maps guest uploads. Replace them
  with the restaurant's own photos, keeping the same file names in
  `assets/images/`.

## Contact form

By default, "Send request" opens WhatsApp with the booking details prefilled,
addressed to +1 786-521-0937. No server is needed.

To receive requests by email instead:

1. Create a free form at https://formspree.io.
2. Copy its endpoint URL, for example `https://formspree.io/f/abcd1234`.
3. In `index.html`, paste it into `data-endpoint=""` on the `<form id="contact-form">` tag.

## Deploy on GitHub Pages

1. Create a new repository on GitHub, for example `tasca-paella`.
2. Upload every file and folder in this project to the root of the repository
   (drag and drop on github.com works, including the `assets` folder).
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
5. After a minute the site is live at `https://YOUR-USERNAME.github.io/tasca-paella/`.

### Custom domain (recommended for a real business)

1. In **Settings → Pages → Custom domain**, enter the domain (e.g. `www.example.com`) and save.
   GitHub adds a `CNAME` file to the repository.
2. At the domain registrar, add a `CNAME` record for `www` pointing to `YOUR-USERNAME.github.io`.
3. Back in GitHub Pages, tick **Enforce HTTPS** once it becomes available.

Note: the "Back to Tasca Paella" button on the 404 page links to `/`. That works with a
custom domain. On a `github.io/tasca-paella/` address, change it to `/tasca-paella/`.

## After launch

- Add the site to Google Search Console and submit `sitemap.xml`.
- Add the website link to the restaurant's Google Business Profile and Instagram bio.
- Test the social preview with the Facebook Sharing Debugger.

## Editing

Open the files in any text editor (VS Code is free). Styles are at the top of
`styles.css` as color and font variables, so the palette can be changed in one place.
