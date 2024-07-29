import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium'
import { stores } from '../models/storeModel.js';
import { autoScroll } from '../utils/autoScroll.js';

export const getPricesForProduct = async (searchName) => {
  const getSearchSlug = (searchName) => {
    try {
      const $searchSlug = searchName.trim().toLocaleLowerCase();
      return stores.map((store) => {
        const searchTermPath = $searchSlug.replaceAll(" ", store.replaceSpace);
        const searchPath = store.searchPath.replaceAll("searchSlug", searchTermPath);
        const link = store.baseUrl + searchPath;
        return {
          name: store.storeName,
          link: link,
          ...store
        };
      });
    } catch (err) {
      console.error(err)
      return {}
    }
  };

  const getInformationProduct = async (store) => {
    const { link, classPriceCurrent, className, cardProduct, classImage, linkProduct } = store;
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    try {
      await page.goto(link, { waitUntil: 'networkidle2', timeout: 60000 });
      await autoScroll(page);

      const result = await page.evaluate(
        (cardProduct, classPriceCurrent, className, classImage, linkProduct) => {
          try {
            const products = document.querySelectorAll(cardProduct);
            return Array.from(products).map((product) => {
              return {
                name: product.querySelector(className)?.innerText || 'N/A',
                price: product.querySelector(classPriceCurrent)?.innerText || 'N/A',
                image: product.querySelector(classImage)?.src || 'N/A',
                slug: product.querySelector(linkProduct)?.href || 'N/A'
              };
            });
          } catch (error) {
            console.log('Error en page.evaluate:', error);
            return [];
          }
        },
        cardProduct, classPriceCurrent, className, classImage, linkProduct
      );

      return {
        storeName: store.storeName,
        results: result
      };
    } catch (error) {
      console.log('Error en getInformationProduct:', error);
      return {
        storeName: store.storeName,
        results: []
      };
    } finally {
      if (browser) await browser.close();
    }
  };

  const $searchStores = getSearchSlug(searchName);
  return await Promise.all($searchStores.map(store => getInformationProduct(store)));
};
