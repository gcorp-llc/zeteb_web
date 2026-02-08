import { test, expect } from '@playwright/test';

test('Verify profile and edit modals', async ({ page }) => {
  // Go to homepage
  await page.goto('http://localhost:3000/fa');

  // Wait for page to load
  await page.waitForSelector('text=حسین افتخارراد');

  // Open profile menu
  await page.click('button:has-text("پروفایل")');
  await page.screenshot({ path: 'screenshots/profile_menu_v2.png' });

  // Click "View Profile"
  await page.click('text=مشاهده پروفایل');

  // Wait for profile page
  await page.waitForURL('**/profile');
  await page.waitForSelector('text=تحلیل و بررسی');
  await page.screenshot({ path: 'screenshots/profile_page.png' });

  // Click edit button on Header (first pen icon)
  // Use a more specific selector
  const editHeaderBtn = page.locator('button .icon-\\[solar--pen-bold\\]').first();
  await editHeaderBtn.click();

  // Wait for modal
  await page.waitForSelector('text=ویرایش اطلاعات پایه');
  await page.screenshot({ path: 'screenshots/edit_header_modal.png' });

  // Close modal (click outside or escape)
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  // Click edit skills
  await page.click('text=ویرایش مهارت‌ها');
  await page.waitForSelector('text=ویرایش مهارت‌ها');
  await page.screenshot({ path: 'screenshots/edit_skills_modal.png' });
  await page.keyboard.press('Escape');

  // Go to posts page via menu
  await page.click('button:has-text("پروفایل")');
  await page.click('text=پست‌ها و فعالیت‌ها');
  await page.waitForURL('**/posts');
  await page.screenshot({ path: 'screenshots/posts_page.png' });

  // Go to settings page
  await page.click('button:has-text("پروفایل")');
  await page.click('text=تنظیمات و حریم خصوصی');
  await page.waitForURL('**/settings');
  await page.screenshot({ path: 'screenshots/settings_page.png' });
});
