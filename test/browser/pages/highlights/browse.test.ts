import { test, expect } from '@playwright/test';

test.describe('Highlights - Browse', () => {
  test('includes list of highlights by source', async ({ page }) => {
    await page.goto('/highlights/browse');
    await expect(page.getByRole('heading', { name: 'Highlights by Source' })).toBeVisible();

    const allSourceItems = await page.getByRole('list', { name: 'List of Sources' }).getByRole('link').all();

    for (const sourceItem of allSourceItems) {
      await expect(sourceItem.locator('small')).not.toBeEmpty();
      await expect(sourceItem.getByRole('heading', { level: 3 })).not.toBeEmpty();
    }

    const source = 'Family Shepherds';
    await page.getByRole('link', { name: `Link to source: ${source}` }).click();
    await expect(page.getByRole('heading', { name: source })).toBeVisible();
  });
});
