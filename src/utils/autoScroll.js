export const autoScroll = async (page) => {
  await page.evaluate(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const scrollStep = 500;
    const scrollDelay = 1000;
    let previousHeight;

    while (true) {
      previousHeight = document.body.scrollHeight;
      window.scrollBy(0, scrollStep);
      await delay(scrollDelay);
      if (document.body.scrollHeight === previousHeight) break;
    }
  });
};
