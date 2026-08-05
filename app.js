/* ==========================================
   SABİT İNCE MULTILINGUAL & CMS CORE APPLICATION
   ========================================== */

let currentLang = localStorage.getItem('sabit_ince_lang') || 'tr';
let currentCostume = localStorage.getItem('sabit_ince_costume') || 'gold';

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initLanguage(currentLang);
  initCostume(currentCostume);
  renderAllSections();
  initCounters();
  initAudioPlayer();
  db.incrementVisitor();
});

// --- MULTILINGUAL ENGINE ---
function initLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('sabit_ince_lang', lang);
  document.documentElement.setAttribute('lang', lang);

  const select = document.getElementById('lang-selector');
  if (select) select.value = lang;

  // Apply translations to all DOM elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.innerHTML = TRANSLATIONS[lang][key];
    }
  });

  // Apply placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.placeholder = TRANSLATIONS[lang][key];
    }
  });

  renderAllSections();
}

function changeLanguage(lang) {
  initLanguage(lang);
  showToast(`Dil değiştirildi / Language changed to: ${lang.toUpperCase()}`);
}

// --- COSTUME THEME CUSTOMIZER ---
function initCostume(costume) {
  currentCostume = costume;
  localStorage.setItem('sabit_ince_costume', costume);
  document.documentElement.setAttribute('data-costume', costume);

  const select = document.getElementById('costume-selector');
  if (select) select.value = costume;
}

function changeCostumeTheme(costume) {
  initCostume(costume);
  showToast(`Tema Kostümü Güncellendi: ${costume.toUpperCase()}`);
}

// --- STAT COUNTERS ANIMATION ---
function initCounters() {
  const counters = db.counters;
  animateValue('counter-visitors', 0, counters.visitors, 1500);
  animateValue('counter-poems-read', 0, counters.poemsRead, 1500);
  animateValue('counter-audio-listened', 0, counters.audioListened, 1500);
  animateValue('counter-works-count', 0, db.data.poems.length + db.data.books.length, 1500);
}

function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  if (!obj) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerText = Math.floor(progress * (end - start) + start).toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// --- RENDER ALL DYNAMIC SECTIONS ---
function renderAllSections() {
  renderPoetryGrid();
  renderBooksGrid();
  renderAudioPlaylist();
  renderMediaGallery();
  renderArticlesGrid();
  renderGuestbookFeed();
}

