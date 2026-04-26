function addToCart(nama, harga) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({ nama: nama, harga: harga });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(nama + " masuk ke keranjang!");
}
