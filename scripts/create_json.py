import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import json
import re
import os
from dotenv import load_dotenv


# Carica il file .env dal percorso specificato
load_dotenv(os.path.join(os.path.dirname(__file__), "../.env"))

# Le tue credenziali Spotify
client_id = os.getenv("EXPO_PUBLIC_SPOTIFY_CLIENT_ID")
client_secret = os.getenv("EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET")

id_counter = 0

# Configurare l'autenticazione
sp = spotipy.Spotify(
    auth_manager=SpotifyClientCredentials(
        client_id=client_id, client_secret=client_secret
    )
)


# Funzione per ottenere tutte le tracce da una playlist gestendo l'offset
def get_tracks_from_playlist(playlist_id, max_limit=500):
    tracks = []
    limit = 100  # Limite massimo per chiamata API
    offset = 0  # Offset iniziale

    # Ciclo per ottenere tutte le tracce gestendo l'offset
    while True:
        results = sp.playlist_tracks(playlist_id, limit=limit, offset=offset)
        for item in results["items"]:
            track = item["track"]
            tracks.append(
                {
                    "title": clean_title(track["name"]),
                    "artist": ", ".join(
                        [artist["name"] for artist in track["artists"]]
                    ),
                    "date": track["album"]["release_date"],
                    "spotifyId": track["id"],
                }
            )

        # Incrementa l'offset per ottenere il prossimo set di tracce
        offset += limit

        # Controlla se abbiamo ottenuto tutte le tracce o raggiunto il limite massimo
        if len(results["items"]) < limit or len(tracks) >= max_limit:
            break

    return tracks[:max_limit]  # Ritorna solo il numero massimo richiesto di tracce


# Funzione per unire le tracce da più playlist e rimuovere i duplicati
def collect_unique_tracks(playlist_ids, max_tracks=1000):
    all_tracks = []
    seen_ids = set()  # Per tenere traccia degli ID già aggiunti
    global id_counter
    for playlist_id in playlist_ids:
        tracks = get_tracks_from_playlist(playlist_id, max_limit=max_tracks)
        for track in tracks:
            if track["spotifyId"] not in seen_ids:
                track["id"] = id_counter
                all_tracks.append(track)
                seen_ids.add(track["spotifyId"])
                id_counter += 1

            # Fermarsi quando raggiungiamo il limite massimo
            if len(all_tracks) >= max_tracks:
                break

        if len(all_tracks) >= max_tracks:
            break

    return all_tracks


# Ottenere le canzoni da playlist globali e italiane
def get_songs():
    # Playlist delle canzoni più famose globali e italiane
    playlist_ids = [
        "0JiVp7Z0pYKI8diUV6HJyQ",  # Spotify top 500 most streamed songs of all time
        "6MaOrnDjkVJeTzp7ndcdM7",  # Canzoni italiane anni 70 - 00
        "37i9dQZF1DWSxF6XNtQ9Rg",  # Hit rap italiane
        "37i9dQZF1DX3Kdv0IChEm9",  # EDM Hits
        "37i9dQZF1DXcuVttLeQxkh",  # Hit italiane
        "3pmYhV8qGDhisCsA2ivJiE",  # Vera baddie
        # "37i9dQZF1DXc6IFF23C9jj",  # All Time Greatest Hits
        # "37i9dQZF1DX4JAvHpjipBk",  # Greatest Songs Ever
        # "37i9dQZF1DWXRqgorJj26U",  # Top 100 Most Streamed Songs
        # "37i9dQZF1DX7F6T2n2fegs",  # 100 Greatest 90s Songs
        # "37i9dQZF1DX8XZ6AUo9R4R",  # 100 Greatest 80s Songs
        # "37i9dQZF1DX6VdMW310YC7",  # Top 50 Italia
        # "37i9dQZEVXbIQnj7RRhdSX",  # Top 50 Italia (chart)
        # "37i9dQZF1DX5Ejj0EkURtP",  # Italian Pop Classics
        # Aggiungi altre playlist se necessario
    ]

    # Raccogliere le tracce fino a un massimo di 1000
    all_tracks = collect_unique_tracks(playlist_ids, max_tracks=1000)

    # Salvare i dati in un file JSON
    with open("traq_songs.json", "w", encoding="utf-8") as f:
        json.dump(all_tracks, f, ensure_ascii=False, indent=4)

    print(f"File JSON generato con {len(all_tracks)} tracce uniche!")


import re


def clean_title(title):
    # Rimuove "feat.", e ciò che segue, con o senza parentesi
    cleaned_title = re.sub(
        r"\s*(\(|\[)?(feat)\.\s*[^)\]]+(\)|\])?", "", title, flags=re.IGNORECASE
    )
    # Rimuove "con.", "with." e ciò che segue, con o senza parentesi
    cleaned_title = re.sub(
        r"\s*(\(|\[)?(con|with)\s*[^)\]]+(\)|\])?",
        "",
        cleaned_title,
        flags=re.IGNORECASE,
    )
    # Rimuovi eventuali spazi in eccesso
    cleaned_title = re.sub(r"\s{2,}", " ", cleaned_title).strip()
    return cleaned_title


# Esegui la funzione per ottenere 1000 canzoni
def main():
    get_songs()


if __name__ == "__main__":
    main()
