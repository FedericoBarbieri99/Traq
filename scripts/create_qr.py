import qrcode
from PIL import Image, ImageDraw, ImageFont
import json
import os
import random

month_dict = {
    "01": "Gennaio",
    "02": "Febbraio",
    "03": "Marzo",
    "04": "Aprile",
    "05": "Maggio",
    "06": "Giugno",
    "07": "Luglio",
    "08": "Agosto",
    "09": "Settembre",
    "10": "Ottobre",
    "11": "Novembre",
    "12": "Dicembre",
}


# Funzione per creare un gradiente radiale colorato
def create_radial_qr_gradient(qr_img, center_color, edge_color):
    width, height = qr_img.size
    gradient = Image.new("RGBA", (width, height))
    draw = ImageDraw.Draw(gradient)

    for y in range(height):
        for x in range(width):
            # Calcola la distanza dal centro
            dist = ((x - width // 2) ** 2 + (y - height // 2) ** 2) ** 0.5
            max_dist = ((width // 2) ** 2 + (height // 2) ** 2) ** 0.5

            # Calcola il fattore di gradiente
            factor = dist / max_dist

            # Interpola tra i colori
            r = int(center_color[0] * (1 - factor) + edge_color[0] * factor)
            g = int(center_color[1] * (1 - factor) + edge_color[1] * factor)
            b = int(center_color[2] * (1 - factor) + edge_color[2] * factor)

            # Applicare il colore solo sui pixel neri del QR code
            if qr_img.getpixel((x, y)) == (0, 0, 0, 255):  # Pixel nero nel QR code
                draw.point((x, y), fill=(r, g, b, 255))

    return gradient


def draw_text_on_card(draw, song, card_width, card_height, scale_factor):
    # Caricamento del font base
    base_font_path = "/Library/Fonts/SF-Pro.ttf"
    bold_font_path = "/Library/Fonts/SF-Pro-Text-Semibold.otf"
    compact_font_path = "/Library/Fonts/SF-Pro-Text-Light.otf"

    # Colore del testo
    text_color = "#0D0D0D"

    # Spaziatura tra le righe
    line_spacing = 16 * scale_factor

    # Funzione per ottenere larghezza e altezza del testo
    def get_text_dimensions(text, font):
        text_bbox = draw.textbbox((0, 0), text, font=font)
        return text_bbox[2] - text_bbox[0], text_bbox[3] - text_bbox[1]

    # Funzione per ridimensionare dinamicamente il font
    def dynamic_font_size(text, base_size, max_width, max_height, font_path):
        font_size = base_size
        font = ImageFont.truetype(font_path, font_size)
        while True:
            text_width, text_height = get_text_dimensions(text, font)
            if text_width <= max_width and text_height <= max_height:
                return font
            font_size -= 1
            font = ImageFont.truetype(font_path, font_size)
            if font_size <= 10:  # Limite minimo per evitare caratteri troppo piccoli
                break
        return font

    # Ridimensionamento dinamico per ogni sezione
    max_title_height = card_height * 0.3  # Max 30% dell'altezza della carta
    max_artist_height = card_height * 0.2  # Max 20% per l'artista
    max_date_height = card_height * 0.1  # Max 10% per la data

    # Font dinamico per il titolo
    title_font = dynamic_font_size(
        song["title"],
        64 * scale_factor,
        card_width - 40 * scale_factor,
        max_title_height,
        bold_font_path,
    )
    # Font dinamico per l'artista
    artist_font = dynamic_font_size(
        song["artist"],
        48 * scale_factor,
        card_width - 40 * scale_factor,
        max_artist_height,
        base_font_path,
    )
    # Font dinamico per la data di rilascio
    release_date_font = dynamic_font_size(
        song["date"],
        64 * scale_factor,
        card_width - 40 * scale_factor,
        max_date_height,
        base_font_path,
    )
    release_month_font = dynamic_font_size(
        song["date"],
        32 * scale_factor,
        card_width - 40 * scale_factor,
        max_date_height,
        compact_font_path,
    )

    # Wrappare il testo se necessario
    def wrap_text(text, font, max_width):
        words = text.split(" ")
        lines = []
        current_line = ""
        for word in words:
            test_line = current_line + word + " "
            text_bbox = draw.textbbox((0, 0), test_line, font=font)
            if (text_bbox[2] - text_bbox[0]) <= max_width:
                current_line = test_line
            else:
                lines.append(current_line.strip())
                current_line = word + " "
        lines.append(current_line.strip())
        return lines

    # Wrappare il testo
    title_lines = wrap_text(song["title"], title_font, card_width - 40 * scale_factor)
    artist_lines = wrap_text(
        song["artist"], artist_font, card_width - 40 * scale_factor
    )
    release_date_text = song["date"].split("-")[0]
    release_month = month_dict[song["date"].split("-")[1]]

    # Altezze per posizionamento
    title_height = sum(
        get_text_dimensions(line, title_font)[1] for line in title_lines
    ) + line_spacing * len(title_lines)

    date_height = (
        get_text_dimensions(release_date_text, release_date_font)[1]
        + get_text_dimensions(release_month, release_month_font)[1]
        + line_spacing
    )

    # Allineamento autore (ancorato in alto)
    current_y = 20 + 20 * scale_factor
    for line in artist_lines:
        text_width = get_text_dimensions(line, artist_font)[0]
        current_x = (card_width - text_width) // 2
        draw.text((current_x, current_y), line, fill=text_color, font=artist_font)
        current_y += get_text_dimensions(line, artist_font)[1] + line_spacing

    # Allineamento titolo (ancorato al centro)
    title_y = (card_height - title_height) // 2
    for line in title_lines:
        text_width = get_text_dimensions(line, title_font)[0]
        current_x = (card_width - text_width) // 2
        draw.text((current_x, title_y), line, fill=text_color, font=title_font)
        title_y += get_text_dimensions(line, title_font)[1] + line_spacing

    # Allineamento data (ancorato in basso)
    date_y = card_height - 20 - date_height - 20 * scale_factor
    text_width = get_text_dimensions(release_date_text, release_date_font)[0]
    current_x = (card_width - text_width) // 2
    draw.text(
        (current_x, date_y), release_date_text, fill=text_color, font=release_date_font
    )

    date_y += (
        get_text_dimensions(release_date_text, release_date_font)[1] + line_spacing
    )
    text_width = get_text_dimensions(release_month, release_month_font)[0]
    current_x = (card_width - text_width) // 2
    draw.text(
        (current_x, date_y), release_month, fill=text_color, font=release_month_font
    )


def add_logo_to_qr(qr_img, logo_path):
    # Carica il logo
    logo = Image.open(logo_path)

    # Calcola la dimensione del logo (es. 1/5 delle dimensioni del QR code)
    logo_size = (qr_img.size[0] // 5, qr_img.size[1] // 5)
    logo = logo.resize(logo_size, Image.Resampling.LANCZOS)  # Ridimensiona il logo

    # Calcola la posizione per centrare il logo
    logo_position = (
        (qr_img.size[0] - logo_size[0]) // 2,  # Posizione x
        (qr_img.size[1] - logo_size[1]) // 2,  # Posizione y
    )

    # Sovrapponi il logo al QR code con una maschera basata sul canale alfa del logo
    logo_mask = logo.convert("RGBA")
    qr_img.paste(
        logo, logo_position, mask=logo_mask.split()[3]
    )  # Usa il canale alfa come maschera

    return qr_img


# Funzione per creare la carta
def create_card(song, output_dir):
    # Dimensioni della carta
    card_width = 1800
    card_height = 900
    scale_factor = 1.4

    # Colori per il gradiente di sfondo
    colors = [
        (255, 0, 122),  # #FF007A
        (0, 255, 224),  # #00FFE0
        (255, 215, 0),  # #FFD700
        (255, 77, 77),  # #FF4D4D
    ]

    # Scegli due colori casuali per il gradiente di sfondo
    picked_colors = random.sample(colors, 2)

    # Crea lo sfondo a gradiente per la carta
    gradient_bg = Image.new("RGB", (card_width, card_height), picked_colors[0])
    draw = ImageDraw.Draw(gradient_bg)

    # Calcola la distanza massima lungo la diagonale
    max_dist = (card_width**2 + card_height**2) ** 0.5

    # Aggiungi il gradiente diagonale sullo sfondo
    for y in range(card_height):
        for x in range(card_width):
            # Calcola la distanza lungo la diagonale (dall'angolo in alto a sinistra all'angolo in basso a destra)
            dist = ((x**2 + y**2) ** 0.5) / max_dist

            # Interpola tra i due colori in base alla distanza
            r = int(picked_colors[0][0] * (1 - dist) + picked_colors[1][0] * dist)
            g = int(picked_colors[0][1] * (1 - dist) + picked_colors[1][1] * dist)
            b = int(picked_colors[0][2] * (1 - dist) + picked_colors[1][2] * dist)

            # Disegna il pixel con il colore interpolato
            draw.point((x, y), fill=(r, g, b))

    # Disegna il testo sulla carta
    draw_text_on_card(draw, song, card_width // 2, card_height, scale_factor)

    # Genera il QR code
    qr_data = f"https://pynguino.xyz/api/traq/{song['id']}"
    qr_img = qrcode.make(qr_data, error_correction=3)
    qr_img = qr_img.convert("RGBA")  # Converti in RGBA per gestire la trasparenza

    # Ridimensiona il QR code
    qr_img = qr_img.resize((card_width // 2, card_height), Image.NEAREST)

    # Crea un gradiente radiale colorato per il QR code
    gradient_qr = create_radial_qr_gradient(qr_img, (255, 0, 122), (100, 0, 100))

    # Crea uno sfondo nero per il QR code
    qr_bg = Image.new("RGB", (card_width // 2, card_height), "#0D0D0D")

    # Posiziona il QR code sullo sfondo nero
    qr_bg.paste(gradient_qr, (0, 0), qr_img)

    # Aggiungi il logo al centro del QR code
    logo_path = "Traq dark bg.png"  # Path dell'immagine del logo
    qr_with_logo = add_logo_to_qr(gradient_qr, logo_path)

    # Incolla il QR code sulla parte destra della carta
    gradient_bg.paste(qr_with_logo, (card_width // 2, 0))

    # Salva l'immagine della carta
    card_image_path = os.path.join(output_dir, f"{song['title']}.png")
    gradient_bg.save(card_image_path)
    print(f"Card created for {song['title']}")


# Funzione principale
def main():
    # Carica le canzoni dal file JSON
    with open("traq_songs.json", "r") as f:
        songs = json.load(f)

    # Directory di output per le carte
    output_dir = "cards"
    os.makedirs(output_dir, exist_ok=True)

    # Crea una carta per ogni canzone
    for song in songs:
        print(f"{song["id"]} di {len(songs)}")
        create_card(song, output_dir)
        break  # Rimuovi o commenta questa linea per generare tutte le carte


if __name__ == "__main__":
    main()
