const targetDate = new Date(2026, 6, 13, 18, 0, 0);

function updateCountdown(){
  const now = new Date();
  const diff = targetDate - now;
  if(diff <= 0){
document.getElementById('countdown').innerHTML = '<p class="cd-expired">Celebrate the Sweetest Moments ✨</p>';
    return;
  }
  const d = Math.floor(diff/86400000);
  const h = Math.floor((diff%86400000)/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);
  document.getElementById('cd-d').textContent = String(d).padStart(2,'0');
  document.getElementById('cd-h').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-m').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-s').textContent = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

const petalColors = ['#ffb3cc','#ff8fab','#ffd6e7','#ff69a8','#ffc0cb','#f48fb1'];
for(let i=0;i<22;i++){
  const p = document.createElement('div');
  p.className = 'petal';
  const size = 6+Math.random()*9;
  p.style.cssText = `
    left:${Math.random()*100}vw;
    top:0;
    width:${size}px;
    height:${size*1.4}px;
    background:${petalColors[Math.floor(Math.random()*petalColors.length)]};
    animation-duration:${6+Math.random()*8}s;
    animation-delay:${Math.random()*10}s;
    opacity:0;
  `;
  document.body.appendChild(p);
}

// === KODE MP3 ===
let laguSedangDiputar = false;
const tombolMusik = document.getElementById('musicBtn');
const audioLagu = document.getElementById('happyBirthday');

function putarLagu() {
  if (!laguSedangDiputar) {
    audioLagu.play().then(() => {
      laguSedangDiputar = true;
      tombolMusik.textContent = '🎶';
      tombolMusik.classList.add('playing');
    }).catch(e => {
      console.log('Auto play gagal, tunggu klik:', e);
    });
  }
}

function hentikanLagu() {
  if (laguSedangDiputar) {
    audioLagu.pause();
    audioLagu.currentTime = 0;
    tombolMusik.textContent = '🎵';
    tombolMusik.classList.remove('playing');
    laguSedangDiputar = false;
  }
}

function toggleMusic() {
  if (laguSedangDiputar) {
    hentikanLagu();
  } else {
    putarLagu();
  }
}

audioLagu.onended = function() {
  if (laguSedangDiputar) {
    audioLagu.currentTime = 0;
    audioLagu.play();
  }
};

tombolMusik.onclick = toggleMusic;

// ===== SOLUSI AUTO PLAY SETELAH REFRESH =====
let sudahDiputar = false;

setTimeout(function() {
  if (!sudahDiputar) {
    audioLagu.play().then(() => {
      laguSedangDiputar = true;
      tombolMusik.textContent = '🎶';
      tombolMusik.classList.add('playing');
      sudahDiputar = true;
    }).catch(e => {
      console.log('Auto play diblokir, tunggu klik');
    });
  }
}, 500);

document.body.addEventListener('click', function sekali() {
  if (!sudahDiputar) {
    audioLagu.play().then(() => {
      laguSedangDiputar = true;
      tombolMusik.textContent = '🎶';
      tombolMusik.classList.add('playing');
      sudahDiputar = true;
    });
  }
}, { once: true });

// === SLIDESHOW CROSSFADE 2 FOTO OTOMATIS TIAP 5 DETIK ===
const fotoSlide = [
  { file: '../ASSETS/IMAGES/MANTAP.webp',  nama: 'Winda & Yunita' },
  { file: '../ASSETS/IMAGES/AKBAR.webp',   nama: 'Akbar' }
];
let slideIndex = 0;
const slide1 = document.getElementById('slide1');
const slide2 = document.getElementById('slide2');
const slideName = document.getElementById('slideName');
let lapisanAktif = 1;

// Set foto & nama pertama
slide1.style.backgroundImage = `url('${fotoSlide[0].file}')`;
slide1.style.opacity = '1';
slide2.style.opacity = '0';
slideName.textContent = fotoSlide[0].nama;

function gantiFoto() {
  slideIndex = (slideIndex + 1) % fotoSlide.length;
  const item = fotoSlide[slideIndex];
  const url = `url('${item.file}')`;
  slideName.textContent = item.nama;

  if (lapisanAktif === 1) {
    slide2.style.backgroundImage = url;
    slide2.style.opacity = '1';
    slide1.style.opacity = '0';
    lapisanAktif = 2;
  } else {
    slide1.style.backgroundImage = url;
    slide1.style.opacity = '1';
    slide2.style.opacity = '0';
    lapisanAktif = 1;
  }
}

setInterval(gantiFoto, 5000);
