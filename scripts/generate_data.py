import csv
import json
from pathlib import Path

data_dir = Path('site/data')
data_dir.mkdir(parents=True, exist_ok=True)

# Reviews
reviews = []
with open('google-2025-12-23.csv', newline='', encoding='utf-8') as f:
    reader = csv.reader(f)
    rows = list(reader)

for row in rows[1:]:
    if not row:
        continue
    reviews.append({
        'avatar': row[0],
        'author': row[1],
        'role': row[2],
        'time': row[3],
        'text': row[4].replace('\\n', '\n').strip(),
        'tags': [value for value in [row[5], row[6], row[12], row[13]] if value],
    })

data_dir.joinpath('reviews.json').write_text(json.dumps(reviews, ensure_ascii=False, indent=2), encoding='utf-8')

# Highlights / overview info
highlights = []
with open('google-簡介.csv', newline='', encoding='utf-8') as f:
    reader = csv.reader(f)
    rows = list(reader)

for row in rows[1:]:
    if len(row) < 3:
        continue
    highlights.append({
        'category': row[0],
        'status': row[1],
        'label': row[2],
    })

data_dir.joinpath('highlights.json').write_text(json.dumps(highlights, ensure_ascii=False, indent=2), encoding='utf-8')

# Photos from map gallery
photos = []
with open('google-地圖.csv', newline='', encoding='utf-8') as f:
    reader = csv.reader(f)
    rows = list(reader)

for row in rows[1:]:
    if len(row) < 2:
        continue
    url = row[0].strip()
    caption = row[1].replace('\\n', ' ').strip()
    photos.append({'url': url, 'caption': caption})

data_dir.joinpath('photos.json').write_text(json.dumps(photos, ensure_ascii=False, indent=2), encoding='utf-8')

print(f'Generated {len(reviews)} reviews, {len(highlights)} highlights, {len(photos)} photos')
