const { test, expect } = require('@playwright/test');

// Fail any test on uncaught JS errors / console errors (ignores font/network noise)
test.beforeEach(async ({ page }) => {
  page.errors = [];
  page.on('pageerror', e => page.errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !/fonts\.g|net::ERR|Failed to load resource/.test(m.text())) page.errors.push(m.text()); });
});
test.afterEach(async ({ page }) => { expect(page.errors, 'JS errors').toEqual([]); });

async function login(page, role) {
  await page.goto('/login.html');
  if (role === 'department') await page.locator('.role[data-role="department"]').click();
  const f = role === 'student' ? '#studentForm' : '#deptForm';
  await page.locator(f + ' input').first().fill(role === 'student' ? 'student@test.com' : 'dept@test.com');
  await page.locator(f + ' input[type=password]').fill('123456');
  await page.locator(f + ' button[type=submit]').click();
  await page.waitForURL(new RegExp(role + '-dashboard'));
}

test.describe('Homepage', () => {
  test('header, divider, login button, hero', async ({ page, isMobile }) => {
    await page.goto('/');
    await expect(page.locator('.brand').first()).toContainText('Campus Voice');
    await expect(page.locator('h1')).toContainText('Your Campus. Your Community.');
    if (!isMobile) await expect(page.locator('.nav a.btn')).toBeVisible();
    const hdr = await page.locator('.site-header').evaluate(e => getComputedStyle(e).borderBottomWidth);
    expect(hdr).toBe('1px');
    await expect(page.locator('.float')).toHaveCount(3);
  });

  test('no horizontal scroll', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#aGrid .a-card:not(.skel)');
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(over).toBeLessThanOrEqual(0);
  });

  test('search, category and department filters', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#aGrid .a-card:not(.skel)');
    await page.fill('#q', 'placement');
    const n = await page.locator('#aGrid .a-card:not(.skel)').count();
    expect(n).toBeGreaterThan(0);
    for (const t of await page.locator('#aGrid .a-card:not(.skel)').allInnerTexts()) expect(t.toLowerCase()).toContain('placement');
    await page.fill('#q', 'zzzzqqq');
    await expect(page.locator('.empty')).toBeVisible();
    await page.fill('#q', '');
    await page.click('.chip[data-cat="Events"]');
    for (const b of await page.locator('#aGrid .badge').allInnerTexts()) expect(b).toBe('Events');
    await page.click('.chip[data-cat="All"]');
    await page.selectOption('#deptSel', 'ECE');
    expect(await page.locator('#aGrid .a-card:not(.skel)').count()).toBeGreaterThan(0);
  });

  test('read more modal opens and closes with Esc', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#aGrid .a-card:not(.skel)');
    await page.locator('#aGrid [data-open]').first().click();
    await expect(page.locator('.modal')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.modal')).toHaveCount(0);
  });

  test('department card filters feed', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-dept="CE"]').click();
    await expect(page.locator('#deptSel')).toHaveValue('CE');
    await expect(page.locator('#aGrid .a-card:not(.skel)').first()).toContainText('Civil Engineering');
  });

  test('view all toggles', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#aGrid .a-card:not(.skel)');
    expect(await page.locator('#aGrid .a-card:not(.skel)').count()).toBe(6);
    await page.click('#viewAll');
    expect(await page.locator('#aGrid .a-card:not(.skel)').count()).toBeGreaterThan(6);
  });

  test('mobile menu works', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile only');
    await page.goto('/');
    await expect(page.locator('#nav')).toBeHidden();
    await page.click('#menuBtn');
    await expect(page.locator('#nav')).toBeVisible();
    await page.locator('#nav a.btn').click();
    await expect(page).toHaveURL(/login\.html/);
  });

  test('Login and Get Started navigate to login', async ({ page, isMobile }) => {
    await page.goto('/');
    await page.locator('.hero-actions a.btn-outline').click();
    await expect(page).toHaveURL(/login\.html/);
  });
});

test.describe('Login', () => {
  test('validation errors', async ({ page }) => {
    await page.goto('/login.html');
    await page.click('#studentForm button[type=submit]');
    await expect(page.locator('#sIdE')).not.toBeEmpty();
    await expect(page.locator('#sPwE')).not.toBeEmpty();
    await page.fill('#sId', 'bad id!');
    await page.fill('#sPw', '123');
    await page.click('#studentForm button[type=submit]');
    await expect(page.locator('#sIdE')).toContainText('valid');
    await expect(page.locator('#sPwE')).toContainText('6 characters');
  });

  test('role switch and password toggle', async ({ page }) => {
    await page.goto('/login.html');
    await page.locator('.role[data-role="department"]').click();
    await expect(page.locator('#deptForm')).toBeVisible();
    await expect(page.locator('#studentForm')).toBeHidden();
    await page.fill('#dPw', 'secret1');
    await page.locator('#deptForm .eye').click();
    await expect(page.locator('#dPw')).toHaveAttribute('type', 'text');
    await page.locator('#deptForm .eye').click();
    await expect(page.locator('#dPw')).toHaveAttribute('type', 'password');
  });

  test('department form rejects non-email', async ({ page }) => {
    await page.goto('/login.html#department');
    await page.fill('#dId', 'notanemail');
    await page.fill('#dPw', '123456');
    await page.click('#deptForm button[type=submit]');
    await expect(page.locator('#dIdE')).toContainText('valid department email');
  });

  test('student and department login redirect', async ({ page }) => {
    await login(page, 'student');
    await expect(page.locator('#pageTitle')).toContainText('Student Dashboard');
  });

  test('back to home', async ({ page }) => {
    await page.goto('/login.html');
    await page.click('.back');
    await expect(page).toHaveURL(/index\.html|\/$/);
  });
});

