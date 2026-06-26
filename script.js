function addToCart(nama, harga, gambar, tombol) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        nama: nama,
        harga: harga,
        gambar: gambar
    });

    localStorage.setItem("cart", JSON.stringify(cart));

}

function buyNow(nama, harga, gambar){

    let product = [{
        nama: nama,
        harga: harga,
        gambar: gambar
    }];

    localStorage.setItem("cart", JSON.stringify(product));

    window.location.href = "checkout.html";
}

    showToast("🛒 " + nama + " berhasil ditambahkan!");

    updateCartBadge();

    if (tombol) {

        tombol.innerHTML = "✅ Ditambahkan";
        tombol.disabled = true;

        setTimeout(() => {

            tombol.innerHTML = "🛒 Beli Sekarang";
            tombol.disabled = false;

        }, 1200);

    }


function showToast(text) {

    const toast = document.getElementById("toast");

    toast.innerHTML = text;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

function updateCartBadge() {

    const cartButton = document.getElementById("cartButton");

    if (!cartButton) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartButton.innerHTML =
        "🛒 Keranjang (" + cart.length + ")";

}

window.onload = function () {

    updateCartBadge();

};