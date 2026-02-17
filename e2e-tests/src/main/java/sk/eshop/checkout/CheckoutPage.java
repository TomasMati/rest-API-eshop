package sk.eshop.checkout;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import sk.eshop.base.BasePage;

public class CheckoutPage extends BasePage {

    // Info step
    @FindBy(xpath = "//label[contains(text(),'Meno a Priezvisko')]/following-sibling::input")
    private WebElement nameInput;

    @FindBy(xpath = "//label[contains(text(),'Email')]/following-sibling::input")
    private WebElement emailInput;

    @FindBy(xpath = "//label[contains(text(),'Telefónne číslo')]/following-sibling::input")
    private WebElement phoneInput;

    @FindBy(xpath = "//label[contains(text(),'Ulica a číslo')]/following-sibling::input")
    private WebElement streetInput;

    @FindBy(xpath = "//label[contains(text(),'Mesto')]/following-sibling::input")
    private WebElement cityInput;

    @FindBy(xpath = "//label[contains(text(),'PSČ')]/following-sibling::input")
    private WebElement zipInput;

    @FindBy(css = ".btn-next")
    private WebElement nextButton;

    // Summary step
    @FindBy(css = ".btn-confirm")
    private WebElement confirmButton;

    // Success
    @FindBy(css = ".success-page")
    private WebElement successPage;

    public CheckoutPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    public void fillInfo(String name, String email, String phone, String street, String city, String zip) {
        enterText(nameInput, name);
        enterText(emailInput, email);
        enterText(phoneInput, phone);
        enterText(streetInput, street);
        enterText(cityInput, city);
        enterText(zipInput, zip);
        click(nextButton);
    }

    public void proceedToSummary() {
        click(nextButton);
    }

    public void confirmOrder() {
        click(confirmButton);
    }

    public boolean isSuccessVisible() {
        return isElementVisible(successPage);
    }
}