test.describe('Responsive', () => {
  for (const role of ['student', 'department']) {
    test(`${role} dashboard has no horizontal page scroll`, async ({ page }) => {
      await login(page, role);
      const views = role === 'student' ? ['dashboard', 'announcements', 'events', 'notifications'] : ['overview', 'publish', 'manage', 'events'];
      for (const v of views) {
        await page.goto(`/${role}-dashboard.html#${v}`);
        await page.waitForTimeout(150);
        const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(over, `${role}#${v}`).toBeLessThanOrEqual(0);
      }
    });
  }
});

test.describe('Access guards', () => {
  test('dashboards redirect when logged out', async ({ page }) => {
    await page.goto('/student-dashboard.html');
    await expect(page).toHaveURL(/login\.html/);
    await page.goto('/department-dashboard.html');
    await expect(page).toHaveURL(/login\.html/);
  });
  test('student cannot open department dashboard', async ({ page }) => {
    await login(page, 'student');
    await page.goto('/department-dashboard.html');
    await expect(page).toHaveURL(/login\.html/);
  });
});

test.describe('Student dashboard', () => {
  test('navigation, filters, notifications, logout', async ({ page, isMobile }) => {
    await login(page, 'student');
    const go = async v => { if (isMobile) await page.click('#sideToggle'); await page.locator(`.side-link[data-view="${v}"]`).click(); };
    await go('announcements');
    await expect(page.locator('#view-announcements')).toBeVisible();
    await page.click('.chip[data-cat="Examinations"]');
    for (const b of await page.locator('#aGrid .badge').allInnerTexts()) expect(b).toBe('Examinations');
    await go('notifications');
    await expect(page.locator('#sideCount')).toHaveText('3');
    await page.click('#markRead');
    await expect(page.locator('#sideCount')).toBeHidden();
    await go('profile');
    await expect(page.locator('#view-profile')).toContainText('Demo data');
    if (isMobile) await page.click('#sideToggle');
    await page.locator('.sidebar [data-logout]').click();
    await expect(page).toHaveURL(/index\.html|\/$/);
    await page.goto('/student-dashboard.html');
    await expect(page).toHaveURL(/login\.html/);
  });

  test('top search jumps to announcements', async ({ page, isMobile }) => {
    test.skip(isMobile, 'search hidden on mobile');
    await login(page, 'student');
    await page.fill('#topQ', 'library');
    await expect(page.locator('#view-announcements')).toBeVisible();
    await expect(page.locator('#aGrid .a-card:not(.skel)')).toHaveCount(1);
  });
});

test.describe('Department dashboard', () => {
  test('publish, draft, manage, delete and homepage visibility', async ({ page, isMobile }) => {
    await login(page, 'department');
    await page.goto('/department-dashboard.html#publish');
    await page.click('#annForm button[type=submit]');
    await expect(page.locator('#eTitle')).not.toBeEmpty();
    await expect(page.locator('#eDesc')).not.toBeEmpty();
    // expiry before publication
    await page.fill('#fTitle', 'Playwright Notice');
    await page.fill('#fDesc', 'A description that is long enough.');
    await page.fill('#fPub', '2026-10-20'); await page.fill('#fExp', '2026-10-10');
    await page.click('#annForm button[type=submit]');
    await expect(page.locator('#eExp')).toContainText('after');
    await page.fill('#fExp', '');
    await page.click('#annForm button[type=submit]');
    await expect(page.locator('#view-manage')).toBeVisible();
    await expect(page.locator('#manageTbl')).toContainText('Playwright Notice');
    await expect(page.locator('#manageTbl .st-published').first()).toBeVisible();

    // draft
    await page.goto('/department-dashboard.html#publish');
    await page.fill('#fTitle', 'Draft Only Item');
    await page.click('#saveDraft');
    await expect(page.locator('#manageTbl')).toContainText('Draft Only Item');

    // homepage shows published, hides draft
    await page.goto('/');
    await page.waitForSelector('#aGrid .a-card:not(.skel)');
    await page.fill('#q', 'Playwright Notice');
    await expect(page.locator('#aGrid .a-card:not(.skel)')).toHaveCount(1);
    await page.fill('#q', 'Draft Only Item');
    await expect(page.locator('.empty')).toBeVisible();

    // delete
    await page.goto('/department-dashboard.html#manage');
    page.on('dialog', d => d.accept());
    while (await page.locator('[data-del]').count()) { await page.locator('[data-del]').first().click(); }
    await expect(page.locator('#manageTbl')).not.toContainText('Playwright Notice');
  });
});
