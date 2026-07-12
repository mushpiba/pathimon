from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "pathimon"
CHARACTER_SHEET = OUT / "pathimon-character-sheet-source.png"
MICRO_SHEET = OUT / "pathimon-micro-sheet-source.png"

MONSTERS = [
    "influenza",
    "hiv",
    "cholera",
    "tb",
    "candida",
    "aspergillus",
    "malaria",
    "entamoeba",
    "ascaris",
    "schistosoma",
]

PALETTE = {
    "influenza": ((77, 151, 232), (150, 218, 255), (32, 67, 142)),
    "hiv": ((116, 91, 194), (228, 94, 158), (58, 38, 112)),
    "cholera": ((74, 187, 212), (167, 239, 242), (21, 77, 116)),
    "tb": ((202, 144, 77), (247, 197, 127), (93, 55, 34)),
    "candida": ((231, 210, 141), (255, 241, 181), (116, 91, 54)),
    "aspergillus": ((79, 178, 107), (180, 232, 135), (38, 83, 66)),
    "malaria": ((208, 58, 80), (255, 153, 112), (100, 25, 51)),
    "entamoeba": ((173, 124, 200), (238, 196, 219), (87, 58, 126)),
    "ascaris": ((217, 137, 165), (255, 207, 220), (106, 56, 86)),
    "schistosoma": ((156, 116, 204), (228, 184, 235), (65, 45, 122)),
}

CELL_ORDER = [
    "influenza",
    "hiv",
    "cholera",
    "tb",
    "candida",
    "aspergillus",
    "malaria",
    "entamoeba",
    "ascaris",
    "schistosoma",
]


def is_magenta(pixel):
    r, g, b, _a = pixel
    return r > 210 and b > 180 and g < 90 and abs(r - b) < 95


