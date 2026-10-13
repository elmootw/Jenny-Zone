// 作品照片：images/01-b.jpg（整理前）配 images/01-a.jpg（整理後），依此類推。
// 新增一組就在這裡加上編號。直式、橫式都可以，會依照片比例自動顯示。
const pairs = [];

document.getElementById('year').textContent = new Date().getFullYear();

const list = document.getElementById('worksList');

if (pairs.length === 0) {
  document.querySelector('.hint').hidden = true;
  list.innerHTML = '<p class="empty">照片整理中，敬請期待。</p>';
}

pairs.forEach(id => {
  const before = `images/${id}-b.jpg`;
  const after = `images/${id}-a.jpg`;

  const item = document.createElement('figure');
  item.className = 'work';
  item.innerHTML = `
    <div class="compare" style="--pos: 50%">
      <img class="compare-img" src="${after}" alt="整理後" loading="lazy">
      <img class="compare-img compare-before" src="${before}" alt="整理前" loading="lazy">
      <span class="tag tag-before">Before</span>
      <span class="tag tag-after">After</span>
      <span class="compare-handle" aria-hidden="true"></span>
      <input class="compare-range" type="range" min="0" max="100" value="50"
             aria-label="拖曳比較整理前後">
    </div>
  `;

  const compare = item.querySelector('.compare');
  item.querySelector('.compare-range').addEventListener('input', e => {
    compare.style.setProperty('--pos', e.target.value + '%');
  });

  // 依整理後照片的比例決定框的形狀，直式照片會窄一點
  const afterImg = compare.querySelector('.compare-img');
  const fitToPhoto = () => {
    const { naturalWidth: w, naturalHeight: h } = afterImg;
    if (!w) return;
    compare.style.aspectRatio = `${w} / ${h}`;
    item.classList.toggle('is-portrait', h > w);
  };
  if (afterImg.complete) fitToPhoto();
  else afterImg.addEventListener('load', fitToPhoto, { once: true });

  // 照片缺檔時顯示灰底佔位而不是破圖
  item.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => compare.classList.add('is-empty'), { once: true });
  });

  list.appendChild(item);
});
