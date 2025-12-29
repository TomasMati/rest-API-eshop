# E-Shop Backend - Spring Boot

## Popis
Spring Boot REST API backend pre React E-Shop s podporou JWT autentifikácie, H2 databázou a upload obrázkov.

## Technológie
- Java 17
- Spring Boot 3.2.0
- Spring Security + JWT
- Spring Data JPA
- H2 Database (file-based)
- Maven

## Požiadavky
- Java 17 alebo vyššia
- Maven 3.6+

## Inštalácia a spustenie

### 1. Prejdite do backend priečinka
```bash
cd backend
```

### 2. Build projektu
```bash
mvn clean install
```

### 3. Spustenie aplikácie
```bash
mvn spring-boot:run
```

Backend bude bežať na `http://localhost:8080`

## Databáza

### H2 Console
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:file:./data/eshopdb`
- Username: `sa`
- Password: (prázdne)

Databáza sa uloží do súboru `./data/eshopdb.mv.db`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Registrácia
- `POST /api/auth/login` - Prihlásenie
- `GET /api/auth/me` - Aktuálny používateľ (vyžaduje token)

### Products
- `GET /api/products` - Všetky produkty
- `GET /api/products/{id}` - Produkt podľa ID
- `POST /api/products` - Vytvoriť produkt (ADMIN, multipart/form-data)
- `PUT /api/products/{id}` - Upraviť produkt (ADMIN, multipart/form-data)
- `DELETE /api/products/{id}` - Vymazať produkt (ADMIN)

### Categories
- `GET /api/categories` - Všetky kategórie

### Orders
- `GET /api/orders` - Všetky objednávky (ADMIN)
- `POST /api/orders` - Vytvoriť objednávku
- `GET /api/orders/{id}` - Objednávka podľa ID

### Users
- `GET /api/users` - Všetci používatelia (ADMIN)
- `GET /api/users/{id}` - Používateľ podľa ID
- `PUT /api/users/{id}` - Upraviť používateľa

## Upload obrázkov

Obrázky sa ukladajú do priečinka `uploads/images/`

Pri vytváraní/úprave produktu použite `multipart/form-data`:
```
product: JSON string produktu
images: súbory obrázkov
```

Obrázky sú dostupné na: `http://localhost:8080/uploads/images/{filename}`

## Autentifikácia

API používa JWT tokeny. Po prihlásení dostanete token, ktorý musíte poslať v hlavičke:
```
Authorization: Bearer {token}
```

## Testovací admin účet

Po spustení aplikácie sa automaticky vytvorí:
- Email: `admin@eshop.com`
- Heslo: `admin`
- Rola: ADMIN

## CORS

Backend povoľuje requesty z:
- `http://localhost:5173`
- `http://localhost:5174`
- `http://localhost:5175`

## Ďalšie kroky

1. **Vytvorenie zostávajúcich kontrolérov** (CategoryController, OrderController, UserController)
2. **Data initialization** - CommandLineRunner pre naplnenie databázy
3. **Frontend integrácia** - Vytvorenie API service vrstvy v Reacte
4. **Testovanie** - Postman kolekcia

## Štruktúra projektu

```
backend/
├── src/main/java/com/eshop/
│   ├── config/          # Security, CORS, Web konfigurácia
│   ├── controller/      # REST kontroléry
│   ├── dto/             # Data Transfer Objects
│   ├── entity/          # JPA entity
│   ├── repository/      # Spring Data repositories
│   ├── security/        # JWT utility, filters
│   └── service/         # Business logika
├── src/main/resources/
│   └── application.properties
├── data/                # H2 databáza (vytvorí sa automaticky)
├── uploads/images/      # Nahrané obrázky (vytvorí sa automaticky)
└── pom.xml
```

## Poznámky

- Databáza sa vytvorí automaticky pri prvom spustení
- Upload priečinok sa vytvorí automaticky
- Pre production použite PostgreSQL namiesto H2
