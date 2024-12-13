import { test, expect } from '@playwright/test';

test.describe('Highlights', () => {
  test('renders random highlight', async ({ page }) => {
    const authorName = page.locator('#author');
    const sourceTitle = page.locator('cite');
    const quoteText = page.getByRole('blockquote');

    await page.route('**/random', async route => {
      const json = { author: 'Terry Hogan', body: 'Ya brother!', source: 'Hulkamania' };
      await route.fulfill({ json });
    });

    await page.goto('/highlights');
    await expect(page).toHaveTitle('Highlights | Joseph Risner');
    await expect(authorName).toHaveText('Terry Hogan');
    await expect(sourceTitle).toHaveText('Hulkamania');
    await expect(quoteText).toHaveText('Ya brother!');

    await page.route('**/random', async route => {
      const json = { author: 'Randy Savage', body: 'Ooh, yeah!', source: 'Macho Man' };
      await route.fulfill({ json });
    });

    const fetchHighlightBtn = page.getByRole('button', { name: 'Enlighten Me, Boon' });
    await fetchHighlightBtn.click();
    await expect(authorName).toHaveText('Randy Savage');
    await expect(sourceTitle).toHaveText('Macho Man');
    await expect(quoteText).toHaveText('Ooh, yeah!');
  });
});
