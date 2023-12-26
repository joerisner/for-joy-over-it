import { test, expect } from '@playwright/test';

test.describe('Index Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays header with link to Home', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: 'Navigate to Home Page' });

    await expect(homeLink).toHaveText('JOSEPH RISNER');
    await expect(homeLink).toHaveAttribute('href', '/');
    await expect(page.getByRole('img', { name: "Joseph Risner's profile" })).toBeVisible();
  });

  test('displays a list of blog posts', async ({ page }) => {
    const blogPostsSection = page.getByRole('region', { name: 'Blog Posts' });
    const post = blogPostsSection.getByRole('link').first();
    const postPublishDate = await post.getByRole('time').textContent();
    const postTitle = await post.getByRole('heading', { level: 2 }).textContent();
    const postContent = await post.getByRole('dialog').textContent();

    await expect(blogPostsSection).toBeVisible();
    expect(postContent).toHaveLength(303);

    await post.click();
    await expect(page.getByRole('time')).toHaveText(postPublishDate);
    await expect(page.getByRole('heading', { level: 1, name: postTitle })).toBeVisible();
  });
});
