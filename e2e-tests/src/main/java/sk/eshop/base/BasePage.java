package sk.eshop.BasePage;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class BasePage
{
    protected WebDriver driver;

    public BasePage(WebDriver driver)
    {
        this.driver = driver;
    }

    public void click(WebElement element)
    {
        element.click();
    }

    public void enterText(WebElement element, String text)
    {
        element.clear();
        element.sendKeys(text);
    }

    public String getText(WebElement element)
    {
        return element.getText();
    }

    public boolean checkPageTitle(String title)
    {
        return driver.getTitle().equals(title);
    }

    public String getCurrentUrl()
    {
        return driver.getCurrentUrl();
    }

    public boolean verifyCurrentUrl(String expectedUrl)
    {
        return getCurrentUrl().equals((expectedUrl));
    }

    public boolean verifyCurrentUrlEndsWith(String ending)
    {
        return getCurrentUrl().endsWith(ending);
    }

    public boolean isElementVisible(WebElement element)
    {
        return element.isDisplayed();
    }
}
