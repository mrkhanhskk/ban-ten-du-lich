const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{const opened=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(opened));});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));
document.getElementById("year").textContent=new Date().getFullYear();
const input=document.getElementById("siteUrl"), status=document.getElementById("qrStatus"), area=document.getElementById("qrcode");
function createQr(){const target=input.value.trim();area.innerHTML="";if(!/^https?:\/\/.+/i.test(target)){status.textContent="Đường dẫn chưa hợp lệ. Hãy nhập URL bắt đầu bằng https://";return false;}if(typeof QRCode!=="undefined"){new QRCode(area,{text:target,width:190,height:190,colorDark:"#203f2e",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H});status.textContent="Đã tạo mã QR. Hãy quét thử trên điện thoại trước khi in.";return true;}const img=document.createElement("img");img.alt="Mã QR truy cập website Bản Tèn";img.width=190;img.height=190;img.src="https://api.qrserver.com/v1/create-qr-code/?size=190x190&data="+encodeURIComponent(target);area.appendChild(img);status.textContent="Mã QR được tạo từ đường dẫn website.";return true;}
document.getElementById("makeQr").addEventListener("click",createQr);
document.getElementById("downloadQr").addEventListener("click",()=>{const canvas=area.querySelector("canvas"),img=area.querySelector("img");let url=null;if(canvas)url=canvas.toDataURL("image/png");else if(img&&img.src.startsWith("data:"))url=img.src;if(!url){status.textContent="Nhấn chuột phải vào mã QR và chọn Lưu hình ảnh thành.";return;}const a=document.createElement("a");a.href=url;a.download="ma-qr-ban-ten.png";a.click();});
createQr();
