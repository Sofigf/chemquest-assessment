# Chem Quest 3D — Assessment Studio

A GitHub Pages website for hydrocarbon pre/post assessment, with anonymous participants and interactive 3D isomers.

## Included

- 20 identical multiple-choice questions (A–D) in PRE and POST, in the same order.
- Six pictured questions per stage. Models support drag/keyboard rotation, zoom and hydrogen visibility.
- Anonymous participant labels A–AD for a class of 30; supports 1–100 participants.
- Separate pre/post answers, automatic scoring, paired results, group N-gain and CSV export.
- A Google Sheets backend in `apps-script/Code.gs`.

## Storage

Until a Google Sheets deployment is connected, the website clearly uses **this browser's storage only**. It can be tried on one device, but it does not synchronise a class across devices. For classroom collection, connect the Google Sheets backend first.

### Connect Google Sheets

1. Create a private Google spreadsheet. Open **Extensions → Apps Script**.
2. Paste `apps-script/Code.gs` into Code.gs and save it. This script is bound to the response spreadsheet. Google will request the Sheets permission needed to open the configured database by ID. Review that permission before authorising it.
3. Run **setup**. It creates four database tabs without overwriting existing data. Save the private administrator key shown in the dialog.
4. Deploy as **Web app**, executing as yourself, access **Anyone**. Keep the spreadsheet private; do not publish its tabs.
5. Put the returned deployment URL ending `/exec` into `public/config.js`, rebuild and commit `docs/`. This URL is public configuration, not a secret. Alternatively set it through the website's Google Sheets button on each device.
6. On the teacher's browser, enter the private administrator key in **Google Sheets** settings. It is stored for the browser session only and is never committed to this repository.
7. Create a class, download the codes once and distribute each code privately. Open PRE, then teach, open POST and finally close the class.

The backend checks access codes, scores answers on the server, uses a script-wide lock to prevent duplicate submissions, and requires the administrator key for private reports and class management. Student names are never requested. Publicly hosted source includes the draft question key; review suitability before using it for a controlled examination.

## Presentation dataset

The Presentation tab is explicitly labelled illustrative data. Its 30 imported summary rows reproduce the presentation means 55.8 and 84.2, gain +28.4 and group N-gain approximately 0.64. These rows are not actual student answers or research records and have no invented submission dates. Active-class results are calculated separately and are never forced to match those figures.

## Development

Node 22+:

```sh
npm install
npm run dev
npm run build
```

`npm run build` writes `docs/`. In GitHub **Settings → Pages**, deploy from the **main** branch and **/docs** folder. The committed `docs/` folder is ready for GitHub Pages without a build workflow.

Models use generated, representative 3D coordinates; they are not experimental geometry measurements. Questions are draft items and need teacher validation. Identical pre/post questions may introduce a practice effect.
