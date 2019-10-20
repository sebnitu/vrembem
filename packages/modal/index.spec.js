describe("Google", () => {
  beforeAll(async () => {
    await page.goto("file:///Users/sebnitu/dev/vrembem/packages/modal/test.html")
  })

  it("should be titled 'Google'", async () => {
    await expect(page.title()).resolves.toMatch("Modal Test")
  })
})
