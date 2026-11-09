const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{const opened=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(opened));});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("makeQr").addEventListener("click",()=>{
  const input=document.getElementById("siteUrl");
  const target=input.value.trim();
  const status=document.getElementById("qrStatus");
  const area=document.getElementById("qrcode");
  area.innerHTML="";
  if(!/^https?:\/\/.+/i.test(target)){status.textContent="Vui lòng nhập đường link website bắt đầu bằng https:// sau khi đã xuất bản.";return;}
  if(typeof QRCode==="undefined"){status.textContent="Không tải được thư viện tạo QR. Hãy kiểm tra kết nối Internet rồi tải lại trang.";return;}
  new QRCode(area,{text:target,width:180,height:180,colorDark:"#203f2e",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H});
  status.textContent="Đã tạo mã QR. Hãy quét thử bằng điện thoại trước khi in và sử dụng.";
});
