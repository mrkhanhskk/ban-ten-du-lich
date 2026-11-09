const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));

// Xử lý ảnh lỗi: mỗi ảnh có thể có data-fallback riêng (đúng nội dung).
// Nếu không tải được thì ẩn ảnh/ô thư viện đó, KHÔNG thay bằng ảnh khác sai chú thích.
document.querySelectorAll('img:not(#qrImage)').forEach(img=>{
  img.addEventListener('error',()=>{
    const fb=img.dataset.fallback;
    if(fb&&!img.dataset.triedFallback){img.dataset.triedFallback='1';img.src=fb;return;}
    img.classList.add('image-unavailable');
    const item=img.closest('.gallery-item'); if(item) item.hidden=true;
  });
});

// Lightbox: ảnh lớn + chú thích nguồn, đóng bằng Esc / bấm nền / nút ×, trả focus về ô đã mở.
const lightbox=document.querySelector('#lightbox');
const lightboxImg=lightbox.querySelector('img');
const lightboxCap=lightbox.querySelector('figcaption');
const closeBtn=lightbox.querySelector('.lightbox-close');
let lastFocus=null;
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{
  const img=item.querySelector('img'); if(img.classList.contains('image-unavailable')) return;
  lastFocus=item;
  lightboxImg.src=img.currentSrc||img.src; lightboxImg.alt=img.alt;
  lightboxCap.textContent=item.dataset.caption||img.alt;
  lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); closeBtn.focus();
}));
function closeLightbox(){
  if(!lightbox.classList.contains('open')) return;
  lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); lightboxImg.removeAttribute('src');
  if(lastFocus) lastFocus.focus();
}
lightbox.addEventListener('click',e=>{if(e.target===lightbox||e.target===closeBtn)closeLightbox();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});

// QR PNG nằm trong website (assets/ma-qr-ban-ten.png). Nếu thiếu file, báo rõ thay vì hiện ảnh vỡ.
const qrPath='assets/ma-qr-ban-ten.png';
const qrImage=document.querySelector('#qrImage');
const qrStatus=document.querySelector('#qrStatus');
const qrBtn=document.querySelector('#downloadQr');
let qrOk=true;
qrImage.addEventListener('error',()=>{
  qrOk=false; qrImage.classList.add('image-unavailable'); qrBtn.disabled=true;
  qrStatus.textContent='Chưa tìm thấy file assets/ma-qr-ban-ten.png. Hãy thêm ảnh QR vào thư mục assets rồi tải lại trang.';
});
qrImage.src=qrPath;
qrBtn.addEventListener('click',()=>{
  if(!qrOk) return;
  const a=document.createElement('a'); a.href=qrPath; a.download='ma-qr-ban-ten.png';
  document.body.appendChild(a); a.click(); a.remove();
  qrStatus.textContent='Đã tải mã QR PNG. Hãy quét thử bằng điện thoại trước khi in.';
});
