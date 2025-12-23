async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`無法載入 ${path}`);
  return res.json();
}

function renderHighlights(items) {
  const container = document.getElementById('highlightGrid');
  container.innerHTML = items.map(item => `
    <div class="highlight">
      <div class="category">${item.category}</div>
      <div class="label">${item.label}</div>
      <div class="status">${item.status === '' ? '已提供' : item.status}</div>
    </div>
  `).join('');
}

function renderPhotos(photos) {
  const gallery = document.getElementById('photoGallery');
  gallery.innerHTML = photos.map(photo => `
    <figure class="photo">
      <img src="${photo.url}" alt="${photo.caption}">
      <figcaption class="caption">${photo.caption}</figcaption>
    </figure>
  `).join('');
}

function buildTagOptions(reviews) {
  const select = document.getElementById('tagFilter');
  const tags = new Set();
  reviews.forEach(r => r.tags.forEach(t => tags.add(t)));
  [...tags].sort().forEach(tag => {
    const option = document.createElement('option');
    option.value = tag;
    option.textContent = tag;
    select.appendChild(option);
  });
}

function renderReviews(reviews) {
  const list = document.getElementById('reviewList');
  list.innerHTML = reviews.map(review => `
    <article class="review">
      <img src="${review.avatar}" alt="${review.author}">
      <div>
        <div class="review__meta">
          <div>
            <h3>${review.author}</h3>
            <span>${review.role}</span>
          </div>
          <span>${review.time}</span>
        </div>
        <p class="review__text">${review.text}</p>
        ${review.tags.length ? `<div class="tags">${review.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
      </div>
    </article>
  `).join('');
}

async function initPage() {
  try {
    const [highlights, photos, reviews] = await Promise.all([
      fetchJSON('data/highlights.json'),
      fetchJSON('data/photos.json'),
      fetchJSON('data/reviews.json'),
    ]);

    renderHighlights(highlights);
    renderPhotos(photos);
    buildTagOptions(reviews);
    renderReviews(reviews);

    const searchInput = document.getElementById('reviewSearch');
    const tagFilter = document.getElementById('tagFilter');

    function applyFilters() {
      const keyword = searchInput.value.trim();
      const tag = tagFilter.value;

      const filtered = reviews.filter(review => {
        const matchKeyword = !keyword || (review.text + review.author + review.role).includes(keyword);
        const matchTag = !tag || review.tags.includes(tag);
        return matchKeyword && matchTag;
      });
      renderReviews(filtered);
    }

    searchInput.addEventListener('input', applyFilters);
    tagFilter.addEventListener('change', applyFilters);
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', initPage);
