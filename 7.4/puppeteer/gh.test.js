let page;

beforeEach(async () => {
  page = await browser.newPage();
}, 5000);

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 5000);

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  }, 5000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 5000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 5000);
});

// втора часть

describe("Titles om other pages", () => {

   test("Find title in features'", async () => {
    await page.goto("https://github.com/features");
    const title = "div.application-main main div.p-responsive.container-xl.text-center.mt-12.mb-6 h1";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("The tools you need to build what you want.");
  }, 5000);

  test("Find title in securiry", async () => {
    await page.goto("https://github.com/security");
    const title = "div.application-main main div div.container-xl.p-responsive.position-relative.z-2.py-md-7 h1";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("Trusted by millions of developers");
  }, 5000);
  
  test("Find title in Enterprise", async () => {
    await page.goto("https://github.com/enterprise");
    const title = "div.application-main main div div.col-9-max.position-relative.z-2.ml-lg-4.ml-xl-0 h1";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("Build like the best");
  }, 5000);
});
