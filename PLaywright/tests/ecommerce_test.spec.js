
/*
Ecommerce Application Test Plan:

1. Call the products API endpoint and store the response in JSON. Then verify whether the products displayed in the UI match the data from the JSON.
2. Scroll through the products, select any product, change its quantity to 3, and add it to the cart.
3. Navigate back to the products page, choose another product, set its quantity to 4, and add it to the cart. Repeat the same process for one more product.
4. Go to the cart page. Out of the 3 products added:
   - Update the quantity of one product
   - Delete one product
5. Proceed to place the order, and then check the tracking page to track the package.

*/

import { test, expect } from '@playwright/test'
import axios from "axios"

// Call the products API endpoint and store the response in JSON.
// Verify whether the products displayed in the UI match the data from the API response.

test.skip('homepage Products', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const products = await axios.get('http://localhost:3000/api/products')
  const jsonData = products.data;

  const apiProductNames = jsonData.map(products => products.name)

  const productElement = page.locator('.product-name')

  const uiProductNames = await productElement.allTextContents();

  await expect(apiProductNames.length).toBe(apiProductNames.length);

  for (let product of apiProductNames) {
    expect(uiProductNames).toContain(product);
  }

});

// Scroll through the products list.
// Select a product, change its quantity to 3, and add it to the cart.

test.skip('add to cart', async ({ page }) => {
  await axios.post('http://localhost:3000/api/reset');
  await page.goto('http://localhost:5173');
  

  //const product = page.locator('.product-name',{ hasText: "Women's Sandal Heels - Pink"})

  const productCard = page.locator('.product-container', {
    has: page.locator('.product-name', {
      hasText: "Women's Sandal Heels - Pink"
    })
  });

  await productCard.scrollIntoViewIfNeeded()
  await expect(productCard).toBeVisible()

  const quantityBox = productCard.locator('.product-quantity-container select')

  await quantityBox.selectOption('3')

  await productCard.locator('.add-to-cart-button').click()

  await expect(page.locator('.cart-quantity')).toHaveText('6');

})

// Select aproduct, set its quantity to 4, and add it to the cart.
// Repeat the same process to add one more product with quantity 3.

test.skip('add multiple product to the cart', async ({ page }) => {

  await axios.post('http://localhost:3000/api/reset');
  await page.goto('http://localhost:5173');
  
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  const productCards = await page.locator('.product-container').all();

  for (let productcard of productCards) {
    const productName = (await productcard.locator('.product-name').textContent()).trim();

    if (productName === "Round Sunglasses") {
      const quantityBox = productcard.locator('.product-quantity-container select')

      await quantityBox.selectOption('4')
      await productcard.locator('.add-to-cart-button').click()


    }

    if (productName === "Women's Ballet Flat - White") {
      const quantityBox = productcard.locator('.product-quantity-container select')

      await quantityBox.selectOption('3')

      await productcard.locator('.add-to-cart-button').click()

    }

   

  }
  await expect(page.locator('.cart-quantity')).toHaveText('10');



})

// Navigate to the cart page.
// From the added products:
// - Update the quantity of one product
// - Delete one product
// Verify the cart reflects these changes correctly.
// Proceed to place the order.
// After placing the order, navigate to the tracking page.
// Verify that the tracking page loads successfully.

test('cart page', async ({ page }) => {

  await axios.post('http://localhost:3000/api/reset');
  await page.goto('http://localhost:5173');

  const products = [
    { name: 'Round Sunglasses', qty: '2' },
    { name: "Women's Ballet Flat - White", qty: '2' },
    { name: "Women's Sandal Heels - Pink", qty: '1' }
  ];

  const productCards = await page.locator('.product-container').all();

  for (let productcard of productCards) {
    const productName = await productcard.locator('.product-name').textContent()

    const product = products.find(p => p.name === productName)

    if (product) {
      const quantityBox = productcard.locator('.product-quantity-container select')
      await quantityBox.selectOption(product.qty)
      await productcard.locator('.add-to-cart-button').click()
    }
  }

  //update

  await page.locator('.cart-link').click()

  const cartItems = page.locator('.cart-item-container');
  //await expect(cartItems).toHaveCount(3);

  for (let i = 0; i < await cartItems.count(); i++) {
    const cartItem = cartItems.nth(i);

    const productName = (await cartItem.locator('.product-name').textContent()).trim();

    if (productName === 'Round Sunglasses') {

     
      await cartItem.locator('.update-quantity-link').click();

     
      const qtyInput = cartItem.locator('.quantity-count');
      await expect(qtyInput).toBeVisible();

      await qtyInput.fill('3');

      await cartItem.locator('.update-quantity-link').click();


      await expect(cartItem.locator('.quantity-label')).toHaveText('3');
    }

    //delete

    if (productName ==="Women's Ballet Flat - White") {

      await cartItem.locator('.delete-quantity-link').click();
  }

}
    await page.locator('#root > div.checkout-page > div.checkout-grid > div.payment-summary > button').click()

    await expect(page).toHaveURL('http://localhost:5173/orders');

    await page.locator('#root > div.orders-page > div.orders-grid > div:nth-child(1) > div.order-details-grid > div:nth-child(3) > a > button').click();

    await expect(page).toHaveURL(/localhost:5173\/tracking/);

});