// 1. POETRY LIBRARY
function renderPoetryGrid() {
  const grid = document.getElementById('poetry-grid');
  if (!grid) return;

  grid.innerHTML = '';
  const poems = db.data.poems;

  if (poems.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);">Henüz şiir eklenmemiş.</p>`;
    return;
  }

  poems.forEach(poem => {
    const card = document.createElement('div');
    card.className = 'glass-card poem-card';
    card.innerHTML = `
      <div>
        <span class="badge-tag">${poem.categoryName || poem.category}</span>
        <h3 class="poem-title">${poem.title}</h3>
        <div class="poem-excerpt">${poem.excerpt}</div>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:1rem; margin-top:1rem;">
        <span style="font-size:0.8rem; color:var(--text-dim);">${poem.book || 'Sabit İnce'}</span>
        <div style="display:flex; gap:0.5rem;">
          <button class="btn-outline" style="padding:0.4rem 0.8rem; font-size:0.8rem;" onclick="openPoemModal(${poem.id})">
            ${TRANSLATIONS[currentLang]?.btnReadMore || 'Devamını Oku'}
          </button>
          <button class="btn-icon" style="width:32px; height:32px;" onclick="deletePoemItem(${poem.id})" title="Sil">
            <i class="fas fa-trash-alt" style="color:#ef4444; font-size:0.8rem;"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openPoemModal(id) {
  const poem = db.data.poems.find(p => p.id === id);
  if (!poem) return;
  db.incrementPoemRead();

  const modalBody = document.getElementById('poem-modal-body');
  modalBody.innerHTML = `
    <div style="text-align: center; margin-bottom: 2rem;">
      <span class="badge-tag">${poem.categoryName || poem.category}</span>
      <h2 style="font-size: 2.2rem; font-family: var(--font-heading); margin: 0.5rem 0;">${poem.title}</h2>
      <p class="text-muted">Sabit İnce (${poem.book || 'Eserler'}, ${poem.year || ''})</p>
    </div>
    
    <div id="poem-text-content" style="font-family: var(--font-poetry); font-size: 1.35rem; line-height: 1.8; text-align: center; white-space: pre-line; background: rgba(255,255,255,0.02); padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 2rem;">
      ${poem.fullPoem}
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn-outline" onclick="copyPoemText('${poem.title.replace(/'/g, "\\'")}')">
          <i class="far fa-copy"></i> Kopyala
        </button>
      </div>
      <button class="btn-primary" onclick="playPoemAmbientRecitation('${poem.title.replace(/'/g, "\\'")}')">
        <i class="fas fa-volume-up"></i> Ney Eşliğinde Dinle
      </button>
    </div>
  `;
  document.getElementById('poem-modal').classList.add('active');
}

function deletePoemItem(id) {
  if (confirm("Bu şiiri silmek istediğinize emin misiniz?")) {
    db.deletePoem(id);
    renderPoetryGrid();
    showToast(TRANSLATIONS[currentLang]?.msgDeleted || "Şiir silindi.");
  }
}

// 2. BOOKS & DOCUMENTS
function renderBooksGrid() {
  const grid = document.getElementById('books-grid');
  if (!grid) return;

  grid.innerHTML = '';
  db.data.books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'glass-card book-card';
    card.innerHTML = `
      <img src="${book.fileUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600'}" class="book-cover-img" alt="${book.title}">
      <span class="badge-tag" style="align-self:flex-start; margin-bottom:0.5rem;">${book.type}</span>
      <h3 style="font-size:1.3rem; margin-bottom:0.5rem;">${book.title}</h3>
      <p style="font-size:0.9rem; color:var(--text-muted); flex-grow:1;">${book.desc}</p>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1.25rem; border-top:1px solid var(--border-color); padding-top:0.75rem;">
        <span style="font-size:0.8rem; color:var(--text-dim);">${book.year} • ${book.pages}</span>
        <div style="display:flex; gap:0.4rem;">
          <button class="btn-outline" style="padding:0.4rem 0.8rem; font-size:0.8rem;" onclick="openBookModal(${book.id})">
            ${TRANSLATIONS[currentLang]?.btnInspect || 'İncele'}
          </button>
          <button class="btn-icon" style="width:32px; height:32px;" onclick="deleteBookItem(${book.id})">
            <i class="fas fa-trash-alt" style="color:#ef4444; font-size:0.8rem;"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openBookModal(id) {
  const book = db.data.books.find(b => b.id === id);
  if (!book) return;

  const modalBody = document.getElementById('generic-modal-body');
  modalBody.innerHTML = `
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <span class="badge-tag">${book.type}</span>
      <h2 style="font-size: 2rem; font-family: var(--font-heading); margin-top: 0.5rem;">${book.title}</h2>
      <p class="text-muted">Sabit İnce (${book.year})</p>
    </div>
    <div style="background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
      <p style="font-size: 1.05rem; line-height: 1.7;">${book.desc}</p>
      <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 1rem 0;">
      <div style="font-size: 0.9rem;">
        <p><strong>Sayfa Sayısı:</strong> ${book.pages}</p>
        <p><strong>ISBN / Belge Kodu:</strong> ${book.isbn || 'ANASAM Arşivi'}</p>
      </div>
    </div>
    <div style="text-align: center;">
      <button class="btn-primary" onclick="showToast('Belge / Kitap görüntüleme başlatıldı.'); closeModal('generic-modal');">
        <i class="fas fa-download"></i> Belgeyi İndir / Oku
      </button>
    </div>
  `;
  document.getElementById('generic-modal').classList.add('active');
}

function deleteBookItem(id) {
  if (confirm("Bu kitabı/belgeyi silmek istediğinize emin misiniz?")) {
    db.deleteBook(id);
    renderBooksGrid();
    showToast(TRANSLATIONS[currentLang]?.msgDeleted || "Silindi.");
  }
}

// 3. AUDIO PLAYER & PLAYLIST
function renderAudioPlaylist() {
  const list = document.getElementById('playlist-list');
  if (!list) return;

  list.innerHTML = '';
  db.data.audio.forEach((track, index) => {
    const item = document.createElement('div');
    item.className = 'glass-card';
    item.style.padding = '0.75rem 1.25rem';
    item.style.marginBottom = '0.5rem';
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.justifySpaceBetween = 'space-between';
    item.style.cursor = 'pointer';
    item.innerHTML = `
      <div style="display:flex; align-items:center; gap:1rem;" onclick="playAudioTrack('${track.title.replace(/'/g, "\\'")}')">
        <i class="fas fa-play text-gold"></i>
        <div>
          <div style="font-weight:600; font-size:0.95rem;">${track.title}</div>
          <div style="font-size:0.75rem; color:var(--text-dim);">${track.type}</div>
        </div>
      </div>
      <button class="btn-icon" style="width:28px; height:28px;" onclick="deleteAudioItem(${track.id})">
        <i class="fas fa-trash-alt" style="color:#ef4444; font-size:0.75rem;"></i>
      </button>
    `;
    list.appendChild(item);
  });
}

