package sk.eshop.tests.registration;

import org.testng.Assert;
import org.testng.annotations.Test;
import sk.eshop.home.HomePage;
import sk.eshop.registration.RegisterPage;
import sk.eshop.tests.utilities.BaseTest;

public class RegistrationTest extends BaseTest {

    @Test
    public void testSuccessfulRegistration() {
        HomePage homePage = new HomePage(driver);
        homePage.goToLogin();

        // In this app, register link is on login page
        driver.findElement(org.openqa.selenium.By.linkText("Zaregistrovať sa")).click();

        RegisterPage registerPage = new RegisterPage(driver);
        String timestamp = String.valueOf(System.currentTimeMillis());
        registerPage.register("Test User", "0900123456", "test" + timestamp + "@example.com", "password123");

        // After registration it redirects to home
        Assert.assertTrue(homePage.isHomePageVisible());
    }
}
