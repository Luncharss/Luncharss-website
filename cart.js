function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

// Ambil data keranjang
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const totalHarga = document.getElementById("totalHarga");

let total = 0;

function tampilkanKeranjang() {

    cartItems.innerHTML = "";
    total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <h3 style="text-align:center;">
                🛒 Keranjang masih kosong
            </h3>
        `;

        totalHarga.innerHTML = "Rp0";
        return;
    }

    cart.forEach((item, index) => {

        total += item.harga;

        cartItems.innerHTML += `

        <div class="item">

            <img src="${item.gambar}" class="cart-img">

            <div style="flex:1;">

                <h3>${item.nama}</h3>

                <p>${formatRupiah(item.harga)}</p>

            </div>

            <button onclick="hapusItem(${index})">
                Hapus
            </button>

        </div>

        `;

    });

    totalHarga.innerHTML = formatRupiah(total);

}

function hapusItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    tampilkanKeranjang();

}

function hapusSemua(){

    if(confirm("Yakin ingin mengosongkan keranjang?")){

        localStorage.removeItem("cart");

        cart=[];

        tampilkanKeranjang();

    }

}

function checkout(){

    if(cart.length===0){

        alert("Keranjang masih kosong!");

        return;

    }

    window.location.href="checkout.html";

}

// ===============================
// LOAD HALAMAN
// ===============================

tampilkanKeranjang();