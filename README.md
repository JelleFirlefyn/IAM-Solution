# Project Setup Handleiding

Deze handleiding helpt je bij het opzetten van het project, dat een API, Single Page Application (SPA) en Open Policy Agent (OPA) bevat, met behulp van Docker Compose.

## Vereisten

- Docker en Docker Compose geïnstalleerd op je systeem.
- Node.js en npm geïnstalleerd voor het bouwen van de SPA.

## Stappen

### 1. Docker Compose Configuratie

- De IP-adressen voor Auth0 zijn ingesteld op `localhost`, dus deze zouden direct moeten werken.
- Gebruik `docker compose` om de containers op te zetten en te draaien.

### 2. Auth0 Configuratie

- Op dit moment gebruiken de SPA & API mijn Auth0-applicatie. Je kan mijn Auth0 applicatie blijven gebruiken.
- **API Configuratie:**
  - Pas in de API de `domain` en `audience` aan naar die van jouw Auth0-app (`audience` = client id).
- **SPA Configuratie:**
  - Wijzig in `/SPA/services/usermanager` de `domain` en `client id`.
  - Voer in de SPA-map `npm run build` uit om de React-app te bouwen naar een enkele `index.html` die Docker gebruikt.

### 3. Auth0 Applicatie Instellingen (enkel indien je kiest om je eigen Auth0 applicatie te gebruiken)

- Stel "Allowed Callback URLs" in op `http://localhost:3000/callback`.
- Stel "Allowed Logout URLs" in op `http://localhost:3000/logout`.
- Stel "Allowed Web Origins" in op `http://localhost:3000/`.
- Schakel CORS in en voeg toe: `http://localhost:3000/, http://localhost:3001/` (zonder aanhalingstekens).

### 4. Starten van de Services

- Gebruik `docker compose up -d --build` om alle services te starten.

### 5. Poorten en Toegang

- **SPA**: Draait op poort `3000`.
- **API**: Beschikbaar op poort `3001`.
- **OPA**: Toegankelijk via poort `8181`.
- Om in te loggen of uit te loggen in de SPA, voeg `/login` of `/logout` toe aan het einde van de URL.

### 6. Probleemoplossing

- Zorg ervoor dat alle poorten correct zijn geconfigureerd en toegankelijk zijn.
- Controleer de logbestanden van Docker als er problemen zijn bij het starten van de services.
