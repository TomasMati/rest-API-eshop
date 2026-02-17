package sk.eshop.home;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import sk.eshop.base.BasePage;

public class HomePage extends BasePage {
    @FindBy(css = ".btn-login")
    private WebElement signupLoginButton;

    public HomePage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    public void clickSignupLogin() {
        click(signupLoginButton);
    }

    public boolean isHomePageVisible() {
        return checkPageTitle("react-eshop");
    }

    public void goToLogin() {
        click(signupLoginButton);
    }

    public void goToCart() {
        driver.findElement(org.openqa.selenium.By.cssSelector(".cart-icon")).click();
    }

    public void search(String query) {
        WebElement searchInput = driver
                .findElement(org.openqa.selenium.By.cssSelector("input[placeholder='Hľadať produkt...']"));
        enterText(searchInput, query);
        searchInput.submit();
    }
}
