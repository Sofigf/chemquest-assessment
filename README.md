# Chem Quest 3D — Assessment Studio

Hydrocarbon pre/post assessment hosted on GitHub Pages, with a connected persistent database. Google login and Google Sheets are not required.

## Student website

https://sofigf.github.io/chemquest-assessment/

- 20 identical multiple-choice questions (A–D) in PRE and POST, in the same order.
- Six pictured questions per stage, with draggable/keyboard-controlled 3D isomer models.
- Server-side scoring and duplicate-submission protection.
- Anonymous participant codes. Student names are never requested.
- Draft selections may be retained in the browser session. Submitted answers are stored on the server, not in browser-only storage.

The connection indicator checks the live database. Students need only the 16-character code provided by the teacher.

## Teacher panel

Open **Panel guru** on the student website. The panel uses Sign in with ChatGPT and permits only the configured teacher account. No password, administrator key or database credential is stored in this repository.

1. Create a class of 1–100 participants; 30 generates labels A–AD.
2. Download the access-code CSV immediately. Raw codes are shown once; only hashes remain in the database.
3. Open PRE. After the lesson, open POST. Finally close the test.
4. Review paired results and export CSV. Means use complete pairs only; group N-gain is undefined at pre = 100.

## Database

The API origin is public configuration in `public/config.js`. Only anonymous assessment start/submit operations are accepted from the GitHub website; they require a valid participant code and an open stage. Class management and participant reports require the configured teacher's authenticated identity. Other origins are rejected. The database and answer key are not hosted by GitHub Pages.

The Google Sheets script retained in `apps-script/` is a legacy optional adapter; it is not used by the live website.

## Presentation dataset

The Presentation view is explicitly labelled illustrative. Its 30 imported summary rows reproduce means 55.8 and 84.2, gain +28.4 and group N-gain approximately 0.64. These are not student answers or research records. Actual submissions are stored and calculated separately and are never forced to match the presentation.

## Development

Node 22+:

```sh
npm install
npm run dev
npm run build
```

Build output is `docs/`; Pages serves the `main` branch, `/docs` folder. Commit both source and updated build output after changes. No secrets belong in client configuration.

Models use representative generated coordinates. The draft questions require teacher validation; identical pre/post items can introduce a practice effect.