function playAudioTrack(title) {
  showToast(`Çalınıyor: ${title}`);
}

function deleteAudioItem(id) {
  if (confirm("Bu müziği silmek istediğinize emin misiniz?")) {
    db.deleteAudio(id);
    renderAudioPlaylist();
    showToast("Müzik silindi.");
  }
}

// 4. MEDIA & VIDEO GALLERY
function renderMediaGallery() {
  const grid = document.getElementById('media-grid');
  if (!grid) return;

  grid.innerHTML = '';
  db.data.media.forEach(m => {
    const card = document.createElement('div');
    card.className = 'glass-card media-card';

    let mediaContent = '';
    if (m.type === 'video') {
      mediaContent = `<div class="media-preview"><iframe src="${m.url}" allowfullscreen></iframe></div>`;
    } else {
      mediaContent = `<div class="media-preview"><img src="${m.url}" alt="${m.title}"></div>`;
    }

    card.innerHTML = `
      ${mediaContent}
      <div class="media-info">
        <h4 style="font-size:1.1rem; margin-bottom:0.25rem;">${m.title}</h4>
        <p style="font-size:0.85rem; color:var(--text-muted);">${m.caption || ''}</p>
        <div style="text-align:right; margin-top:0.5rem;">
          <button class="btn-icon" style="width:28px; height:28px; display:inline-flex;" onclick="deleteMediaItem(${m.id})">
            <i class="fas fa-trash-alt" style="color:#ef4444; font-size:0.75rem;"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function deleteMediaItem(id) {
  if (confirm("Bu medyayı silmek istediğinize emin misiniz?")) {
    db.deleteMedia(id);
    renderMediaGallery();
    showToast("Medya silindi.");
  }
}

// 5. ARTICLES & JOURNALISM
function renderArticlesGrid() {
  const grid = document.getElementById('articles-grid');
  if (!grid) return;

  grid.innerHTML = '';
  db.data.articles.forEach(art => {
    const card = document.createElement('div');
    card.className = 'glass-card article-card';
    card.style.padding = '2rem';
    card.innerHTML = `
      <span style="font-size:0.8rem; color:var(--accent-gold-light); font-weight:600;"><i class="far fa-calendar"></i> ${art.date}</span>
      <h3 style="font-size:1.35rem; font-weight:700; margin:0.5rem 0;">${art.title}</h3>
      <p style="font-size:0.95rem; color:var(--text-muted); margin-bottom:1.5rem;">${art.excerpt}</p>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <button class="btn-outline" onclick="openArticleModal('${art.title.replace(/'/g, "\\'")}', '${art.date}', '${art.content.replace(/'/g, "\\'")}')">
          ${TRANSLATIONS[currentLang]?.btnReadMore || 'Devamını Oku'}
        </button>
        <button class="btn-icon" style="width:32px; height:32px;" onclick="deleteArticleItem(${art.id})">
          <i class="fas fa-trash-alt" style="color:#ef4444; font-size:0.8rem;"></i>
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openArticleModal(title, date, content) {
  const modalBody = document.getElementById('generic-modal-body');
  modalBody.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <span class="badge-tag">İnce Zımbalar • Köşe Yazısı</span>
      <h2 style="font-size: 2rem; font-family: var(--font-heading); margin-top: 0.5rem;">${title}</h2>
      <p class="text-muted"><i class="far fa-calendar-alt"></i> ${date} • Sabit İnce</p>
    </div>
    <div style="font-size: 1.05rem; line-height: 1.8; color: var(--text-main); background: rgba(255,255,255,0.02); padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
      ${content}
    </div>
  `;
  document.getElementById('generic-modal').classList.add('active');
}

function deleteArticleItem(id) {
  if (confirm("Bu makaleyi silmek istediğinize emin misiniz?")) {
    db.deleteArticle(id);
    renderArticlesGrid();
    showToast("Makale silindi.");
  }
}

// 6. GUESTBOOK
function renderGuestbookFeed() {
  const container = document.getElementById('comments-feed');
  if (!container) return;

  container.innerHTML = '';
  db.data.guestbook.forEach(c => {
    const card = document.createElement('div');
    card.className = 'glass-card';
    card.style.padding = '1.25rem';
    card.style.marginBottom = '1rem';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
        <span style="font-weight:700; color:var(--accent-gold-light);"><i class="fas fa-user-circle"></i> ${c.name}</span>
        <span style="font-size:0.75rem; color:var(--text-dim);">${c.date}</span>
      </div>
      <p style="font-size:0.95rem; color:var(--text-main);">${c.text}</p>
    `;
    container.appendChild(card);
  });
}

