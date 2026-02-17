package sk.eshop.registration;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import sk.eshop.base.BasePage;

public class RegisterPage extends BasePage {

    @FindBy(css = "input[type='text']")
    private WebElement nameInput;

    @FindBy(css = "input[type='tel']")
    private WebElement phoneInput;

    @FindBy(css = "input[type='email']")
    private WebElement emailInput;

    @FindBy(css = "input[type='password']")
    private WebElement passwordInput;

    @FindBy(css = ".btn-auth")
    private WebElement registerButton;

    public RegisterPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    public void register(String name, String phone, String email, String password) {
        enterText(nameInput, name);
        enterText(phoneInput, phone);
        enterText(emailInput, email);
        enterText(passwordInput, password);
        click(registerButton);
    }
}
