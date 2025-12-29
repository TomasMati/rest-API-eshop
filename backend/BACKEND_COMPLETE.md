# Spring Boot Backend - Kompletný

Backend je teraz kompletný a pripravený na spustenie!

## Čo je implementované

✅ **Entities** - Product, Category, Subcategory, User, Order, OrderItem
✅ **Repositories** - Spring Data JPA repositories
✅ **Services** - Business logika pre všetky entity
✅ **Controllers** - REST API endpoints
✅ **Security** - JWT autentifikácia, role-based authorization
✅ **File Upload** - Upload a ukladanie obrázkov
✅ **CORS** - Konfigurácia pre React frontend
✅ **Data Initialization** - Automatické vytvorenie admin používateľa a testovacích dát

## Spustenie

```bash
cd backend
mvn spring-boot:run
```

Backend bude bežať na `http://localhost:8080`

## Testovacie účty

**Admin:**
- Email: `admin@eshop.com`
- Heslo: `admin`

**User:**
- Email: `user@test.sk`
- Heslo: `password`

## API Endpoints

### Auth
- POST `/api/auth/register` - Registrácia
- POST `/api/auth/login` - Prihlásenie
- GET `/api/auth/me` - Aktuálny používateľ

### Products
- GET `/api/products` - Všetky produkty
- GET `/api/products/{id}` - Detail produktu
- POST `/api/products` - Vytvoriť (ADMIN, multipart/form-data)
- PUT `/api/products/{id}` - Upraviť (ADMIN, multipart/form-data)
- DELETE `/api/products/{id}` - Vymazať (ADMIN)

### Categories
- GET `/api/categories` - Všetky kategórie
- POST `/api/categories` - Vytvoriť (ADMIN)
- DELETE `/api/categories/{id}` - Vymazať (ADMIN)
- POST `/api/categories/{id}/subcategories` - Pridať podkateg (ADMIN)
- DELETE `/api/categories/subcategories/{id}` - Vymazať podkateg (ADMIN)

### Orders
- GET `/api/orders` - Všetky (ADMIN)
- GET `/api/orders/{id}` - Detail
- GET `/api/orders/user/{userId}` - Objednávky používateľa
- POST `/api/orders` - Vytvoriť
- PUT `/api/orders/{id}/status` - Zmeniť stav (ADMIN)

### Users
- GET `/api/users` - Všetci (ADMIN)
- GET `/api/users/{id}` - Detail
- PUT `/api/users/{id}` - Upraviť
- DELETE `/api/users/{id}` - Vymazať (ADMIN)

## Databáza

H2 Console: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:file:./data/eshopdb`
- Username: `sa`
- Password: (prázdne)

## Upload obrázkov

Obrázky sa ukladajú do `uploads/images/`
Prístup: `http://localhost:8080/uploads/images/{filename}`

## Ďalší krok

Teraz treba vytvoriť API service vrstvu v React frontende a prepojiť ho s týmto backendom.
