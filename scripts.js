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

window.addEventListener("pageshow", ()=>{
    document.querySelector(".cart-quantity").innerText = cart[0].quantity;
})

function generateCartHTML() {
    let cartHTML = "";
    cart.forEach(element => {
        const totalPrice = (element.price * element.quantity).toFixed(2);
        cartHTML += `
            <div class="item">
              <img src="images/image-product-1.jpg" alt="">
              <div class="cart-item-info">
                <span id="item-name">${element.itemName}</span>
                <div class="price-info">
                  <span id="item-price">$${element.price}</span>
                  <span>x</span>
                  <span id="item-quantity">${element.quantity}</span>
                  <span id="total-price">$${totalPrice}</span>
                </div>
              </div>
              <button data-item-id="${element.itemName}" id="delete">
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



    // export function cartProducts() {
    //     cart.forEach((cartItem) => {
    
    //         const productId = cartItem.productId;
    
    //         const matchingProduct = products.find(product => product.id === productId);
    
    //         const options = [...Array(10).keys()].map(i => {
    //             const value = i + 1;
    //             return `<option value="${value}" ${value === cartItem.quantity ? 'selected' : ''}>${value}</option>`;
    //         }).join('');
    
    //         const itemPrice = (matchingProduct.price.sale.dollor + (matchingProduct.price.sale.cents / 100)) * cartItem.quantity;
    //         totalPrice += itemPrice;
    
    //         cartItemsHTML += `
    //             <div class="cart-item cart-container-${matchingProduct.id}">
    //                 <div class="checkbox">
    //                     <input type="checkbox" name="" id="item-checkbox-${matchingProduct.id}">
    //                 </div>
    //                 <div class="cart-item-image">
    //                     <img src="assets/product_images/smartphones/${matchingProduct.image}" alt="${matchingProduct.image}">
    //                 </div>
    //                 <div class="cart-item-details">
    //                     <div class="cart-item-info">
    //                         <h2><a href="#">${matchingProduct.name}</a>
    //                         </h2>
    //                         <span class="stock">${matchingProduct.stock}</span>
    //                         <label for="gift-${matchingProduct.id}">
    //                             <input type="checkbox" id="gift-${matchingProduct.id}" class="gift">
    //                             <span> This is a gift</span>
    //                             <a href="#" id="lern-more">Lern More</a>
    //                         </label>
            
    //                         <span>
    //                             Color:
    //                             <span class="color">${matchingProduct.color}</span>
    //                         </span>
    //                         <span>
    //                             Style:
    //                             <span class="style">${matchingProduct.style}</span>
    //                         </span>
            
    //                         <div class="item-qty">
    //                             <span class="item-quentity">
    //                                 Qty:
    //                                 <select name="quantity" id="${matchingProduct.id}-quantity" class="quantity" onchange="updateCartItemQuantity(${matchingProduct.id}, this.value)">
    //                                     ${options}
    //                                 </select>
    //                             </span>
    //                             <a href="#" class="delete-item" data-product-id="${matchingProduct.id}">Delete</a>
    //                             <a href="#" class="save-item">Save for later</a>
    //                         </div>
    //                         <a href="#" class="compare">Compare with similar items</a>
    //                         <a href="#" class="share">Share</a>
    //                     </div>
            
    //                     <div class="cart-item-price">
    //                         <span class="item-price">$${itemPrice.toFixed(2)}</span>
    //                     </div>       
    //                 </div>
    //             </div>
    //             `;
    
    //         miniCartHTML += `
    //                     <div class="cart-item-mini cart-container-${matchingProduct.id}">
    //                         <div>
    //                             <img src="assets/product_images/smartphones/${matchingProduct.image}" alt="${matchingProduct.image}">
    //                         </div>
    //                         <div class="edit">
    //                             <select name="quantity" id="${matchingProduct.id}-quantity" class="quantity">
    //                                 ${options}
    //                             </select>
    //                             <button class="delete-item" data-product-id="${matchingProduct.id}"></button>
    //                         </div>
    //                     </div>
    //                 `;
    
    //     });
    // }