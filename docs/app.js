const reviewGrid = document.querySelector('#review-grid');
const featureGrid = document.querySelector('#feature-grid');
const galleryGrid = document.querySelector('#gallery-grid');
const brandName = document.querySelector('#brand-name');
const brandDescription = document.querySelector('#brand-description');
const reviewCount = document.querySelector('#review-count');
const reviewMeta = document.querySelector('#review-meta');

async function loadData() {
  const response = await fetch('./data/data.json');
  const data = await response.json();
  hydrateHero(data);
  renderFeatures(data.features || []);
  renderReviews(data.reviews || []);
  renderGallery(data.gallery || []);
}

function hydrateHero(data) {
  brandName.textContent = data.name;
  brandDescription.textContent = data.description;
  reviewCount.textContent = `${(data.reviews || []).length} 則評論`;
  reviewMeta.textContent = `已整理 ${(data.reviews || []).length} 則 Google 地圖評論`;
}

function renderFeatures(features) {
  featureGrid.innerHTML = '';
  features.forEach((feature) => {
    const card = document.createElement('article');
    card.className = 'feature-card';
    card.innerHTML = `
      <h3>${feature.title}</h3>
      <p>${feature.value}</p>
    `;
    featureGrid.append(card);
  });
}

function renderReviews(reviews) {
  reviewGrid.innerHTML = '';
  const filtered = reviews.filter((review) => review.body).slice(0, 9);

  if (!filtered.length) {
    const empty = document.createElement('p');
    empty.textContent = '暫時沒有評論可以顯示。';
    empty.style.color = 'var(--subtext)';
    reviewGrid.append(empty);
    return;
  }

  filtered.forEach((review) => {
    const card = document.createElement('article');
    card.className = 'review-card';
    card.innerHTML = `
      <div class="review-header">
        <img class="avatar" src="${review.avatar}" alt="${review.author} 的頭像" loading="lazy" />
        <div class="review-meta">
          <span class="name">${review.author}</span>
          <span class="badge">${review.badge}</span>
          <span class="time">${review.time}</span>
        </div>
      </div>
      <p class="review-body">${review.body}</p>
      ${review.tag ? `<span class="tag">${review.tag}</span>` : ''}
    `;
    reviewGrid.append(card);
  });
}

function renderGallery(gallery) {
  galleryGrid.innerHTML = '';
  gallery.slice(0, 8).forEach((item) => {
    const card = document.createElement('article');
    card.className = 'gallery-card';
    card.innerHTML = `
      <img src="${item.src}" alt="${item.label}" loading="lazy" />
      <div class="caption">${item.label}</div>
    `;
    galleryGrid.append(card);
  });
}

loadData();
