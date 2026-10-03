/* ===== BERKAH LAUNDRY - script.js ===== */

// 1) Placeholder otomatis: jika file foto belum ada, tampil kotak "Tambahkan foto..."
//    Setelah Anda menaruh fotonya di folder images/, foto langsung tampil.
document.querySelectorAll('.service-image img').forEach(img => {
  const kosong = () => img.parentElement.classList.add('empty');
  img.addEventListener('error', kosong);
  if (img.complete && img.naturalWidth === 0) kosong();
});


// 2) Daftar harga dibuat otomatis dari kartu layanan (harga cukup diubah di index.html)
function buatHarga(dariGrid, target) {
  const kartu = document
    .querySelectorAll('.grid')[dariGrid]
    .querySelectorAll('.service-card');

  document.getElementById(target).innerHTML = [...kartu]
    .map(c => `
      <div class="row">
        <span>${c.querySelector('h3').textContent}</span>
        <b>${c.querySelector('.price').textContent}</b>
      </div>`)
    .join('');
}

buatHarga(0, 'p-kiloan');
buatHarga(1, 'p-satuan');


// 3) Timeline estimasi (sesuai data sumber)
const EST = [
  ['Cuci kering lipat', '2 hari'],
  ['Cuci + setrika', '2 hari'],
  ['Setrika saja', '2 hari'],
  ['Bed cover kecil', '2 hari'],
  ['Sepatu', '3 hari'],
  ['Karpet Biasa', '2 hari'],
  ['Seprei Set No.3', '2 hari'],
  ['Springbed No.3', '1 hari'],
  ['Bantal Sedang', '2 hari'],
  ['Boneka', '2 hari'],
  ['Gorden', '2 hari'],
  ['Selimut', '2 hari'],
  ['Tas', '2 hari'],
  ['Jas/Gaun', '2 hari']
];

document.getElementById('timeline').innerHTML = EST
  .map(e => `<div class="tl reveal"><span>${e[0]}</span><b>${e[1]}</b></div>`)
  .join('');


// 4) Kartu keunggulan
const P = {
  spark: '<path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>',
  shirt: '<path d="M8 3l-5 4 3 3 2-1v12h8V9l2 1 3-3-5-4a4 4 0 0 1-8 0z"/>',
  flower: '<circle cx="12" cy="12" r="3"/><path d="M12 9a3.5 3.5 0 1 1 3 0M15 12a3.5 3.5 0 1 1 0 3M12 15a3.5 3.5 0 1 1-3 0M9 12a3.5 3.5 0 1 1 0-3"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  van: '<path d="M2 6h12v11H2zM14 10h5l3 4v3h-8"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>'
};

// [judul, deskripsi, ikon, warna gradien]
const WHY = [
  ['Bersih', 'Hasil laundry yang bersih.', 'spark', '#2e8b3d,#8dc63f'],
  ['Rapi', 'Pakaian ditangani dengan rapi.', 'shirt', '#1fb8c9,#6aebe3'],
  ['Wangi', 'Hasil laundry yang wangi dan fresh.', 'flower', '#f02a1f,#ff8a5a'],
  ['Express', 'Tersedia layanan express.', 'bolt', '#ffb400,#ffc94d'],
  ['Antar Jemput', 'Tersedia layanan antar-jemput dengan ketentuan berlaku.', 'van', '#2e8b3d,#1fb8c9']
];

document.getElementById('why').innerHTML = WHY
  .map(w => `
    <div class="wy reveal">
      <i style="background:linear-gradient(135deg,${w[3]})">
        <svg viewBox="0 0 24 24">${P[w[2]]}</svg>
      </i>
      <h3>${w[0]}</h3>
      <p>${w[1]}</p>
    </div>`)
  .join('');


// 5) FAQ accordion
const FAQ = [
  [
    'Jam berapa Berkah Laundry buka?',
    'Kami buka setiap hari, mulai pukul 08.00 pagi sampai 22.00 malam WITA.'
  ],
  [
    'Apakah tersedia layanan antar jemput?',
    'Ya, tersedia layanan gratis jemput-antar dengan ketentuan minimal transaksi Rp50.000 dan laundry dengan layanan minimal 5 kg.'
  ],
  [
    'Apakah ada layanan express?',
    'Ya, tersedia layanan express 3 jam, 6 jam, dan 9 jam.'
  ],
  [
    'Apakah menerima laundry satuan?',
    'Ya, tersedia berbagai layanan laundry satuan seperti sepatu, boneka, karpet, selimut, tas, jas/gaun, dan lainnya.'
  ]
];

const fb = document.getElementById('faqbox');

fb.innerHTML = FAQ
  .map(f => `<div class="q"><button>${f[0]}</button><div>${f[1]}</div></div>`)
  .join('');

fb.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    e.target.parentElement.classList.toggle('open');
  }
});


// 6) Hamburger menu
const menu = document.getElementById('menu');

document.getElementById('burger').onclick = () => menu.classList.toggle('open');
menu.addEventListener('click', () => menu.classList.remove('open'));


// 7) Animasi muncul saat scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(x => {
    if (x.isIntersecting) {
      x.target.classList.add('in');
      io.unobserve(x.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));


// 8) Navbar sticky + menu aktif + tombol back to top
const top_ = document.getElementById('top');
const nav = document.getElementById('nav');
const links = [...menu.querySelectorAll('a')];

addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 40);
  top_.classList.toggle('on', scrollY > 500);

  let cur = 'home';
  document.querySelectorAll('section[id]').forEach(s => {
    if (scrollY >= s.offsetTop - 120) cur = s.id;
  });

  links.forEach(a => {
    a.classList.toggle('act', a.getAttribute('href') === '#' + cur);
  });
});

top_.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });


// 9) Lightbox galeri
const lb = document.getElementById('lb');
const lbi = lb.querySelector('img');

document.querySelectorAll('.masonry img').forEach(im => {
  im.onclick = () => {
    lbi.src = im.src;
    lbi.alt = im.alt;
    lb.classList.add('on');
  };
});

lb.onclick = () => lb.classList.remove('on');