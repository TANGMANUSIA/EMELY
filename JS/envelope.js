const colors = ['#ffb3cc','#ff8fab','#ffd6e7','#ff69a8','#ffc0cb'];
for(let i=0;i<20;i++){
  const p = document.createElement('div');
  p.className = 'petal';
  p.style.cssText = `
    left:${Math.random()*100}vw;
    top:${Math.random()*-20}vh;
    background:${colors[Math.floor(Math.random()*colors.length)]};
    width:${6+Math.random()*8}px;
    height:${8+Math.random()*10}px;
    animation-duration:${5+Math.random()*8}s;
    animation-delay:${Math.random()*6}s;
  `;
  document.body.appendChild(p);
}

let opened = false;

function buatKonfeti() {
  const emojis = ['🎀', '✨', '💖', '🌸', '🎉', '💗', '🎂'];
  for (let i = 0; i < 35; i++) {
    const conf = document.createElement('div');
    conf.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    conf.style.position = 'fixed';
    conf.style.left = Math.random() * 100 + '%';
    conf.style.top = '50%';
    conf.style.fontSize = (16 + Math.random() * 24) + 'px';
    conf.style.pointerEvents = 'none';
    conf.style.zIndex = '9999';
    conf.style.opacity = '1';
    conf.style.transition = 'all 1.5s ease-out';
    conf.style.filter = 'drop-shadow(0 0 3px pink)';
    document.body.appendChild(conf);
    
    setTimeout(() => {
      conf.style.transform = `translate(${(Math.random() - 0.5) * 220}px, ${-180 - Math.random() * 220}px) rotate(${Math.random() * 360}deg)`;
      conf.style.opacity = '0';
    }, 10);
    
    setTimeout(() => conf.remove(), 1600);
  }
}

function openEnvelope() {
  if(opened) return;
  opened = true;
  buatKonfeti();
  
  const flap = document.getElementById('flap');
  const letter = document.getElementById('letter');
  const envelope = document.getElementById('envelope');
  const enterBtn = document.getElementById('enterBtn');

  flap.classList.add('open');
  envelope.classList.add('opened');
  
  setTimeout(() => {
    letter.classList.add('show');
  }, 500);
  
  setTimeout(() => {
    enterBtn.style.display = 'block';
    enterBtn.style.animation = 'fadeUp 0.6s ease both';
  }, 1300);
}

function goToInvitation() {
  const overlay = document.getElementById('overlay');
  overlay.classList.add('active');
  setTimeout(() => {
    window.location.href = 'invitation.html';
  }, 700);
}

document.getElementById('envelope').onclick = openEnvelope;
document.getElementById('enterBtn').onclick = goToInvitation;