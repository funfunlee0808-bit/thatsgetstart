const reviewContainer = document.getElementById('reviews-list');
const highlightContainer = document.getElementById('highlights');
const photoGrid = document.getElementById('photo-grid');

const createSpinner = () => {
  const wrap = document.createElement('div');
  wrap.className = 'centered';
  wrap.innerHTML = '<div class="spinner" aria-label="載入中"></div>';
  return wrap;
};

const sanitize = (value, fallback = '') => {
  if (value === undefined || value === null) return fallback;
  return String(value).trim();
};

const renderHighlights = (rows) => {
  highlightContainer.innerHTML = '';
  rows.forEach((row) => {
    const card = document.createElement('article');
    card.className = 'highlight';

    const statusText = sanitize(row['f5BGzb']);
    const detail = sanitize(row['iNvpkb']);
    const title = sanitize(row['iL3Qke']);

    const pill = document.createElement('div');
    pill.className = 'highlight__status';
    pill.textContent = statusText || '特色';

    const heading = document.createElement('h3');
    heading.className = 'highlight__title';
    heading.textContent = title || '店家資訊';

    const copy = document.createElement('p');
    copy.className = 'lede';
    copy.textContent = detail || '到店後可向店員洽詢更多資訊。';

    card.append(pill, heading, copy);
    highlightContainer.appendChild(card);
  });
};

const renderPhotos = (rows) => {
  photoGrid.innerHTML = '';
  const items = rows.filter((row) => sanitize(row['DaSXdd src'])).slice(0, 8);
  items.forEach((row) => {
    const img = document.createElement('img');
    img.src = sanitize(row['DaSXdd src']);
    img.alt = sanitize(row['zaTlhd']) || '店內環境照';
    img.loading = 'lazy';
    photoGrid.appendChild(img);
  });
};

const renderReviews = (rows) => {
  reviewContainer.innerHTML = '';
  rows.forEach((row) => {
    const card = document.createElement('article');
    card.className = 'review';

    const header = document.createElement('div');
    header.className = 'review__header';

    const avatar = document.createElement('img');
    avatar.className = 'review__avatar';
    avatar.src = sanitize(row['NBa7we src']) || 'https://placehold.co/104x104/fff7ed/7c2d12?text=T';
    avatar.alt = `${sanitize(row['d4r55'], '訪客')} 的頭像`;
    avatar.loading = 'lazy';

    const meta = document.createElement('div');
    meta.className = 'review__meta';

    const name = document.createElement('p');
    name.className = 'review__name';
    name.textContent = sanitize(row['d4r55'], '訪客');

    const tag = document.createElement('span');
    tag.className = 'review__tag';
    tag.textContent = sanitize(row['RfnDt']);

    const time = document.createElement('span');
    time.className = 'review__time';
    time.textContent = sanitize(row['rsqaWe'], '近期評論');

    meta.append(name, tag, time);
    header.append(avatar, meta);

    const copy = document.createElement('p');
    copy.className = 'lede';
    copy.textContent = sanitize(row['wiI7pd'], '歡迎光臨品味小舖，留下你的感想！');

    const rating = document.createElement('p');
    rating.className = 'review__tag';
    rating.textContent = sanitize(row['RfDO5c']) || sanitize(row['RfDO5c (2)']) || '';

    card.append(header, copy, rating);
    reviewContainer.appendChild(card);
  });

  const cards = Array.from(reviewContainer.querySelectorAll('.review'));
  if (!cards.length) return;

  const gap = parseFloat(getComputedStyle(reviewContainer).gap) || 0;
  const visibleCount = Math.min(4, cards.length);
  const sampleHeight = cards[0].getBoundingClientRect().height;
  const maxHeight = sampleHeight * visibleCount + gap * (visibleCount - 1);

  reviewContainer.style.maxHeight = `${maxHeight}px`;
  reviewContainer.style.overflowY = cards.length > visibleCount ? 'auto' : 'visible';
};

const loadCSV = (url, onComplete) => {
  Papa.parse(url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: ({ data }) => onComplete(data),
    error: () => {
      const fallback = document.createElement('p');
      fallback.className = 'centered';
      fallback.textContent = '載入資料時發生錯誤，請稍後再試。';
      onComplete([]);
      reviewContainer?.replaceChildren(fallback.cloneNode(true));
    }
  });
};

const boot = () => {
  reviewContainer.appendChild(createSpinner());
  highlightContainer.appendChild(createSpinner());
  photoGrid.appendChild(createSpinner());

  loadCSV('google-簡介.csv', renderHighlights);
  loadCSV('google-地圖.csv', renderPhotos);
  loadCSV('google-2025-12-23.csv', renderReviews);
};

boot();
