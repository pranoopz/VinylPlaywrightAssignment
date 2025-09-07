# Playwright + TypeScript — TodoMVC

## Prerequisites
- Node.js 18+ (or 20+)
- One-time browser install:
  ```bash
  npx playwright install --with-deps
  ```

## Install
```bash
npm ci   # or: npm install
```

## Run tests
By default:
- **Locally** → headed mode (browser window opens, slowed down with `slowMo`).  
- **In CI** → headless mode (no UI).

Run all tests:
```bash
npm test
```

### Override locally
```bash
# Force headless locally
npx playwright test --headless

# Debug with Inspector
npm run debug
```

### Override in CI (if needed)
```bash
# Force headed in CI (requires xvfb)
npx playwright test --headed
```

## Reports & Artifacts
- HTML report is written to: `results/playwright-report/`
- Per-test artifacts (traces/videos/screenshots) go to: `results/test-results/`

Open the last HTML report:
```bash
npm run report
```

## Project Layout
```
playwright.config.ts
tsconfig.json
package.json
src/
  pages/           # Page Objects
  fixtures/        # Custom fixtures (testData, etc.)
  tests/           # Specs (*.spec.ts)
test-data/         # Static data (todos.json)
results/
  playwright-report/
  test-results/
```

## Config Notes (important)
- `baseURL` is set to: `https://demo.playwright.dev/todomvc`
- **Navigate using a relative path** to keep the `/todomvc` segment:
  ```ts
  await page.goto('./'); // or ''
  ```
  > Using `page.goto('/')` would drop `/todomvc` and hit the site root (404).

- CI runs **headless** automatically (`headless: process.env.CI ? true : false`).
- Retries are enabled on CI only; locally they’re off.

## Useful Scripts (`package.json`)
```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "debug": "playwright test --debug",
    "report": "playwright show-report results/playwright-report"
  }
}
```

## GitHub Actions
A ready workflow can live at `.github/workflows/playwright.yml`. It:
- Installs deps + browsers
- Runs tests on Ubuntu
- Uploads `results/playwright-report` and `results/test-results` as artifacts

Trigger from the **Actions** tab (Run workflow) or by pushing to `main`.

