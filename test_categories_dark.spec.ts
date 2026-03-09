import { test, expect } from '@playwright/test';

test('Verify dark theme on categories page', async ({ page }) => {
  await page.goto('http://localhost:4174/domain-expansion/app/categories');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/home/jules/verification/categories_dark.png', fullPage: true });
});
