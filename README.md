# E-Shop Project
![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-green)
![React](https://img.shields.io/badge/React-18.0-blue)
![Docker](https://img.shields.io/badge/Docker-Available-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

Komplexná E-commerce platforma s moderným frontendom (React) a robustným backendom (Spring Boot).

## 🚀 Kľúčové Vlastnosti

*   **Priožená Architektúra:** Oddelený Frontend (React/Vite) a Backend (Spring Boot REST API).
*   **Bezpečnosť:** JWT Autentifikácia, BCrypt hashovanie hesiel, Role-based access control (USER/ADMIN).
*   **Produkty:** 
    *   Inteligentné vyhľadávanie s resetovaním a chybovými hláškami.
    *   Filtrovanie podľa ceny.
    *   Kategórie a podkategórie.
    *   Detail produktu s galériou obrázkov.
*   **Admin Panel:** Správa produktov (pridávanie, editácia, mazanie), správa objednávok a používateľov.
*   **Nákupný proces:** Nákupný košík, viac-krokový checkout (doprava, platba), potvrdenie objednávky.
*   **Emailové notifikácie:** Automatické emaily pri registrácii a potvrdení objednávky (HTML šablóny s obrázkami).
*   **Recenzie:** Systém hodnotenia a recenzií produktov.
*   **API Dokumentácia:** Integrovaný Swagger UI (OpenAPI).
*   **Infraštruktúra:** Docker & Docker Compose pre jednoduché nasadenie s PostgreSQL databázou.

## 🛠 Tech Stack

**Backend:**
*   Java 17
*   Spring Boot 3
*   Spring Security (JWT)
*   Spring Data JPA (Hibernate)
*   **Databáza:** PostgreSQL (Docker) / H2 (Lokálny vývoj)
*   Lombok
*   SpringDoc OpenAPI (Swagger)

**Frontend:**
*   React 18
*   React Router DOM
*   Axios
*   Lucide React (Icons)
*   Vite
*   Vanilla CSS (Moderný dizajn, Light Mode)

## 📦 Inštalácia a Spustenie

### Možnosť A: Docker (Odporúčané)
Ak máte nainštalovaný Docker, spustenie celej aplikácie (vrátane PostgreSQL databázy) je otázkou jedného príkazu:

```bash
docker-compose up --build
```
Aplikácia bude bežať na:
*   Frontend: http://localhost (Port 80)
*   Backend: http://localhost:8081
*   Swagger UI: http://localhost:8081/swagger-ui.html
*   PostgreSQL: localhost:5432

### Možnosť B: Manuálne Spustenie (Lokálny Vývoj)
V tomto režime aplikácia štandardne používa **H2 databázu**.

1.  **Backend:**
    ```bash
    cd backend
    ./mvnw spring-boot:run
    ```
    Backend beží na: `http://localhost:8081`

2.  **Frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    Frontend beží zvyčajne na: `http://localhost:5173`

## 📚 API Dokumentácia
Po spustení backendu je dostupná interaktívna dokumentácia na:
`http://localhost:8081/swagger-ui.html`

Pre testovanie zabezpečených endpointov použite tlačidlo **Authorize** a zadajte JWT token v tvare: `Bearer <vas_token>`.

## 🧪 Testovanie
Backend obsahuje sadu integračných testov. Spustíte ich pomocou:
```bash
cd backend
./mvnw test
```

---
*Vytvorené ako ukážkový projekt pre pozíciu Junior Java Developer.*
