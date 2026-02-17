package sk.eshop.cart;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import sk.eshop.base.BasePage;

import java.util.List;

public class CartPage extends BasePage {

    @FindBy(css = ".cart-item")
    private List<WebElement> cartItems;

    @FindBy(css = ".btn-checkout")
    private WebElement checkoutButton;

    @FindBy(css = ".cart-empty")
    private WebElement emptyCartMessage;

    public CartPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    public int getCartItemCount() {
        return cartItems.size();
    }

    public void proceedToCheckout() {
        click(checkoutButton);
    }

    public boolean isCartEmpty() {
        return isElementVisible(emptyCartMessage);
    }
}
