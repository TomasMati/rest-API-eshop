# Cheat Sheet pre pohovor (E-shop Project)
Tento dokument slúži ako "ťahák" pre technické otázky, ktoré môžu padnúť na pohovore ohľadom tohto projektu.

---

## 🧱 1. Architektúra & Docker

### Otázka: "Prečo si použil Docker a Docker Compose?"
*   **Jednoduchá odpoveď:** Aby som nemusel na každom počítači inštalovať databázu a nastavovať prostredie.
*   **PRO Odpoveď:** "Chcel som zabezpečiť **konzistenciu prostredia**. S Dockerom mám istotu, že aplikácia beží rovnako na mojom Windowse ako na vašom serveri. `docker-compose` mi umožňuje spustiť celú infraštruktúru (Frontend, Backend, DB) jedným príkazom, čo zjednodušuje onboarding nových vývojárov."

### Otázka: "Prečo je Frontend a Backend oddelený?"
*   **Odpoveď:** "Je to moderná **Microservices-ready** architektúra. Frontend (React) beží v prehliadači klienta a Backend je len REST API. Umožňuje to škálovať ich nezávisle a v budúcnosti môžem k API pripojiť napríklad aj mobilnú aplikáciu bez zmeny backendu."

---

## 🛡️ 2. Bezpečnosť (JWT)

### Otázka: "Ako funguje tvoje prihlasovanie (JWT)?"
*   **Jednoduchá odpoveď:** Užívateľ pošle meno/heslo, server mu vráti dlhý kód (Token). Ten kód posielam s každou ďalšou požiadavkou.
*   **PRO Odpoveď:** "Používam **Stateless Authentication**. Server si nepamätá prihláseného užívateľa v pamäti (Session), ale všetko je zakódované v **JWT tokene**, ktorý je digitálne podpísaný. Backend len overí podpis a vie, kto volá. Je to ideálne pre REST API a škálovateľnosť."

### Otázka: "Čo robí `JwtRequestFilter`?"
*   **Odpoveď:** "Je to vrátnik. Každá požiadavka (Request) musí prejsť cez tento filter. Pozrie sa, či má v hlavičke Token, overí ho, a ak je platný, pustí užívateľa ďalej do systému."

---

## ⚙️ 3. Backend Logika

### Otázka: "Prečo používaš DTO (Data Transfer Objects) a nie priamo Entity?"
*   **Odpoveď:** "Kvôli **bezpečnosti a oddeleniu vrstiev**. Nechcem, aby API videlo všetko, čo je v databáze (napr. interné ID, heslá, audit logy). DTO mi dovoľuje presne definovať, čo prijímam a čo vraciam."

### Otázka: "Všimol som si `GlobalExceptionHandler`. Načo to je?"
*   **Odpoveď:** "Aby som nemal v každom Controllery `try-catch` bloky. Všetky chyby v aplikácii sa 'bublú' hore a tento Handler ich zachytí na jednom mieste. Vďaka tomu API vracia vždy pekný JSON s chybou a správnym HTTP kódom (napr. 404), namiesto škaredého stack-trace."

### Otázka: "Prečo je posielanie emailov `@Async`?"
*   **Odpoveď:** "Kvôli **UX (User Experience)**. Odoslanie emailu cez SMTP môže trvať aj 5 sekúnd. Nechcem, aby užívateľ čakal s točiacim sa kolieskom. Preto sa email odošle na pozadí v inom vlákne a užívateľ dostane okamžitú odpoveď."

---

## 🔍 4. Databáza & Výkon

### Otázka: "Prečo si implementoval stránkovanie (Pagination)?"
*   **Odpoveď:** "Kvôli **výkonu (Performance)**. Ak by e-shop mal 100 000 produktov a ja zavolám `findAll()`, zaplním pamäť servera a aplikácia spadne (Out of Memory). Stránkovanie mi dovolí ťahať dáta po malých kúskoch (Chunks)."

### Otázka: "Akú používaš databázu?"
*   **Odpoveď:** "Pre vývoj používam **H2 (In-memory)**, pretože je rýchla a nevyžaduje inštaláciu. Ale vďaka JPA/Hibernate môžem v produkcii jednoducho prepnúť na PostgreSQL alebo MySQL len zmenou konfiguračného súboru (`application.properties`)."

---

## 💡 Tip na záver
Ak sa spýtajú na niečo, čo neviete:
*"Úprimne, do hĺbky som to zatiaľ neštudoval, použil som 'best practice' riešenie, ale rád sa to doučím."*
To je lepšie ako vymýšľať si.
