let bundleData = {
    name: "Original Bundle",
    price: 14000,
    image: "bundling-original.jpg"
};

let bundleQty = 1;

function changeQty(change) {

    bundleQty = Number(bundleQty) || 1;

    bundleQty += Number(change) || 0;

    if (bundleQty < 1) {
        bundleQty = 1;
    }

    const element =
        document.getElementById("bundleQty");

    if (element) {
        element.textContent = bundleQty;
    }
}

function changeBundle(type) {

    const image =
        document.getElementById("bundleImage");

    const title =
        document.getElementById("bundleTitle");

    const price =
        document.getElementById("bundlePrice");

    const tabs =
        document.querySelectorAll(".tab-btn");


    tabs.forEach(function(tab) {
        tab.classList.remove("active");
    });


    if (type === "original") {

        bundleData = {
            name: "Original Bundle",
            price: 14000,
            image: "bundling-original.jpg"
        };

        title.innerHTML =
            "🍪 Original Bundle";

        price.innerHTML =
            "Rp14.000";

        image.src =
            bundleData.image;

        if (tabs[0]) {
            tabs[0].classList.add("active");
        }
    }


    if (type === "coklat") {

        bundleData = {
            name: "Chocolate Bundle",
            price: 18000,
            image: "bundling-coklat.jpg"
        };

        title.innerHTML =
            "🍫 Chocolate Bundle";

        price.innerHTML =
            "Rp18.000";

        image.src =
            bundleData.image;

        if (tabs[1]) {
            tabs[1].classList.add("active");
        }
    }


    if (type === "combo") {

        bundleData = {
            name: "Combo Bundle (Original + Chocolate)",
            price: 15000,
            image: "bundling-combo.jpg"
        };

        title.innerHTML =
            "🍪 Combo Bundle";

        price.innerHTML =
            "Rp15.000";

        image.src =
            bundleData.image;

        if (tabs[2]) {
            tabs[2].classList.add("active");
        }
    }


    bundleQty = 1;

    const qty =
        document.getElementById("bundleQty");

    if (qty) {
        qty.textContent = "1";
    }
}


function showToast(text) {

    const toast =
        document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.innerHTML = text;

    toast.classList.add("show");

    setTimeout(function() {

        toast.classList.remove("show");

    }, 2000);
}


/* ==========================================
   UPDATE TOMBOL KERANJANG
========================================== */

function updateCartButton() {

    const button =
        document.getElementById("cartButton");


    if (!button) {
        return;
    }


    let cart = [];


    try {

        const data =
            localStorage.getItem("cart");


        if (data) {

            const parsed =
                JSON.parse(data);


            if (Array.isArray(parsed)) {

                cart = parsed;

            }

        }

    } catch (error) {

        console.log(
            "Data cart rusak. Cart dikosongkan."
        );

        cart = [];

    }


    let total = 0;


    cart.forEach(function(item) {

        const jumlah =
            parseInt(item.qty, 10);


        if (!isNaN(jumlah)) {

            total += jumlah;

        }

    });

    if (isNaN(total)) {

        total = 0;

    }

    button.textContent =
        "🛒 Keranjang (" + total + ")";

}

function addToCart(
    name,
    price,
    image,
    button = null,
    qty = 1
) {

    let cart = [];


    try {

        const data =
            localStorage.getItem("cart");


        if (data) {

            const parsed =
                JSON.parse(data);


            if (Array.isArray(parsed)) {

                cart = parsed;

            }

        }

    } catch (error) {

        cart = [];

    }


    qty =
        parseInt(qty, 10);


    if (isNaN(qty) || qty < 1) {

        qty = 1;

    }


    const existing =
        cart.find(function(item) {

            return item.name === name;

        });


    if (existing) {

        let oldQty =
            parseInt(existing.qty, 10);


        if (isNaN(oldQty)) {
            oldQty = 0;
        }


        existing.qty =
            oldQty + qty;

    } else {

        cart.push({

            name: name,

            price:
                Number(price) || 0,

            image: image,

            qty: qty

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartButton();


    showToast(
        "🛒 " +
        name +
        " berhasil ditambahkan!"
    );


    if (button) {

        button.disabled = true;

        button.innerHTML =
            "✅ Ditambahkan";


        setTimeout(function() {

            button.disabled = false;

            button.innerHTML =
                "🛒 Masukkan Ke Keranjang";

        }, 1200);

    }

}

function addBundleToCart(button) {

    addToCart(

        bundleData.name,

        bundleData.price,

        bundleData.image,

        button,

        bundleQty

    );

}

function buyNow(
    name,
    price,
    image,
    qty = 1
) {

    qty =
        parseInt(qty, 10);


    if (isNaN(qty) || qty < 1) {
        qty = 1;
    }


    const cart = [{

        name: name,

        price:
            Number(price) || 0,

        image: image,

        qty: qty

    }];


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    window.location.href =
        "checkout.html";

}

function buyBundleNow() {

    buyNow(

        bundleData.name,

        bundleData.price,

        bundleData.image,

        bundleQty

    );

}

window.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartButton();

    }
);