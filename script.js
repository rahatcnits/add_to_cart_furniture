const cartContainer = document.querySelector(".cart-container");
const productList = document.querySelector(".product-list");
const cartList = document.querySelector(".cart-list");
const cartTotalValue = document.querySelector("#cart-total-value");
const cartCountInfo = document.querySelector("#cart-count-info");

let cartItemID = 1;

eventListener();

function eventListener() {
  window.addEventListener("DOMContentLoaded", () => {
    loadJSON();
  });

  document.querySelector(".navbar-toggler").addEventListener("click", () => {
    document.querySelector(".navbar-collapse").classList.toggle("show-navbar");
  });

  document.querySelector("#cart-btn").addEventListener("click", () => {
    cartContainer.classList.toggle("show-cart-container");
  });

  productList.addEventListener("click", purchaseProduct);
}

// load product items content form JSON file
function loadJSON() {
  fetch("furniture.json")
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.forEach((product) => {
        html += `
        <div class="product-item">
            <div class="product-img">
                <img src="${product.imgSrc}">
                <button type="button" class="add-to-cart-btn">
                    <i class="fas fa-shopping-cart"></i>Add To Cart
                </button>
            </div>

            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <span class="product-category">${product.category}</span>
                <p class="product-price">${product.price}</p>
            </div>
        </div>
        `;

        productList.innerHTML = html;
      });
    })
    .catch((err) => {
      alert("User live server or local server");
    });
}

// purchase product
function purchaseProduct(e) {
  if (e.target.classList.contains("add-to-cart-btn")) {
    let product = e.target.parentElement.parentElement;
    getProductInfo(product);
  }
}

// get product info after add to cart button click
function getProductInfo(product) {
  let productInfo = {
    id: cartItemID,
    imgSrc: product.querySelector(".product-img img").src,
    name: product.querySelector(".product-name").textContent,
    category: product.querySelector(".product-category").textContent,
    name: product.querySelector(".product-price").textContent,
  };
  cartItemID++;

  addToCartList(productInfo);
}

// add the selected product to the cart list
function addToCartList(product) {
  const carItem = document.createElement("div");
  carItem.classList.add("cart-item");
  carItem.setAttribute("data-id", `${product.id}`);
  carItem.innerHTML = `
    <img src = "${product.imgSrc}" alt = "product image">
    <div class = "cart-item-info">
      <h3 class = "cart-item-name">${product.name}</h3>
      <span class = "cart-item-category">${product.category}</span>
      <span class = "cart-item-price">${product.price}</span>
    </div>

    <button type = "button" class = "cart-item-del-btn">
      <i class = "fas fa-times"></i>
    </button>
  `;
  cartList.appendChild(carItem);
}