function submitGuestbookComment(e) {
  e.preventDefault();
  const name = document.getElementById('comment-name').value.trim();
  const text = document.getElementById('comment-text').value.trim();

  if (!name || !text) return;

  const today = new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
  db.addGuestbook({ name, text, date: today });
  renderGuestbookFeed();

  document.getElementById('comment-name').value = '';
  document.getElementById('comment-text').value = '';
  showToast("Mesajınız Ziyaretçi Defterine eklendi!");
}

// --- ADMIN CMS FORM SUBMISSIONS ---
function handleAdminAddPoem(e) {
  e.preventDefault();
  const title = document.getElementById('admin-poem-title').value.trim();
  const category = document.getElementById('admin-poem-category').value;
  const book = document.getElementById('admin-poem-book').value.trim();
  const fullPoem = document.getElementById('admin-poem-content').value.trim();
  const excerpt = fullPoem.split('\n').slice(0, 4).join('\n');

  if (!title || !fullPoem) return;

  db.addPoem({
    title,
    category,
    categoryName: category.toUpperCase(),
    excerpt,
    fullPoem,
    book: book || "Yeni Eserler",
    year: new Date().getFullYear().toString()
  });

  renderPoetryGrid();
  closeModal('admin-modal');
  showToast(TRANSLATIONS[currentLang]?.msgSaved || "Şiir veritabanına eklendi!");
}

function handleAdminAddBook(e) {
  e.preventDefault();
  const title = document.getElementById('admin-book-title').value.trim();
  const type = document.getElementById('admin-book-type').value.trim();
  const year = document.getElementById('admin-book-year').value.trim();
  const desc = document.getElementById('admin-book-desc').value.trim();
  const fileUrl = document.getElementById('admin-book-url').value.trim();

  db.addBook({
    title,
    type: type || "Kitap",
    year: year || "2026",
    pages: "200 Sayfa",
    desc,
    fileUrl: fileUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600"
  });

  renderBooksGrid();
  closeModal('admin-modal');
  showToast(TRANSLATIONS[currentLang]?.msgSaved || "Kitap/Belge eklendi!");
}

function handleAdminAddAudio(e) {
  e.preventDefault();
  const title = document.getElementById('admin-audio-title').value.trim();
  const album = document.getElementById('admin-audio-album').value.trim();
  const duration = document.getElementById('admin-audio-duration').value.trim();

  db.addAudio({
    title,
    album: album || "Sabit İnce Eserleri",
    duration: duration || "03:30",
    type: "Söz & Beste: Sabit İnce",
    freq: 220
  });

  renderAudioPlaylist();
  closeModal('admin-modal');
  showToast("Müzik/Beste veritabanına eklendi!");
}

function handleAdminAddMedia(e) {
  e.preventDefault();
  const title = document.getElementById('admin-media-title').value.trim();
  const type = document.getElementById('admin-media-type').value;
  const url = document.getElementById('admin-media-url').value.trim();

  db.addMedia({
    title,
    type,
    url: url || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    caption: title
  });

  renderMediaGallery();
  closeModal('admin-modal');
  showToast("Medya başarıyla eklendi!");
}

// --- DATABASE BACKUP & RESTORE ---
function exportDatabaseBackup() {
  db.exportJSON();
  showToast("Veritabanı yedeği indirildi (JSON).");
}

function importDatabaseBackup(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const success = db.importJSON(e.target.result);
    if (success) {
      renderAllSections();
      showToast("Veritabanı başarıyla içe aktarıldı!");
    } else {
      showToast("Hata: Geçersiz yedek dosyası.");
    }
  };
  reader.readAsText(file);
}

function resetDatabaseToDefault() {
  if (confirm("Tüm veritabanı sıfırlanıp varsayılan içeriklere dönülecek. Emin misiniz?")) {
    db.resetToDefault();
    renderAllSections();
    showToast("Veritabanı varsayılan ayarlara döndürüldü.");
  }
}

// --- UTILITY MODALS & TOASTS ---
function openAdminModal() {
  document.getElementById('admin-modal').classList.add('active');
}

function switchAdminTab(tabName, btnElement) {
  document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.admin-tab-content').forEach(c => c.style.display = 'none');
  
  if (btnElement) btnElement.classList.add('active');
  document.getElementById(`tab-${tabName}`).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

function showToast(msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle text-gold"></i> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
