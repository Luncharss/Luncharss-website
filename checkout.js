const cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderList = document.getElementById("orderList");
const totalHarga = document.getElementById("totalHarga");
const metode = document.getElementById("metode");

let total = 0;

function rupiah(x){
    return "Rp" + x.toLocaleString("id-ID");
}

function renderCart(){

    orderList.innerHTML = "";
    total = 0;

    if(cart.length === 0){
        orderList.innerHTML = "<p>Keranjang kosong</p>";
        totalHarga.innerHTML = "Rp0";
        return;
    }

    cart.forEach(item=>{
        total += item.harga;

        orderList.innerHTML += `
            <div class="item">
                <img src="${item.gambar}" class="checkout-img">
                <div>
                    <b>${item.nama}</b><br>
                    ${rupiah(item.harga)}
                </div>
            </div>
        `;
    });

    totalHarga.innerHTML = rupiah(total);
}

renderCart();

const paymentInfo = document.getElementById("paymentInfo");

metode.addEventListener("change", function(){

    if(this.value === "QRIS"){

        paymentInfo.innerHTML = `
            <h3>Scan QRIS</h3>
            <img src="contoh-qris.jpeg" style="width:200px;border-radius:10px;">
        `;

    }

    else if(this.value === "Transfer Bank"){

        paymentInfo.innerHTML = `
            <h3>Transfer Bank</h3>
            <p><b>BCA:</b> 1234567890 a.n Esther Ria</p>
            <p><b>Mandiri:</b> 0987654321 a.n Lunar</p>
        `;

    }

    else{
        paymentInfo.innerHTML = "";
    }

});

document.getElementById("checkoutForm").addEventListener("submit", function(e){

    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const hp = document.getElementById("hp").value;
    const alamat = document.getElementById("alamat").value;
    const metodeBayar = metode.value;

    if(cart.length === 0){
        alert("Keranjang kosong!");
        return;
    }

    let pesan = `*PESANAN BARU - RODO SHOP*\n\n`;
    pesan += `Nama: ${nama}\n`;
    pesan += `HP: ${hp}\n`;
    pesan += `Alamat: ${alamat}\n`;
    pesan += `Pembayaran: ${metodeBayar}\n\n`;
    pesan += `DETAIL PESANAN:\n`;

    cart.forEach((item)=>{
        pesan += `- ${item.nama} (Rp${item.harga})\n`;
    });

    pesan += `\nTOTAL: ${rupiah(total)}`;

    const nomorWA = "6281318808658"; // 
    const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

    window.open(urlWA, "_blank");

    localStorage.removeItem("cart");

    setTimeout(()=>{
        window.location.href = "index.html";
    },1000);

});