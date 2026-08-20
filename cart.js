function getCart() {

    try {

        const data =
            localStorage.getItem("cart");


        if (!data) {

            return [];

        }


        const cart =
            JSON.parse(data);


        if (!Array.isArray(cart)) {

            return [];

        }


        return cart;

    } catch (error) {

        console.error(
            "Gagal membaca keranjang:",
            error
        );

        return [];

    }

}

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

function formatRupiah(angka) {

    angka =
        Number(angka) || 0;


    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }
    ).format(angka);

}

function tampilkanCart() {

    const cart =
        getCart();


    const cartItems =
        document.getElementById(
            "cartItems"
        );


    const totalHarga =
        document.getElementById(
            "totalHarga"
        );


    if (!cartItems) {

        return;

    }


    let total =
        0;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div
                style="
                    text-align:center;
                    padding:40px 10px;
                ">

                <div
                    style="
                        font-size:60px;
                        margin-bottom:15px;
                    ">

                    🛒

                </div>


                <h3>
                    Keranjang masih kosong
                </h3>


                <p
                    style="
                        color:#777;
                        margin:10px 0 20px;
                    ">

                    Yuk pilih cookies
                    favorit kamu!

                </p>


                <a
                    href="index.html"
                    class="btn checkout">

                    🍪 Mulai Belanja

                </a>

            </div>

        `;


        totalHarga.textContent =
            "Rp0";


        return;

    }


    cartItems.innerHTML =
        "";

    cart.forEach(
        function(item, index) {

            const nama =
                item.name || "Produk";

            const harga =
                Number(item.price) || 0;

            let qty =
                Number(item.qty);


            if (!Number.isFinite(qty) ||
                qty < 1) {

                qty = 1;

            }

            const subtotal =
                harga * qty;


            total +=
                subtotal;

            const itemDiv =
                document.createElement(
                    "div"
                );


            itemDiv.style.cssText = `

                display:flex;
                align-items:center;
                gap:15px;
                padding:15px 0;
                border-bottom:1px solid #eee;
                flex-wrap:wrap;

            `;

            const img =
                document.createElement(
                    "img"
                );


            img.src =
                item.image || "";


            img.alt =
                nama;


            img.style.cssText = `

                width:90px;
                height:90px;
                object-fit:cover;
                border-radius:15px;

            `;

            const info =
                document.createElement(
                    "div"
                );


            info.style.cssText = `

                flex:1;
                min-width:180px;

            `;


            info.innerHTML = `

                <h3
                    style="
                        margin-bottom:5px;
                    ">

                    ${nama}

                </h3>


                <p
                    style="
                        color:#ff6b35;
                        font-weight:600;
                    ">

                    ${formatRupiah(harga)}

                </p>

            `;


            const quantity =
                document.createElement(
                    "div"
                );


            quantity.style.cssText = `

                display:flex;
                align-items:center;
                gap:8px;

            `;


            const minus =
                document.createElement(
                    "button"
                );


            minus.type =
                "button";


            minus.textContent =
                "−";


            minus.style.cssText = `

                width:32px;
                height:32px;
                padding:0;
                border:none;
                border-radius:50%;
                background:#ff6b35;
                color:white;
                font-size:18px;
                cursor:pointer;

            `;


            minus.onclick =
                function() {

                    ubahJumlah(
                        index,
                        -1
                    );

                };


            const qtyText =
                document.createElement(
                    "span"
                );


            qtyText.textContent =
                qty;


            qtyText.style.cssText = `

                min-width:25px;
                text-align:center;
                font-weight:600;

            `;


            const plus =
                document.createElement(
                    "button"
                );


            plus.type =
                "button";


            plus.textContent =
                "+";


            plus.style.cssText = `

                width:32px;
                height:32px;
                padding:0;
                border:none;
                border-radius:50%;
                background:#ff6b35;
                color:white;
                font-size:18px;
                cursor:pointer;

            `;


            plus.onclick =
                function() {

                    ubahJumlah(
                        index,
                        1
                    );

                };


            quantity.appendChild(
                minus
            );


            quantity.appendChild(
                qtyText
            );


            quantity.appendChild(
                plus
            );


            const right =
                document.createElement(
                    "div"
                );


            right.style.cssText = `

                text-align:right;
                min-width:120px;

            `;


            right.innerHTML = `

                <p
                    style="
                        font-weight:700;
                        margin-bottom:8px;
                    ">

                    ${formatRupiah(subtotal)}

                </p>

            `;

            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.type =
                "button";


            deleteButton.textContent =
                "🗑 Hapus";


            deleteButton.style.cssText = `

                border:none;
                background:#e53935;
                color:white;
                padding:7px 12px;
                border-radius:15px;
                cursor:pointer;

            `;


            deleteButton.onclick =
                function() {

                    hapusProduk(
                        index
                    );

                };


            right.appendChild(
                deleteButton
            );

            itemDiv.appendChild(
                img
            );


            itemDiv.appendChild(
                info
            );


            itemDiv.appendChild(
                quantity
            );


            itemDiv.appendChild(
                right
            );


            cartItems.appendChild(
                itemDiv
            );

        }
    );


    totalHarga.textContent =
        formatRupiah(total);

}

function ubahJumlah(
    index,
    perubahan
) {

    const cart =
        getCart();


    if (!cart[index]) {

        return;

    }


    let qty =
        Number(cart[index].qty);


    if (!Number.isFinite(qty)) {

        qty = 1;

    }


    qty +=
        Number(perubahan) || 0;

    if (qty <= 0) {

        cart.splice(
            index,
            1
        );

    } else {

        cart[index].qty =
            qty;

    }


    saveCart(cart);


    tampilkanCart();

}

function hapusProduk(index) {

    const cart =
        getCart();


    if (!cart[index]) {

        return;

    }


    cart.splice(
        index,
        1
    );


    saveCart(cart);


    tampilkanCart();

}

function hapusSemua() {

    const cart =
        getCart();


    if (cart.length === 0) {

        return;

    }


    const yakin =
        confirm(
            "Yakin ingin mengosongkan keranjang?"
        );


    if (!yakin) {

        return;

    }


    localStorage.removeItem(
        "cart"
    );


    tampilkanCart();

}

function checkout() {

    const cart =
        getCart();


    if (cart.length === 0) {

        alert(
            "Keranjang masih kosong!"
        );

        return;

    }


    window.location.href =
        "checkout.html";

}

document.addEventListener(
    "DOMContentLoaded",
    function() {

        tampilkanCart();

    }
);