def remove_magenta_background(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    pixels = img.load()
    for y in range(img.height):
        for x in range(img.width):
            if is_magenta(pixels[x, y]):
                pixels[x, y] = (0, 0, 0, 0)
    return img


def crop_sprite_cell(cell: Image.Image) -> Image.Image:
    transparent = remove_magenta_background(cell)
    bbox = transparent.getbbox()
    if not bbox:
        return Image.new("RGBA", (192, 192), (0, 0, 0, 0))

    cropped = transparent.crop(bbox)
    side = max(cropped.width, cropped.height)
    pad = max(18, side // 8)
    canvas = Image.new("RGBA", (side + pad * 2, side + pad * 2), (0, 0, 0, 0))
    canvas.alpha_composite(cropped, ((canvas.width - cropped.width) // 2, (canvas.height - cropped.height) // 2))
    return canvas.resize((192, 192), Image.Resampling.LANCZOS)


def make_back_sprite(front: Image.Image) -> Image.Image:
    back = front.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    alpha = back.getchannel("A")
    shade = Image.new("RGBA", back.size, (25, 33, 62, 42))
    shade.putalpha(alpha.point(lambda value: min(value, 42)))
    return Image.alpha_composite(back, shade)


def split_character_sheet() -> bool:
    if not CHARACTER_SHEET.exists():
        return False

    sheet = Image.open(CHARACTER_SHEET).convert("RGBA")
    cell_w = sheet.width // 5
    cell_h = sheet.height // 2
    for index, monster in enumerate(CELL_ORDER):
        col = index % 5
        row = index // 5
        cell = sheet.crop((col * cell_w, row * cell_h, (col + 1) * cell_w, (row + 1) * cell_h))
        front = crop_sprite_cell(cell)
        front.save(OUT / f"{monster}-front.png")
        make_back_sprite(front).save(OUT / f"{monster}-back.png")
    return True


def split_micro_sheet() -> bool:
    if not MICRO_SHEET.exists():
        return False

    sheet = Image.open(MICRO_SHEET).convert("RGB")
    for index, monster in enumerate(CELL_ORDER):
        col = index % 5
        row = index // 5
        left = round(col * sheet.width / 5)
        right = round((col + 1) * sheet.width / 5)
        top = round(row * sheet.height / 2)
        bottom = round((row + 1) * sheet.height / 2)
        cell = sheet.crop((left, top, right, bottom))

        side = min(cell.width, cell.height) - 8
        crop_left = (cell.width - side) // 2
        crop_top = (cell.height - side) // 2
        square = cell.crop((crop_left, crop_top, crop_left + side, crop_top + side))
        square.resize((384, 384), Image.Resampling.LANCZOS).save(OUT / f"{monster}-micro-front.png")
    return True


def ellipse(draw: ImageDraw.ImageDraw, box, fill, outline=(24, 24, 36), width=2):
    draw.ellipse(box, fill=fill, outline=outline, width=width)


def line(draw: ImageDraw.ImageDraw, points, fill, width=2):
    draw.line(points, fill=fill, width=width, joint="curve")


def eyes(draw: ImageDraw.ImageDraw, x1, y1, x2, y2, mood="sharp"):
    if mood == "round":
        ellipse(draw, (x1, y1, x1 + 4, y1 + 5), (20, 21, 34), width=1)
        ellipse(draw, (x2, y2, x2 + 4, y2 + 5), (20, 21, 34), width=1)
    else:
        draw.polygon([(x1, y1 + 1), (x1 + 6, y1), (x1 + 5, y1 + 4), (x1 + 1, y1 + 5)], fill=(20, 21, 34))
        draw.polygon([(x2, y2), (x2 + 6, y2 + 1), (x2 + 5, y2 + 5), (x2 + 1, y2 + 4)], fill=(20, 21, 34))
    draw.rectangle((x1 + 1, y1 + 1, x1 + 2, y1 + 2), fill=(255, 255, 255))
    draw.rectangle((x2 + 1, y2 + 1, x2 + 2, y2 + 2), fill=(255, 255, 255))


def highlight(draw: ImageDraw.ImageDraw, x, y, size=3):
    draw.rectangle((x, y, x + size, y + size), fill=(255, 255, 240))
    draw.point((x + size + 1, y + 1), fill=(255, 255, 240))


def pixel_canvas():
    return Image.new("RGBA", (48, 48), (0, 0, 0, 0)), None


def sprite(monster: str, front: bool) -> Image.Image:
    img = Image.new("RGBA", (48, 48), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    base, light, dark = PALETTE[monster]
    outline = (23, 22, 36)

    if monster == "influenza":
        for angle in range(0, 360, 45):
            cx = 24 + int(math.cos(math.radians(angle)) * 17)
            cy = 23 + int(math.sin(math.radians(angle)) * 17)
            line(draw, [(24, 23), (cx, cy)], (230, 178, 52), 2)
            ellipse(draw, (cx - 2, cy - 2, cx + 2, cy + 2), (255, 216, 75), outline, 1)
        ellipse(draw, (10, 9, 38, 37), base, outline, 2)
        ellipse(draw, (14, 12, 34, 30), light, dark, 1)
        if front:
            eyes(draw, 17, 20, 28, 20)
            draw.rectangle((22, 28, 27, 30), fill=outline)
    elif monster == "hiv":
        ellipse(draw, (8, 8, 40, 40), base, outline, 2)
        draw.polygon([(24, 14), (34, 21), (30, 34), (18, 34), (14, 21)], outline=light, fill=(121, 93, 182), width=2)
        for angle in range(0, 360, 45):
            cx = 24 + int(math.cos(math.radians(angle)) * 19)
            cy = 24 + int(math.sin(math.radians(angle)) * 19)
            ellipse(draw, (cx - 2, cy - 2, cx + 2, cy + 2), light, outline, 1)
        if front:
            eyes(draw, 17, 22, 27, 22, "round")
    elif monster == "cholera":
        line(draw, [(31, 15), (38, 6), (44, 14)], dark, 2)
        line(draw, [(16, 36), (8, 42), (4, 36)], dark, 2)
        draw.arc((7, 5, 41, 43), 80, 292, fill=outline, width=8)
        draw.arc((8, 6, 40, 42), 80, 292, fill=base, width=6)
        draw.arc((12, 10, 36, 37), 90, 265, fill=light, width=2)
        for p in [(18, 36), (25, 35), (30, 30)]:
            ellipse(draw, (p[0] - 2, p[1] - 2, p[0] + 2, p[1] + 2), light, dark, 1)
        if front:
            eyes(draw, 24, 16, 32, 18)
            draw.rectangle((30, 25, 34, 27), fill=outline)
    elif monster == "tb":
        for x, y, h in [(10, 12, 26), (18, 8, 31), (26, 11, 27), (34, 9, 29)]:
            draw.rounded_rectangle((x, y, x + 7, y + h), radius=3, fill=base, outline=outline, width=2)
            draw.rectangle((x + 2, y + 4, x + 5, y + h - 3), fill=light)
        if front:
            eyes(draw, 17, 22, 28, 22)
    elif monster == "candida":
        for box in [(13, 18, 27, 32), (22, 13, 37, 29), (7, 24, 21, 38), (25, 28, 39, 42), (9, 10, 22, 23)]:
            ellipse(draw, box, base, outline, 2)
            highlight(draw, box[0] + 3, box[1] + 2, 2)
        line(draw, [(28, 16), (36, 8), (42, 9)], dark, 2)
        line(draw, [(14, 34), (7, 42), (3, 40)], dark, 2)
        if front:
            eyes(draw, 17, 24, 27, 24)
    elif monster == "aspergillus":
        line(draw, [(25, 39), (24, 29), (22, 20), (23, 10)], dark, 3)
        for angle in range(0, 360, 30):
            cx = 24 + int(math.cos(math.radians(angle)) * 14)
            cy = 14 + int(math.sin(math.radians(angle)) * 9)
            line(draw, [(24, 14), (cx, cy)], dark, 2)
            ellipse(draw, (cx - 3, cy - 3, cx + 3, cy + 3), base if angle % 60 else light, outline, 1)
        ellipse(draw, (18, 8, 30, 20), light, outline, 2)
        if front:
            eyes(draw, 19, 12, 26, 12, "round")
    elif monster == "malaria":
        ellipse(draw, (8, 10, 40, 38), (136, 35, 55), outline, 2)
        ellipse(draw, (13, 14, 35, 34), (222, 83, 83), dark, 2)
        draw.arc((15, 13, 39, 37), 80, 285, fill=light, width=4)
        for p in [(10, 16), (34, 12), (37, 31)]:
            ellipse(draw, (p[0] - 2, p[1] - 2, p[0] + 2, p[1] + 2), light, outline, 1)
        if front:
            eyes(draw, 18, 22, 28, 22)
    elif monster == "entamoeba":
        blobs = [(10, 15, 39, 37), (7, 21, 23, 39), (25, 8, 41, 24), (4, 11, 20, 26), (29, 28, 43, 43)]
        for box in blobs:
            ellipse(draw, box, base, outline, 2)
        ellipse(draw, (17, 18, 31, 31), light, dark, 1)
        if front:
            eyes(draw, 16, 21, 27, 21, "round")
    elif monster == "ascaris":
        points = [(6, 34), (12, 24), (19, 16), (29, 13), (39, 18), (42, 28), (34, 36)]
        line(draw, points, outline, 9)
        line(draw, points, base, 6)
        for x, y in points[1:-1]:
            ellipse(draw, (x - 3, y - 3, x + 3, y + 3), light, base, 1)
        if front:
            eyes(draw, 31, 21, 38, 23)
            draw.rectangle((35, 29, 39, 31), fill=outline)
    elif monster == "schistosoma":
        line(draw, [(12, 37), (16, 24), (23, 13), (35, 9), (42, 16)], outline, 7)
        line(draw, [(12, 37), (16, 24), (23, 13), (35, 9), (42, 16)], base, 4)
        line(draw, [(10, 33), (20, 28), (31, 29), (39, 38)], outline, 6)
        line(draw, [(10, 33), (20, 28), (31, 29), (39, 38)], light, 3)
        ellipse(draw, (29, 7, 42, 20), base, outline, 2)
        if front:
            eyes(draw, 32, 11, 38, 12, "round")

    if not front:
        img = img.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
        shade = Image.new("RGBA", img.size, (42, 50, 76, 42))
        img = Image.alpha_composite(img, shade)

    return img.resize((96, 96), Image.Resampling.NEAREST)


def micro_canvas(monster: str, tint: tuple[int, int, int]) -> tuple[Image.Image, ImageDraw.ImageDraw, random.Random]:
    rng = random.Random(f"micro-{monster}")
    img = Image.new("RGBA", (384, 384), (*tint, 255))
    draw = ImageDraw.Draw(img, "RGBA")

    for _ in range(8500):
        x, y = rng.randrange(384), rng.randrange(384)
        noise = rng.randrange(-24, 26)
        r = max(0, min(255, tint[0] + noise))
        g = max(0, min(255, tint[1] + noise))
        b = max(0, min(255, tint[2] + noise))
        draw.point((x, y), fill=(r, g, b, rng.randrange(22, 64)))

    for _ in range(75):
        x, y = rng.randrange(-30, 384), rng.randrange(-30, 384)
        rx, ry = rng.randrange(16, 72), rng.randrange(10, 48)
        color = (
            max(0, min(255, tint[0] + rng.randrange(-35, 36))),
            max(0, min(255, tint[1] + rng.randrange(-35, 36))),
            max(0, min(255, tint[2] + rng.randrange(-35, 36))),
            rng.randrange(22, 52),
        )
        draw.ellipse((x - rx, y - ry, x + rx, y + ry), fill=color)

    return img.filter(ImageFilter.GaussianBlur(0.45)), ImageDraw.Draw(img, "RGBA"), rng


def draw_soft_line(draw: ImageDraw.ImageDraw, points, fill, width):
    draw.line(points, fill=fill, width=width, joint="curve")
    draw.line(points, fill=tuple(min(255, c + 38) for c in fill[:3]) + (max(60, fill[3] // 2),), width=max(1, width // 3))


def micro(monster: str) -> Image.Image:
    tint_by_monster = {
        "influenza": (138, 44, 44),
        "hiv": (132, 34, 42),
        "cholera": (72, 80, 122),
        "tb": (114, 152, 190),
        "candida": (228, 206, 216),
        "aspergillus": (222, 222, 202),
        "malaria": (166, 42, 42),
        "entamoeba": (202, 190, 174),
        "ascaris": (232, 218, 196),
        "schistosoma": (219, 201, 188),
    }
    img, draw, rng = micro_canvas(monster, tint_by_monster[monster])
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ldraw = ImageDraw.Draw(layer, "RGBA")

    if monster == "influenza":
        for _ in range(9):
            x, y = rng.randrange(55, 332), rng.randrange(52, 332)
            r = rng.randrange(27, 42)
            ldraw.ellipse((x - r, y - r, x + r, y + r), fill=(81, 151, 70, 210), outline=(26, 83, 48, 190), width=3)
            ldraw.ellipse((x - r + 7, y - r + 6, x + r - 8, y + r - 7), fill=(120, 178, 74, 80))
            for angle in range(0, 360, 24):
                sx = x + math.cos(math.radians(angle)) * (r + 10)
                sy = y + math.sin(math.radians(angle)) * (r + 10)
                ldraw.line((x, y, sx, sy), fill=(173, 207, 52, 180), width=4)
                ldraw.ellipse((sx - 7, sy - 7, sx + 7, sy + 7), fill=(23, 142, 122, 210), outline=(7, 82, 75, 140), width=2)
    elif monster == "hiv":
        x, y, r = 192, 192, 110
        ldraw.ellipse((x - r, y - r, x + r, y + r), fill=(102, 186, 177, 76), outline=(226, 233, 235, 170), width=7)
        ldraw.ellipse((x - r + 18, y - r + 18, x + r - 18, y + r - 18), outline=(31, 154, 145, 220), width=16)
        ldraw.pieslice((x - 78, y - 88, x + 82, y + 86), 258, 82, fill=(245, 245, 238, 54))
        ldraw.polygon([(154, 102), (230, 122), (240, 244), (172, 280), (138, 202)], fill=(54, 142, 134, 150), outline=(230, 244, 240, 130))
        for dx in [-22, 10, 36]:
            ldraw.line((180 + dx, 130, 198 + dx, 248), fill=(79, 192, 176, 200), width=5)
            for yy in range(148, 232, 18):
                ldraw.line((184 + dx, yy, 194 + dx, yy + 3), fill=(203, 244, 232, 140), width=2)
        for angle in range(0, 360, 30):
            sx = x + math.cos(math.radians(angle)) * (r + 12)
            sy = y + math.sin(math.radians(angle)) * (r + 12)
            ldraw.line((x + math.cos(math.radians(angle)) * r, y + math.sin(math.radians(angle)) * r, sx, sy), fill=(230, 235, 235, 150), width=3)
            ldraw.ellipse((sx - 9, sy - 9, sx + 9, sy + 9), fill=(30, 172, 156, 185))
    elif monster == "cholera":
        for _ in range(42):
            x, y = rng.randrange(20, 370), rng.randrange(20, 365)
            r = rng.randrange(22, 46)
            start = rng.randrange(20, 110)
            end = start + rng.randrange(150, 240)
            color = (206, 180, 230, rng.randrange(180, 230))
            ldraw.arc((x - r, y - r, x + r, y + r), start, end, fill=(88, 68, 118, 180), width=13)
            ldraw.arc((x - r + 2, y - r + 2, x + r - 2, y + r - 2), start, end, fill=color, width=9)
            tail_angle = math.radians(end)
            tx = x + math.cos(tail_angle) * r
            ty = y + math.sin(tail_angle) * r
            for k in range(2):
                wave = [(tx + n * 12, ty + math.sin(n * 0.9 + k) * 8) for n in range(7)]
                ldraw.line(wave, fill=(220, 218, 244, 110), width=2)
    elif monster == "tb":
        for _ in range(58):
            x, y = rng.randrange(20, 364), rng.randrange(22, 362)
            length = rng.randrange(34, 72)
            angle = rng.random() * math.pi
            dx = math.cos(angle) * length / 2
            dy = math.sin(angle) * length / 2
            draw_soft_line(ldraw, [(x - dx, y - dy), (x + dx, y + dy)], (196, 32, 61, 220), 8)
    elif monster == "candida":
        for _ in range(26):
            x, y = rng.randrange(35, 350), rng.randrange(35, 350)
            rx, ry = rng.randrange(16, 31), rng.randrange(13, 28)
            ldraw.ellipse((x - rx, y - ry, x + rx, y + ry), fill=(234, 196, 224, 165), outline=(104, 78, 126, 130), width=3)
            ldraw.ellipse((x - 5, y - 5, x + 6, y + 6), fill=(92, 58, 116, 100))
            if rng.random() < 0.65:
                bx, by = x + rng.randrange(-20, 22), y - rng.randrange(16, 30)
                ldraw.ellipse((bx - 11, by - 10, bx + 13, by + 12), fill=(238, 206, 232, 145), outline=(112, 82, 128, 110), width=2)
        for _ in range(8):
            pts = [(rng.randrange(20, 360), rng.randrange(40, 340))]
            for _j in range(5):
                lx, ly = pts[-1]
                pts.append((lx + rng.randrange(-24, 30), ly + rng.randrange(-18, 22)))
            ldraw.line(pts, fill=(142, 94, 150, 90), width=10, joint="curve")
            ldraw.line(pts, fill=(240, 207, 232, 110), width=5, joint="curve")
    elif monster == "aspergillus":
        for _ in range(15):
            base_x = rng.randrange(25, 360)
            base_y = rng.randrange(220, 390)
            top_x = base_x + rng.randrange(-42, 42)
            top_y = base_y - rng.randrange(90, 165)
            ldraw.line((base_x, base_y, top_x, top_y), fill=(42, 79, 70, 185), width=6)
            for angle in range(0, 360, 16):
                radius = rng.randrange(28, 52)
                sx = top_x + math.cos(math.radians(angle)) * radius
                sy = top_y + math.sin(math.radians(angle)) * radius
                ldraw.line((top_x, top_y, sx, sy), fill=(42, 91, 78, 160), width=3)
                ldraw.ellipse((sx - 8, sy - 8, sx + 8, sy + 8), fill=(49, 150, 93, 200), outline=(15, 70, 52, 130), width=2)
    elif monster == "malaria":
        for _ in range(36):
            x, y = rng.randrange(25, 360), rng.randrange(25, 360)
            r = rng.randrange(24, 38)
            ldraw.ellipse((x - r, y - r, x + r, y + r), fill=(219, 98, 92, 150), outline=(112, 30, 50, 100), width=3)
            ldraw.ellipse((x - r + 8, y - r + 8, x + r - 8, y + r - 8), outline=(247, 162, 132, 95), width=5)
            if rng.random() < 0.72:
                ldraw.arc((x - 12, y - 12, x + 13, y + 13), 35, 320, fill=(66, 42, 128, 215), width=5)
                ldraw.ellipse((x + 5, y - 4, x + 10, y + 2), fill=(38, 26, 86, 230))
    elif monster == "entamoeba":
        for _ in range(11):
            cx, cy = rng.randrange(55, 330), rng.randrange(55, 330)
            pts = []
            for angle in range(0, 360, 22):
                radius = rng.randrange(28, 58)
                pts.append((cx + math.cos(math.radians(angle)) * radius, cy + math.sin(math.radians(angle)) * radius))
            ldraw.polygon(pts, fill=(184, 166, 139, 122), outline=(90, 76, 62, 110))
            ldraw.ellipse((cx - 10, cy - 8, cx + 12, cy + 11), fill=(78, 57, 92, 120))
            ldraw.ellipse((cx - 3, cy - 2, cx + 4, cy + 4), fill=(42, 32, 62, 140))
    elif monster == "ascaris":
        for _ in range(9):
            x, y = rng.randrange(50, 334), rng.randrange(52, 332)
            rx, ry = rng.randrange(42, 70), rng.randrange(28, 42)
            ldraw.ellipse((x - rx, y - ry, x + rx, y + ry), fill=(202, 162, 112, 150), outline=(96, 68, 44, 130), width=4)
            ldraw.ellipse((x - rx + 10, y - ry + 8, x + rx - 10, y + ry - 8), outline=(240, 210, 160, 90), width=5)
            for angle in range(0, 360, 22):
                sx = x + math.cos(math.radians(angle)) * rx
                sy = y + math.sin(math.radians(angle)) * ry
                ldraw.line((sx, sy, sx + math.cos(math.radians(angle)) * 10, sy + math.sin(math.radians(angle)) * 7), fill=(120, 82, 52, 92), width=2)
            ldraw.line((x - rx + 22, y, x + rx - 24, y + rng.randrange(-5, 6)), fill=(100, 68, 50, 110), width=3)
    elif monster == "schistosoma":
        for _ in range(9):
            x, y = rng.randrange(55, 330), rng.randrange(55, 330)
            rx, ry = rng.randrange(38, 65), rng.randrange(20, 35)
            ldraw.ellipse((x - rx, y - ry, x + rx, y + ry), fill=(209, 166, 150, 150), outline=(111, 63, 72, 130), width=4)
            spine = [(x + rx - 4, y), (x + rx + 32, y - rng.randrange(8, 18)), (x + rx + 10, y + rng.randrange(8, 18))]
            ldraw.polygon(spine, fill=(132, 70, 82, 150))
            ldraw.ellipse((x - 8, y - 6, x + 9, y + 7), fill=(103, 57, 72, 95))

    img = Image.alpha_composite(img, layer.filter(ImageFilter.GaussianBlur(0.35)))
    img = img.filter(ImageFilter.UnsharpMask(radius=1.4, percent=130, threshold=4))
    return img.convert("RGB")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    if not split_character_sheet():
        for monster in MONSTERS:
            sprite(monster, True).save(OUT / f"{monster}-front.png")
            sprite(monster, False).save(OUT / f"{monster}-back.png")

    if not split_micro_sheet():
        for monster in MONSTERS:
            micro(monster).save(OUT / f"{monster}-micro-front.png")


if __name__ == "__main__":
    main()
