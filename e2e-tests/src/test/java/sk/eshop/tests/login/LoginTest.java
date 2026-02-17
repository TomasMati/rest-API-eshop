package sk.eshop.tests.login;

import org.testng.Assert;
import org.testng.annotations.Test;
import sk.eshop.home.HomePage;
import sk.eshop.tests.utilities.BaseTest;

public class LoginTest extends BaseTest {
    @Test
    public void testSuccessfulLogin() {
        HomePage homePage = new HomePage(driver);
        homePage.goToLogin();

        sk.eshop.login.LoginPage loginPage = new sk.eshop.login.LoginPage(driver);
        loginPage.login("admin@eshop.sk", "admin123");

        Assert.assertTrue(homePage.isHomePageVisible());
    }

    @Test
    public void testFailedLogin() {
        HomePage homePage = new HomePage(driver);
        homePage.goToLogin();

        sk.eshop.login.LoginPage loginPage = new sk.eshop.login.LoginPage(driver);
        loginPage.login("wrong@example.com", "wrongpass");

        Assert.assertTrue(loginPage.getErrorMessage().contains("Neplatný email alebo heslo")
                || loginPage.getErrorMessage().contains("Chyba"));
    }
}
