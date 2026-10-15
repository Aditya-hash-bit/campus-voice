# Campus Voice (frontend demo)

Run: open the folder in VS Code and use Live Server on `index.html` (or double-click it).

## Automated tests (Playwright)
Requires Node.js 18+.

    npm install
    npx playwright install chromium
    npm test              # runs desktop + mobile
    npm run test:headed   # watch the browser
    npm run test:report   # open the HTML report

Covers: homepage filters/search/modal/mobile menu, login validation and role switching,
access guards, student and department dashboards (publish, draft, delete),
and horizontal-overflow checks at desktop and phone sizes.

Note: login and storage are demo only (client-side). See the in-page notices.
