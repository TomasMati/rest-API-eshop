# Spring Boot Backend - Spustenie bez Maven

Keďže Maven nie je nainštalovaný, máte tieto možnosti:

## Možnosť 1: Nainštalovať Maven (ODPORÚČANÉ)

### Cez Chocolatey (najrýchlejšie)
```powershell
# Ak máte Chocolatey
choco install maven

# Potom spustite
mvn spring-boot:run
```

### Manuálna inštalácia
1. Stiahnite Maven z https://maven.apache.org/download.cgi
2. Rozbaľte do `C:\Program Files\Apache\maven`
3. Pridajte do PATH: `C:\Program Files\Apache\maven\bin`
4. Reštartujte terminál
5. Spustite: `mvn spring-boot:run`

## Možnosť 2: Použiť IDE

### IntelliJ IDEA (NAJLEPŠIE)
1. Otvorte projekt v IntelliJ IDEA
2. Počkajte, kým sa načítajú Maven dependencies
3. Nájdite `EshopBackendApplication.java`
4. Kliknite na zelenú šípku vedľa `main` metódy
5. Vyberte "Run 'EshopBackendApplication'"

### VS Code
1. Nainštalujte "Extension Pack for Java"
2. Nainštalujte "Spring Boot Extension Pack"
3. Otvorte projekt
4. Stlačte F5 alebo kliknite na "Run" v `EshopBackendApplication.java`

### Eclipse
1. Otvorte projekt ako "Existing Maven Project"
2. Pravý klik na projekt → Run As → Spring Boot App

## Možnosť 3: Spustiť len frontend (dočasne)

Ak chcete len otestovať frontend bez backendu:
```bash
cd ..
npm run dev
```

**Poznámka:** Frontend bude zobrazovať chyby pri načítavaní dát, pretože backend nebeží.

## Po nainštalovaní Maven

```bash
# Spustite backend
mvn spring-boot:run

# Backend bude na http://localhost:8081
```

## Odporúčanie

Najrýchlejšie riešenie je použiť **IntelliJ IDEA Community Edition** (zadarmo):
- Stiahnite z https://www.jetbrains.com/idea/download/
- Otvorte backend priečinok
- Spustite aplikáciu jedným klikom
