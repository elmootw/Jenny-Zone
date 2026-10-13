// 作品案例：照片放進 images/，在這裡加一行就會出現在頁面上。
// 前後兩張照片請用同一個角度、同樣比例拍。
const cases = [
  { title: '更衣室', before: 'images/closet-before.jpg', after: 'images/closet-after.jpg' },
  { title: '廚房',   before: 'images/kitchen-before.jpg', after: 'images/kitchen-after.jpg' },
];

document.getElementById('year').textContent = new Date().getFullYear();

const list = document.getElementById('worksList');

cases.forEach(c => {
  const item = document.createElement('figure');
  item.className = 'work';
  item.innerHTML = `
    <div class="compare" style="--pos: 50%">
      <img class="compare-img" src="${c.after}" alt="${c.title}整理後" loading="lazy">
      <img class="compare-img compare-before" src="${c.before}" alt="${c.title}整理前" loading="lazy">
      <span class="tag tag-before">Before</span>
      <span class="tag tag-after">After</span>
      <span class="compare-handle" aria-hidden="true"></span>
      <input class="compare-range" type="range" min="0" max="100" value="50"
             aria-label="${c.title}：拖曳比較整理前後">
    </div>
    <figcaption>${c.title}</figcaption>
  `;

  const compare = item.querySelector('.compare');
  item.querySelector('.compare-range').addEventListener('input', e => {
    compare.style.setProperty('--pos', e.target.value + '%');
  });

  // 照片還沒放進來時，顯示灰底佔位而不是破圖
  item.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => compare.classList.add('is-empty'), { once: true });
  });

  list.appendChild(item);
});
