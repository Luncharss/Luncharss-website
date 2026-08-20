const orderList = document.getElementById("orderList");
const totalHarga = document.getElementById("totalHarga");
const metode = document.getElementById("metode");
const paymentInfo = document.getElementById("paymentInfo");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function rupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {

    orderList.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        orderList.innerHTML = `
            <div style="text-align:center;padding:30px;">
                <h3>🛒 Keranjang kosong</h3>
                <p>Silakan pilih produk terlebih dahulu.</p>
            </div>
        `;

        totalHarga.innerHTML = "Rp0";

        return;
    }

    cart.forEach((item, index) => {

        const subtotal = item.price * item.qty;

        total += subtotal;

        orderList.innerHTML += `
            <div class="item">

                <img src="${item.image}" class="checkout-img">

                <div class="item-info">

                    <h3>${item.name}</h3>

                    <p>${rupiah(item.price)}</p>

                    <p>Subtotal : <b>${rupiah(subtotal)}</b></p>

                </div>

                <div class="item-action">

                    <button onclick="kurang(${index})">➖</button>

                    <span style="font-weight:bold;margin:0 8px;">
                        ${item.qty}
                    </span>

                    <button onclick="tambah(${index})">➕</button>

                    <br><br>

                    <button class="hapus-btn"
                        onclick="hapusItem(${index})">
                        🗑️ Hapus
                    </button>

                </div>

            </div>
        `;

    });

    totalHarga.innerHTML = rupiah(total);

}

function tambah(index) {

    cart[index].qty++;

    saveCart();

    renderCart();

}

function kurang(index) {

    cart[index].qty--;

    if (cart[index].qty <= 0) {

        cart.splice(index, 1);

    }

    saveCart();

    renderCart();

}

function hapusItem(index) {

    if (confirm("Yakin ingin menghapus produk ini?")) {

        cart.splice(index, 1);

        saveCart();

        renderCart();

    }

}

function kosongkanKeranjang() {

    if (confirm("Kosongkan semua keranjang?")) {

        cart = [];

        localStorage.removeItem("cart");

        renderCart();

    }

}

renderCart();

metode.addEventListener("change", function () {

    if (this.value === "QRIS") {

        paymentInfo.innerHTML = `
            <h3>Scan QRIS</h3>

            <img src="contoh-qris.jpeg"
            style="width:220px;border-radius:12px;">
        `;

    }

    else if (this.value === "Transfer Bank") {

        paymentInfo.innerHTML = `
            <h3>Transfer Bank</h3>

            <p><b>BCA :</b> 1234567890 a.n Esther Ria</p>

            <p><b>Mandiri :</b> 0987654321 a.n Lunar</p>
        `;

    }

    else {

        paymentInfo.innerHTML = "";

    }

});

document.getElementById("checkoutForm")
.addEventListener("submit", function (e) {

    e.preventDefault();

    if (cart.length === 0) {

        alert("Keranjang masih kosong!");

        return;

    }

    const nama = document.getElementById("nama").value;
    const hp = document.getElementById("hp").value;
    const kelas = document.getElementById("kelas").value;
    const metodeBayar = metode.value;

    let total = 0;

    let pesan = `*PESANAN BARU - LUNAR'S SHOP*\n\n`;

    pesan += `👤 Nama : ${nama}\n`;
    pesan += `📱 HP : ${hp}\n`;
    pesan += `🏫 Kelas : ${kelas}\n`;
    pesan += `💳 Pembayaran : ${metodeBayar}\n\n`;

    pesan += `*Detail Pesanan*\n`;

    cart.forEach(item => {

        const subtotal = item.price * item.qty;

        total += subtotal;

        pesan += `• ${item.name}\n`;
        pesan += `  Qty : ${item.qty}\n`;
        pesan += `  Subtotal : ${rupiah(subtotal)}\n\n`;

    });

    pesan += `💰 TOTAL : ${rupiah(total)}`;

    const nomorWA = "6281318808658";

    window.open(
        `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`,
        "_blank"
    );

    localStorage.removeItem("cart");

    setTimeout(() => {

        window.location.href = "index.html";

    }, 1000);

});