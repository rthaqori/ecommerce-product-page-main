let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

const addButton = document.getElementById("add-to-cart");

addButton.addEventListener("click", () => {
    const itemName = document.getElementById("item-name").innerText;
    const quantity = parseInt(document.getElementById("quantity").innerText);
    const priceText = document.getElementById("price").innerText;
    const price = parseFloat(priceText.replace('$', ''));

    addCart(itemName, quantity, price);
});

function addCart(itemName, quantity, price) {
    let matchingItem = cart.find(item => item.itemName === itemName);

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({ itemName, quantity, price });
    }

    document.querySelector(".cart-quantity").innerText = cart[0].quantity;
    generateCartHTML();
    saveToStorage();
}

function generateCartHTML() {
    let cartHTML = "";
    cart.forEach(element => {
        const totalPrice = (cart[0].price * cart[0].quantity).toFixed(2);
        cartHTML += `
            <div class="item">
              <img src="images/image-product-1.jpg" alt="">
              <div class="cart-item-info">
                <span id="item-name">${cart[0].itemName}</span>
                <div class="price-info">
                  <span id="item-price">$${cart[0].price}</span>
                  <span>x</span>
                  <span id="item-quantity">${cart[0].quantity}</span>
                  <span id="total-price">$${totalPrice}</span>
                </div>
              </div>
              <button data-item-id="${cart[0].itemName}" id="delete">
                <img src="images/icon-delete.svg" alt="delete">
              </button>
            </div>
    `
    });
    document.querySelector(".cart-item-list").innerHTML = cartHTML || "cart is empty.";
}

document.querySelector(".cart")
    .addEventListener("click", () => {
        document.querySelector(".cart-items").classList.toggle("active");
        generateCartHTML();
    });


const imageList = document.querySelectorAll(".image-lists img");


imageList.forEach((img) => {
    img.addEventListener("mouseover", () => {
        imageList.forEach((image) => {
            image.classList.remove("active");
        });

        img.classList.add("active");

        const src = img.src;
        const productImage = document.querySelector(".image-container img");
        productImage.src = src.replace('-thumbnail', '');
    });
});

const add = document.querySelector(".add");
const minus = document.querySelector(".minus");

let quantity = 0;

add.addEventListener("click", () => {
    quantity = parseInt(quantity);
    quantity += 1;
    document.querySelector("#quantity").innerText = quantity;
});


minus.addEventListener("click", () => {
    quantity = parseInt(quantity);
    if (quantity > 0) {
        quantity -= 1;
    }
    document.querySelector("#quantity").innerText = quantity;
});

function deleteItem(event) {
    const buttonClicked = event.target.closest('button');
    const itemContainer = buttonClicked.closest('.item');
    const itemId = buttonClicked.getAttribute('data-item-id');
    if (itemContainer) {
        itemContainer.remove();
    }

    cart = cart.filter(item => item.itemName !== itemId);
    saveToStorage();
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        if (event.target.closest('#delete')) {
            deleteItem(event);
        }
    });

    saveToStorage();
});


const lightBox = document.createElement("div");
lightBox.id = "lightBox";
document.body.appendChild(lightBox);

const closeLightbox = document.createElement("button");
closeLightbox.id = "closeLightbox";


document.querySelector(".image-container img").addEventListener("click", () => {
    const imageBox = document.querySelector(".left-container").innerHTML;
    lightBox.classList.add("active");
    lightBox.innerHTML = imageBox;
    lightBox.prepend(closeLightbox);

    document.querySelector("#closeLightbox")
        .addEventListener("click", () => {
            lightBox.classList.remove("active");
        });
});

document.querySelector(".toggle-menu")
    .addEventListener("click", () => {
        document.querySelector(".nav-list").classList.add("active");

        document.querySelector(".close").addEventListener("click", () => {
            document.querySelector(".nav-list").classList.remove("active");
        });
    });