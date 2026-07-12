from __future__ import annotations

import argparse
from pathlib import Path
from shutil import copy2

from PIL import Image


def remove_magenta(image: Image.Image) -> Image.Image:
    image = image.convert("RGBA")
    pixels = image.load()
    for y in range(image.height):
        for x in range(image.width):
            r, g, b, a = pixels[x, y]
            if a and r > 170 and b > 150 and g < 95 and (r - g) > 90 and (b - g) > 80:
                pixels[x, y] = (0, 0, 0, 0)
    return image


def x_runs(image: Image.Image, min_gap: int = 8) -> list[tuple[int, int]]:
    alpha = image.getchannel("A")
    non_empty: list[int] = []
    for x in range(image.width):
        count = sum(1 for y in range(image.height) if alpha.getpixel((x, y)) > 0)
        if count > 2:
            non_empty.append(x)

    if not non_empty:
        return []

    runs: list[tuple[int, int]] = []
    start = previous = non_empty[0]
    for x in non_empty[1:]:
        if x - previous > min_gap:
            runs.append((start, previous))
            start = x
        previous = x
    runs.append((start, previous))
    return runs


def fallback_runs(width: int, count: int) -> list[tuple[int, int]]:
    cell_width = width / count
    return [(round(index * cell_width), round((index + 1) * cell_width) - 1) for index in range(count)]


def crop_character(source: Image.Image, run: tuple[int, int]) -> Image.Image:
    left = max(0, run[0] - 12)
    right = min(source.width, run[1] + 13)
    cell = source.crop((left, 0, right, source.height))
    bbox = cell.getbbox()
    if not bbox:
        return Image.new("RGBA", (192, 192), (0, 0, 0, 0))

    cropped = cell.crop(bbox)
    side = max(cropped.width, cropped.height)
    pad = max(28, side // 9)
    canvas = Image.new("RGBA", (side + pad * 2, side + pad * 2), (0, 0, 0, 0))
    canvas.alpha_composite(cropped, ((canvas.width - cropped.width) // 2, (canvas.height - cropped.height) // 2))
    return canvas.resize((192, 192), Image.Resampling.LANCZOS)


def make_back_sprite(front: Image.Image) -> Image.Image:
    back = front.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    alpha = back.getchannel("A")
    shade = Image.new("RGBA", back.size, (25, 33, 62, 46))
    shade.putalpha(alpha.point(lambda value: min(value, 46)))
    return Image.alpha_composite(back, shade)


def content_bbox(image: Image.Image) -> tuple[int, int, int, int]:
    rgb = image.convert("RGB")
    mask = Image.new("L", rgb.size, 0)
    pixels = rgb.load()
    mask_pixels = mask.load()
    for y in range(rgb.height):
        for x in range(rgb.width):
            r, g, b = pixels[x, y]
            if min(r, g, b) < 245:
                mask_pixels[x, y] = 255
    return mask.getbbox() or (0, 0, rgb.width, rgb.height)


def crop_micro(source: Image.Image, index: int, count: int) -> Image.Image:
    left_all, top_all, right_all, bottom_all = content_bbox(source)
    top_all = max(0, top_all - 8)
    bottom_all = min(source.height, bottom_all + 8)
    cell_width = (right_all - left_all) / count
    left = round(left_all + index * cell_width)
    right = round(left_all + (index + 1) * cell_width)
    cell = source.crop((left, top_all, right, bottom_all))
    side = min(cell.width, cell.height)
    crop_left = max(0, (cell.width - side) // 2)
    crop_top = max(0, (cell.height - side) // 2)
    square = cell.crop((crop_left, crop_top, crop_left + side, crop_top + side))
    return square.resize((384, 384), Image.Resampling.LANCZOS)


def copy_to_dist(public_path: Path, public_dir: Path, dist_dir: Path | None) -> None:
    if not dist_dir:
        return
    dist_dir.mkdir(parents=True, exist_ok=True)
    copy2(public_path, dist_dir / public_path.relative_to(public_dir))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--kind", choices=["character", "micro"], required=True)
    parser.add_argument("--source", required=True)
    parser.add_argument("--ids", required=True)
    parser.add_argument("--batch", required=True)
    parser.add_argument("--public-dir", default="app/public/images/pathimon")
    parser.add_argument("--dist-dir", default="app/dist/images/pathimon")
    args = parser.parse_args()

    ids = [token.strip() for token in args.ids.split(",") if token.strip()]
    public_dir = Path(args.public_dir)
    dist_dir = Path(args.dist_dir) if args.dist_dir else None
    public_dir.mkdir(parents=True, exist_ok=True)

    source = Image.open(Path(args.source))
    source_name = f"pathimon-{args.kind}-sheet-{args.batch}-source.png"
    source_path = public_dir / source_name
    source.save(source_path)
    copy_to_dist(source_path, public_dir, dist_dir)

    if args.kind == "character":
        transparent = remove_magenta(source)
        runs = x_runs(transparent)
        if len(runs) != len(ids):
            runs = fallback_runs(transparent.width, len(ids))
        for monster_id, run in zip(ids, runs):
            front = crop_character(transparent, run)
            front_path = public_dir / f"{monster_id}-front.png"
            back_path = public_dir / f"{monster_id}-back.png"
            front.save(front_path)
            make_back_sprite(front).save(back_path)
            copy_to_dist(front_path, public_dir, dist_dir)
            copy_to_dist(back_path, public_dir, dist_dir)
            print(f"{monster_id} front/back {front_path.stat().st_size} {back_path.stat().st_size}")
        return

    rgb = source.convert("RGB")
    for index, monster_id in enumerate(ids):
        micro = crop_micro(rgb, index, len(ids))
        micro_path = public_dir / f"{monster_id}-micro-front.png"
        micro.save(micro_path)
        copy_to_dist(micro_path, public_dir, dist_dir)
        print(f"{monster_id} micro {micro_path.stat().st_size}")


if __name__ == "__main__":
    main()
