# React E-shop E2E Tests

This project contains end-to-end (E2E) tests for the React E-shop application. The tests are written using **Java**, **Selenium WebDriver**, and **TestNG**.

## 🚀 Getting Started

### Prerequisites
- [Java Development Kit (JDK) 17+](https://www.oracle.com/java/technologies/downloads/)
- [Apache Maven](https://maven.apache.org/download.cgi)
- [Google Chrome](https://www.google.com/chrome/) (Tests use ChromeDriver)

### Installation
1. Clone the repository.
2. Navigate to the `e2e-tests` directory:
   ```bash
   cd e2e-tests
   ```
3. Install dependencies:
   ```bash
   mvn install
   ```

## 🧪 Running Tests

You can run all tests using Maven:

```bash
mvn test
```

Or you can run the TestNG suite specifically:
```bash
mvn test -DsuiteXmlFile=testng.xml
```

## 📂 Project Structure

- `src/main/java/sk/eshop`: Contains **Page Objects** for clean UI abstraction.
  - `base`: Base Page with common Selenium methods.
  - `home`, `login`, `registration`, `cart`, `checkout`: Specific page definitions.
- `src/test/java/sk/eshop/tests`: Contains the actual **Test Classes**.
  - `login`: Tests for login functionality.
  - `registration`: Tests for user sign-up.
  - `FullFlowTest.java`: A complete purchase flow from home page to order confirmation.
- `testng.xml`: Suite configuration to control test execution order and scope.

## 🛠️ Configuration
The tests are configured to run against `http://localhost`. If your application runs on a different URL, update it in `src/test/java/sk/eshop/tests/utilities/BaseTest.java`.

## 📈 Reports
Test results are generated in the `target/surefire-reports` directory after running `mvn test`. You can open `index.html` in that folder to see a detailed HTML report.
