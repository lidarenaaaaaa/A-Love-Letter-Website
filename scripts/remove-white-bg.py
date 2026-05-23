from pathlib import Path
from PIL import Image, ImageFilter
import numpy as np
import argparse


def cut_white_to_alpha(img: Image.Image) -> Image.Image:
    """Remove near-white backgrounds and keep soft anti-aliased edges."""
    img = img.convert("RGBA")
    arr = np.asarray(img).astype(np.float32)
    rgb = arr[:, :, :3]
    original_alpha = arr[:, :, 3]

    # Distance from pure white. 16-54 creates a soft transition edge.
    dist = np.sqrt(((255 - rgb) ** 2).sum(axis=2))
    alpha = ((dist - 16) / 38 * 255).clip(0, 255)
    arr[:, :, 3] = np.minimum(alpha, original_alpha)

    out = Image.fromarray(arr.astype(np.uint8), "RGBA")
    out.putalpha(out.getchannel("A").filter(ImageFilter.GaussianBlur(0.35)))
    return out


parser = argparse.ArgumentParser(description="Batch remove white backgrounds from generated assets.")
parser.add_argument("input_dir", help="Folder containing .png/.jpg/.jpeg/.webp assets")
parser.add_argument("--out", default=None, help="Output folder. Defaults to overwriting input files.")
args = parser.parse_args()

input_dir = Path(args.input_dir)
out_dir = Path(args.out) if args.out else input_dir
out_dir.mkdir(parents=True, exist_ok=True)

for path in input_dir.iterdir():
    if path.suffix.lower() not in [".png", ".jpg", ".jpeg", ".webp"]:
        continue

    img = Image.open(path)
    cut = cut_white_to_alpha(img)
    out_path = out_dir / (path.stem + ".webp")
    cut.save(out_path, "WEBP", quality=82, method=0)
    print("processed", out_path)
