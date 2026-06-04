// Floating hearts
const hearts = ['💖', '🌸', '🎀', '💗', '🌹', '✨', '💕'];
for(let i=0;i<15;i++){
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = hearts[Math.floor(Math.random()*hearts.length)];
  heart.style.cssText = `
    left: ${Math.random()*100}vw;
    font-size: ${12+Math.random()*20}px;
    animation-duration: ${4+Math.random()*6}s;
    animation-delay: ${Math.random()*8}s;
  `;
  document.body.appendChild(heart);
}

// DAFTAR NAMA TAMU (EDIT DI SINI)
const semuaNamaTamu = [
  "imaa",
  "pitaa",
  "oda"
];

const emojiList = ['🌸', '🎀', '💖', '⭐', '🌹', '💗', '✨', '🍰', '🎂'];
const maxPerHalaman = 25;

let currentPage = 1;
let filteredNama = [...semuaNamaTamu];

function escapeHtml(str) {
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

function tampilkanDaftarTamu() {
  const start = (currentPage - 1) * maxPerHalaman;
  const end = start + maxPerHalaman;
  const namaDitampilkan = filteredNama.slice(start, end);
  const totalHalaman = Math.ceil(filteredNama.length / maxPerHalaman);
  
  document.getElementById('totalCount').textContent = `Total: ${filteredNama.length} tamu`;
  document.getElementById('pageInfo').textContent = `Halaman ${currentPage} / ${totalHalaman || 1}`;
  
  document.getElementById('prevBtn').disabled = currentPage === 1;
  document.getElementById('nextBtn').disabled = currentPage === totalHalaman || totalHalaman === 0;
  
  const guestListElement = document.getElementById('guestList');
  if (filteredNama.length === 0) {
    guestListElement.innerHTML = '<div class="empty-state">💔 Tidak ada nama yang ditemukan</div>';
    return;
  }
  
  if (namaDitampilkan.length === 0) {
    guestListElement.innerHTML = '<div class="empty-state">✨ Tidak ada data di halaman ini</div>';
    return;
  }
  
  let html = '';
  for (let i = 0; i < namaDitampilkan.length; i++) {
    const randomEmoji = emojiList[i % emojiList.length];
    html += `
      <li>
        <div class="guest-name">
          <span class="emoji">${randomEmoji}</span>
          <span>${escapeHtml(namaDitampilkan[i])}</span>
        </div>
        <div class="status">Diundang</div>
      </li>
    `;
  }
  guestListElement.innerHTML = html;
}

function cariNama() {
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  if (searchTerm === '') {
    filteredNama = [...semuaNamaTamu];
  } else {
    filteredNama = semuaNamaTamu.filter(nama => nama.toLowerCase().includes(searchTerm));
  }
  currentPage = 1;
  tampilkanDaftarTamu();
}

function resetCari() {
  document.getElementById('searchInput').value = '';
  filteredNama = [...semuaNamaTamu];
  currentPage = 1;
  tampilkanDaftarTamu();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    tampilkanDaftarTamu();
  }
}

function nextPage() {
  const totalHalaman = Math.ceil(filteredNama.length / maxPerHalaman);
  if (currentPage < totalHalaman) {
    currentPage++;
    tampilkanDaftarTamu();
  }
}

// Event listeners
document.getElementById('searchBtn').onclick = cariNama;
document.getElementById('resetBtn').onclick = resetCari;
document.getElementById('prevBtn').onclick = prevPage;
document.getElementById('nextBtn').onclick = nextPage;
document.getElementById('searchInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') cariNama();
});

tampilkanDaftarTamu();

// MUSIK
const tombolMusik = document.getElementById('musicBtn');
const audioLagu = document.getElementById('bgMusic');
let musikSedangDiputar = false;

function putarLagu() {
  if (!musikSedangDiputar) {
    audioLagu.play().then(() => {
      musikSedangDiputar = true;
      tombolMusik.textContent = '🎶';
      tombolMusik.classList.add('playing');
    }).catch(e => console.log('Auto play gagal:', e));
  }
}

function hentikanLagu() {
  if (musikSedangDiputar) {
    audioLagu.pause();
    audioLagu.currentTime = 0;
    musikSedangDiputar = false;
    tombolMusik.textContent = '🎵';
    tombolMusik.classList.remove('playing');
  }
}

function toggleMusic() {
  if (musikSedangDiputar) {
    hentikanLagu();
  } else {
    putarLagu();
  }
}

audioLagu.onended = function() {
  if (musikSedangDiputar) {
    audioLagu.currentTime = 0;
    audioLagu.play();
  }
};

tombolMusik.onclick = toggleMusic;

let sudahDiputar = false;
setTimeout(() => {
  if (!sudahDiputar) {
    audioLagu.play().then(() => {
      musikSedangDiputar = true;
      tombolMusik.textContent = '🎶';
      tombolMusik.classList.add('playing');
      sudahDiputar = true;
    }).catch(e => console.log('Auto play diblokir'));
  }
}, 500);

document.body.addEventListener('click', function() {
  if (!sudahDiputar) {
    audioLagu.play().then(() => {
      musikSedangDiputar = true;
      tombolMusik.textContent = '🎶';
      tombolMusik.classList.add('playing');
      sudahDiputar = true;
    });
  }
}, { once: true });