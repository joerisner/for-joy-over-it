import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('can navigate using large device', async ({ page }) => {
    const navPanel = page.getByRole('navigation', { name: 'Main' });
    const navToggle = page.getByRole('button', { name: 'Nav Toggle' });
    const navItems = [
      { title: 'Blog', href: '/' },
      { title: 'Resources', href: '/resources' },
      { title: 'Highlights', href: '/highlights' }
    ];

    await page.goto('/');
    await expect(navPanel).toHaveAttribute('data-visible', 'false');

    await navToggle.click();
    await expect(navPanel).toHaveAttribute('data-visible', 'true');

    for (const navItem of navItems) {
      await expect(navPanel.getByRole('link', { name: navItem.title })).toHaveAttribute('href', navItem.href);
    }

    await navToggle.click();
    await expect(navPanel).toHaveAttribute('data-visible', 'false');
  });
});
