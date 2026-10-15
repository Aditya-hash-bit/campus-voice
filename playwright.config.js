const { defineConfig, devices } = require('@playwright/test');
const exe = process.env.CHROMIUM_PATH; // optional: use an already-installed Chromium

module.exports = defineConfig({
  testDir: './tests',
  timeout: 20000,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://localhost:4173', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  webServer: { command: 'npx http-server -p 4173 -c-1 -s', url: 'http://localhost:4173', reuseExistingServer: true, timeout: 60000 },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 }, launchOptions: exe ? { executablePath: exe } : {} } },
    { name: 'mobile', use: { ...devices['Pixel 7'], launchOptions: exe ? { executablePath: exe } : {} }, grepInvert: /@desktop/ }
  ]
});
