from __future__ import annotations

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS_DATA = ROOT / "docs" / "data" / "data.json"


def load_reviews(path: Path) -> list[dict]:
    reviews: list[dict] = []
    with path.open(newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        headers = next(reader, None)
        for row in reader:
            if not any(row):
                continue
            review = {
                "avatar": row[0].strip(),
                "author": row[1].strip(),
                "badge": row[2].strip(),
                "time": row[3].strip(),
                "body": row[4].replace("\n", " ").strip(),
                "tag": row[5].strip(),
            }
            reviews.append(review)
    return reviews


def load_features(path: Path) -> list[dict]:
    features: list[dict] = []
    with path.open(newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        next(reader, None)
        for row in reader:
            if len(row) < 3 or not row[0].strip():
                continue
            features.append({
                "title": row[0].strip(),
                "value": row[2].strip(),
            })
    return features


def load_gallery(path: Path) -> list[dict]:
    gallery: list[dict] = []
    with path.open(newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        next(reader, None)
        for row in reader:
            if len(row) < 2 or not row[0].strip():
                continue
            url, label = row[0].strip(), row[1].replace("\n", " ").strip()
            gallery.append({"src": url, "label": label})
    return gallery


def main() -> None:
    data = {
        "name": "品味小舖",
        "description": "藏身於巷弄、主打復古奶茶與咖啡的溫暖小店，保留銅板價格的誠意口碑。",
        "features": load_features(ROOT / "google-簡介.csv"),
        "reviews": load_reviews(ROOT / "google-2025-12-23.csv"),
        "gallery": load_gallery(ROOT / "google-地圖.csv"),
    }

    DOCS_DATA.parent.mkdir(parents=True, exist_ok=True)
    DOCS_DATA.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
