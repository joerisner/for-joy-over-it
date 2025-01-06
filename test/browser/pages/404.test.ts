import { test, expect } from '@playwright/test';

test.describe('404 Page', () => {
  test('renders custom page for 404 response', async ({ page }) => {
    const mainContent = page.getByRole('main');
    const backToHomeButton = page.getByRole('button', { name: 'Back to homepage' });

    await page.goto('/foo');

    await expect(page).toHaveTitle('Not Found | Joseph Risner');
    await expect(mainContent).toContainText('404');
    await expect(mainContent).toContainText('Sorry, the page you are looking for does not exist.');
    await expect(backToHomeButton).toHaveAttribute('href', '/');
  });
});
