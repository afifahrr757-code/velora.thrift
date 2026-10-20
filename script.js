const productsSeed = [
 {id:1,name:"The Copenhagen Blazer",category:"Outerwear",price:245000,oldPrice:320000,condition:"Excellent",origin:"Denmark",size:"M",desc:"Blazer vintage dengan potongan relaxed.",image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=85",label:"RARE FIND"},
 {id:2,name:"Sunday Knit Sweater",category:"Knitwear",price:175000,oldPrice:220000,condition:"Very good",origin:"Korea",size:"All size",desc:"Knitwear lembut untuk daily layering.",image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85",label:"BESTSELLER"},
 {id:3,name:"90s Denim Jacket",category:"Outerwear",price:285000,oldPrice:350000,condition:"Excellent",origin:"USA",size:"L",desc:"Denim klasik dengan karakter vintage.",image:"https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=700&q=85",label:"VINTAGE"},
 {id:4,name:"Everyday Cotton Shirt",category:"Tops",price:125000,oldPrice:165000,condition:"Very good",origin:"Japan",size:"M",desc:"Kemeja cotton breathable warna netral.",image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=85",label:"EASY STAPLE"},
 {id:5,name:"Earth Tone Cardigan",category:"Knitwear",price:195000,oldPrice:250000,condition:"Excellent",origin:"Italy",size:"M-L",desc:"Cardigan hangat bernuansa earth tone.",image:"https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=700&q=85",label:"CURATED"},
 {id:6,name:"Classic Mini Shoulder Bag",category:"Accessories",price:155000,oldPrice:190000,condition:"Very good",origin:"France",size:"One size",desc:"Tas vintage compact untuk aktivitas harian.",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",label:"ONE OF A KIND"},
 {id:7,name:"Soft Tailored Trousers",category:"Tops",price:185000,oldPrice:240000,condition:"Excellent",origin:"UK",size:"M",desc:"Celana tailored dengan siluet timeless.",image:"https://images.unsplash.com/photo-1506629905607-d9a9f3c2a5d2?auto=format&fit=crop&w=700&q=85",label:"TIMELESS"},
 {id:8,name:"Retro Weekend Cap",category:"Accessories",price:95000,oldPrice:125000,condition:"Good",origin:"Australia",size:"Adjustable",desc:"Aksen retro untuk gaya kasual.",image:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=85",label:"UNDER 100K"}
];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
let products = [...productsSeed];
let cart = {};
let category = "All";
let role = "buyer";
let currentUser = JSON.parse(sessionStorage.getItem("veloraUser") || "null");
let toastTimer;
function toast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2600)}
function safeText(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderProducts(){
 let list=products.filter(p=>(category==="All"||p.category===category));
 const q=$("#searchInput").value.trim().toLowerCase();
 if(q) list=list.filter(p=>(p.name+" "+p.category+" "+p.origin+" "+p.desc).toLowerCase().includes(q));
 const sort=$("#sortSelect").value;
 if(sort==="low")list.sort((a,b)=>a.price-b.price); if(sort==="high")list.sort((a,b)=>b.price-a.price);
 $("#productGrid").innerHTML=list.length?list.map(p=>`<article class="product-card"><div class="product-photo"><img src="${safeText(p.image)}" alt="${safeText(p.name)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80'"><span class="product-label">${safeText(p.label||"SELLER PICK")}</span><button class="wish-btn" data-wish="${p.id}" aria-label="Simpan favorit">♡</button><button class="quick-add" data-add="${p.id}">+ Tambah ke keranjang</button></div><div class="product-info"><div class="product-meta"><span>${safeText(p.category.toUpperCase())} · ${safeText(p.origin||"GLOBAL")}</span><span>♡ ${p.condition==="Excellent"?"4.9":"4.8"}</span></div><h3>${safeText(p.name)}</h3><p class="product-desc">${safeText(p.desc||"Preloved piece, ready for a new story.")}</p><div class="product-price">${money(p.price)} <del>${p.oldPrice?money(p.oldPrice):""}</del></div></div></article>`).join(""):`<div class="no-results">Belum ada produk yang cocok. Coba kata kunci atau kategori lain ✦</div>`;
}
function updateUserUI(){$("#accountLabel").textContent=currentUser?currentUser.name.split(" ")[0]:"Masuk";if(currentUser?.role==="seller")$("#sellerOpen").innerHTML="♧ <span>Studio</span>";else $("#sellerOpen").innerHTML="♧ <span>Seller</span>"}
function openModal(id){closePanels();$("#overlay").classList.add("show");$("#"+id).classList.add("open")}
function closePanels(){$$(".modal.open").forEach(m=>m.classList.remove("open"));$("#cartDrawer").classList.remove("open");$("#overlay").classList.remove("show")}
function openCart(){$("#overlay").classList.add("show");$("#cartDrawer").classList.add("open");renderCart()}
function cartCount(){return Object.values(cart).reduce((a,b)=>a+b,0)}
function updateCartBadge(){$("#cartCount").textContent=cartCount();$("#drawerCount").textContent=`(${cartCount()})`}
function renderCart(){
 const items=Object.entries(cart).map(([id,qty])=>({product:products.find(p=>p.id===Number(id)),qty})).filter(x=>x.product);
 $("#cartItems").innerHTML=items.length?items.map(({product:p,qty})=>`<div class="cart-item"><img src="${safeText(p.image)}" alt=""><div><h4>${safeText(p.name)}</h4><p>${safeText(p.size||"Vintage fit")} · ${safeText(p.condition||"Preloved")}</p><strong>${money(p.price)}</strong><div class="quantity"><button data-qty="${p.id}" data-delta="-1">−</button><span>${qty}</span><button data-qty="${p.id}" data-delta="1">+</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="Hapus">×</button></div>`).join(""):`<div class="empty-cart">Keranjangmu masih kosong.<br>Temukan piece yang cocok dengan gayamu ♡</div>`;
 const total=items.reduce((s,x)=>s+x.product.price*x.qty,0);$("#subtotal").textContent=money(total);updateCartBadge();$("#checkoutOpen").disabled=!items.length;$("#checkoutOpen").style.opacity=items.length?1:.5;
}
function addToCart(id){cart[id]=(cart[id]||0)+1;renderCart();toast("Ditambahkan ke keranjang ♡")}
function showCheckout(){if(!cartCount()){toast("Keranjang masih kosong.");return}if(currentUser){$("#shippingName").value=currentUser.name||"";$("#shippingPhone").focus()}const ship=Number($("#shippingMethod").value);const subtotal=Object.entries(cart).reduce((sum,[id,qty])=>sum+(products.find(p=>p.id===Number(id))?.price||0)*qty,0);$("#checkoutTotal").textContent=money(subtotal+ship);openModal("checkoutModal")}
$("#productGrid").addEventListener("click",e=>{const add=e.target.closest("[data-add]");if(add)addToCart(Number(add.dataset.add));const wish=e.target.closest("[data-wish]");if(wish){wish.classList.toggle("liked");wish.textContent=wish.classList.contains("liked")?"♥":"♡";toast(wish.classList.contains("liked")?"Disimpan ke wishlist (demo)":"Dihapus dari wishlist") }});
$("#cartItems").addEventListener("click",e=>{const q=e.target.closest("[data-qty]");const r=e.target.closest("[data-remove]");if(q){const id=q.dataset.qty;cart[id]=(cart[id]||0)+Number(q.dataset.delta);if(cart[id]<=0)delete cart[id];renderCart()}if(r){delete cart[r.dataset.remove];renderCart()}});
$("#categoryButtons").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;category=b.dataset.category;$$(".category").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
$("#searchForm").addEventListener("submit",e=>{e.preventDefault();renderProducts();$("#shop").scrollIntoView({behavior:"smooth"})});
$("#sortSelect").addEventListener("change",renderProducts);
$("#clearFilters").addEventListener("click",e=>{e.preventDefault();category="All";$("#searchInput").value="";$("#sortSelect").value="featured";$$(".category").forEach(x=>x.classList.toggle("active",x.dataset.category==="All"));renderProducts()});
$("#cartOpen").addEventListener("click",openCart);
$("#loginOpen").addEventListener("click",()=>{if(currentUser){if(confirm(`Keluar dari akun ${currentUser.name}?`)){currentUser=null;sessionStorage.removeItem("veloraUser");updateUserUI();toast("Kamu sudah keluar.")}}else{role="buyer";setRoleUI();openModal("loginModal")}});
function openSeller(){role="seller";setRoleUI();if(currentUser?.role==="seller"){$("#sellerWelcome").classList.remove("hidden");$("#sellerWelcome").textContent=`Halo, ${currentUser.name}! Listing yang kamu buat akan tampil di etalase demo.`}else{$("#sellerWelcome").classList.add("hidden")}openModal("sellerModal")}
$("#sellerOpen").addEventListener("click",openSeller);$("#sellerStory").addEventListener("click",openSeller);
function setRoleUI(){$$(".role-tab").forEach(t=>t.classList.toggle("active",t.dataset.role===role))}
$$(".role-tab").forEach(t=>t.addEventListener("click",()=>{role=t.dataset.role;setRoleUI()}));
$("#loginForm").addEventListener("submit",e=>{e.preventDefault();currentUser={name:$("#loginName").value.trim(),email:$("#loginEmail").value.trim(),role};sessionStorage.setItem("veloraUser",JSON.stringify(currentUser));updateUserUI();closePanels();toast(`Selamat datang, ${currentUser.name.split(" ")[0]}!`);e.target.reset()});
$("#sellerForm").addEventListener("submit",e=>{e.preventDefault();if(!currentUser||currentUser.role!=="seller"){toast("Pilih tab Seller di menu Masuk, lalu masuk sebagai seller.");role="seller";setRoleUI();$("#sellerModal").classList.remove("open");openModal("loginModal");return}const name=$("#newProductName").value.trim();const price=Number($("#newProductPrice").value);if(!name||price<1000){toast("Periksa nama dan harga produk.");return}const image=$("#newProductImage").value.trim()||"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85";products.unshift({id:Date.now(),name,category:$("#newProductCategory").value,price,oldPrice:0,condition:"Preloved",origin:"Seller community",size:"See description",desc:$("#newProductDesc").value.trim()||"Curated preloved piece from a Velora seller.",image,label:"NEW DROP"});renderProducts();closePanels();e.target.reset();toast("Listing berhasil ditambahkan ke etalase demo!");$("#shop").scrollIntoView({behavior:"smooth"})});
$("#checkoutOpen").addEventListener("click",showCheckout);
$("#shippingMethod").addEventListener("change",()=>{const sub=Object.entries(cart).reduce((s,[id,qty])=>s+(products.find(p=>p.id===Number(id))?.price||0)*qty,0);$("#checkoutTotal").textContent=money(sub+Number($("#shippingMethod").value))});
$("#checkoutForm").addEventListener("submit",e=>{e.preventDefault();if(!cartCount())return;const orderId="VL"+Math.random().toString(36).slice(2,8).toUpperCase();const orderTotal=Object.entries(cart).reduce((s,[id,qty])=>s+(products.find(p=>p.id===Number(id))?.price||0)*qty,0)+Number($("#shippingMethod").value);const name=$("#shippingName").value;cart={};renderCart();closePanels();e.target.reset();toast(`Pesanan demo ${orderId} dibuat untuk ${name}. Total ${money(orderTotal)} — belum ada pembayaran nyata.`)});
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();toast("Terima kasih! Ini demo, email belum dikirim ke server.");e.target.reset()});
$("#overlay").addEventListener("click",closePanels);$$("[data-close]").forEach(b=>b.addEventListener("click",closePanels));document.addEventListener("keydown",e=>{if(e.key==="Escape")closePanels()});
renderProducts();updateCartBadge();updateUserUI();
