# Traq

**Traq** è un'applicazione gioco che sfrutta l'integrazione con Spotify per offrire una sfida musicale: indovinare le canzoni dopo aver scannerizzato un QR code che avvia la riproduzione di una traccia musicale.

## Descrizione

In Traq, l'obiettivo principale è quello di riconoscere e indovinare il titolo di una canzone che viene riprodotta dopo aver scannerizzato un QR code con il tuo dispositivo. Il gioco è pensato per gli amanti della musica e può essere utilizzato sia in modalità singola che multiplayer.

Ogni QR code è associato a una canzone, e scansionandolo, gli utenti possono ascoltarne un'anteprima su Spotify e tentare di indovinare il titolo e l'artista corretti.

La repo contiene:

- Il codice sorgente dell'app mobile (React Native).
- Script Python per generare la lista delle canzoni da includere nel gioco e creare le carte stampabili con i QR code.

## Funzionalità principali

- **Scansione di QR code**: Scansiona i QR code con il tuo dispositivo per avviare una canzone su Spotify.
- **Integrazione con Spotify**: Le canzoni vengono riprodotte direttamente tramite l'API di Spotify.
- **Gioco basato su canzoni**: Gli utenti devono indovinare il titolo della canzone e/o l'artista.
- **Generazione di carte**: Include script Python per creare carte stampabili con QR code collegati alle canzoni.

## Requisiti

- **Node.js**: Versione LTS raccomandata.
- **Python**: Versione 3.8 o superiore.
- **Spotify Account**: È necessario un account Spotify per accedere all'API.
- **Spotify Developer API Keys**: Registrati su [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) per ottenere le chiavi API.

## Installazione

1. **Clona la repository**:

    ```bash
    git clone https://github.com/FedericoBarbieri99/Traq.git
    cd Traq
    ```

2. **Installa le dipendenze per l'app**:

    ```bash
    npm install
    ```

3. **Configura l'integrazione con Spotify**:

   Crea un file `.env` nella root del progetto e inserisci le tue credenziali Spotify:

    ```bash
    EXPO_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
    EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
    ```

4. **Avvia l'app**:

    ```bash
    npm start
    ```

5. **Script Python**:

    Nella cartella `scripts/`, sono presenti script per generare la lista di canzoni e creare carte con QR code. Assicurati di installare le dipendenze Python con:

    ```bash
    pip install -r requirements.txt
    ```

    Esegui gli script per generare le carte o la lista di canzoni.

## Utilizzo

1. Avvia l'app sul tuo dispositivo.
2. Scansiona un QR code generato per ascoltare la canzone su Spotify.
3. Tenta di indovinare il titolo della canzone e l'artista corretto.

## Contribuire

Contributi sono benvenuti! Se vuoi migliorare Traq, sentiti libero di fare una pull request o aprire un issue.
