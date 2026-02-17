package sk.eshop.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import sk.eshop.cart.CartPage;
import sk.eshop.checkout.CheckoutPage;
import sk.eshop.home.HomePage;
import sk.eshop.tests.utilities.BaseTest;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class FullFlowTest extends BaseTest {

    @Test
    public void testCompletePurchaseFlow() {
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isHomePageVisible(), "Home page should be visible");

        // 1. Add first product to cart
        WebElement addToCartBtn = driver.findElement(By.cssSelector(".btn-add-cart"));
        addToCartBtn.click();

        // Wait for cart update
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
        }

        // 2. Go to cart
        homePage.goToCart();
        CartPage cartPage = new CartPage(driver);
        Assert.assertTrue(cartPage.getCartItemCount() > 0, "Cart should not be empty");

        // 3. Checkout - Info
        cartPage.proceedToCheckout();
        CheckoutPage checkoutPage = new CheckoutPage(driver);
        checkoutPage.fillInfo("Janko Hrasko", "janko@priklad.sk", "0912345678", "Hlavna 1", "Bratislava", "811 01");

        // 4. Checkout - Shipping
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
        }
        checkoutPage.proceedToSummary();

        // 5. Checkout - Summary
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
        }
        checkoutPage.confirmOrder();

        // 6. Verify success
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
        }
        Assert.assertTrue(checkoutPage.isSuccessVisible(), "Success page should be visible");
        Assert.assertTrue(driver.getCurrentUrl().contains("success"), "URL should contain 'success'");
    }
}
