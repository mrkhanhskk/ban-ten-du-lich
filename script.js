const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

// Ảnh Bản Tèn: nếu máy chủ ảnh đầu tiên không phản hồi, thử ảnh tư liệu thứ hai.
const photoFallbacks=[
  'https://nongthon.vietnamtourism.gov.vn/wp-content/uploads/2023/10/1010.ban-ten-1.jpg',
  'https://nongthon.vietnamtourism.gov.vn/wp-content/uploads/2023/10/1010.ban-ten-3-1024x576.jpg'
];
document.querySelectorAll('img:not(#qrImage)').forEach(img=>{
  img.dataset.fallbackIndex='0';
  img.addEventListener('error',()=>{
    const next=Number(img.dataset.fallbackIndex)+1;
    if(next<photoFallbacks.length){img.dataset.fallbackIndex=String(next);img.src=photoFallbacks[next];}
    else {img.classList.add('image-unavailable');img.alt='Ảnh tư liệu Bản Tèn hiện chưa tải được. Vui lòng kết nối Internet và tải lại trang.';}
  });
});

const lightbox=document.querySelector('#lightbox');
const lightboxImg=lightbox.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{
  const img=item.querySelector('img'); if(img.classList.contains('image-unavailable')) return;
  lightboxImg.src=img.src; lightboxImg.alt=img.alt; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false');
}));
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImg.src='';}
lightbox.addEventListener('click',e=>{if(e.target===lightbox||e.target.classList.contains('lightbox-close'))closeLightbox();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});

// QR PNG nằm ngay trong website, không phụ thuộc dịch vụ tạo QR bên ngoài.
const qrPath='assets/ma-qr-ban-ten.png';
const qrImage=document.querySelector('#qrImage');
qrImage.src=qrPath;
document.querySelector('#downloadQr').addEventListener('click',()=>{
  const a=document.createElement('a'); a.href=qrPath; a.download='ma-qr-ban-ten.png';
  document.body.appendChild(a); a.click(); a.remove();
  document.querySelector('#qrStatus').textContent='Đã tải mã QR PNG. Hãy quét thử bằng điện thoại trước khi in.';
});
