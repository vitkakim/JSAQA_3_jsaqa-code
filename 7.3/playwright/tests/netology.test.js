const { expect, default: test } = require("@playwright/test");
const { chromium } = require("playwright");

const { email, password } = require("../user.js");

test("Should log in with valid user", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
  });

  const page = await browser.newPage();
  await page.goto("https://netology.ru/");
  await page.getByRole('link', { name: 'Войти' }).click();
  await expect(page).toHaveURL('https://netology.ru/?modal=sign_in');
  await page.getByPlaceholder('Email').click().fill(email);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(password);
  await page.getByTestId('login-submit-btn').click();
  const header = await page.locator('[text="Мои курсы и профессии"]');
  await expect(header).toBeVisible;

  await page.close();
  await browser.close();
});