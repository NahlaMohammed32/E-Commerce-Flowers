window.onload=function(){
  if(localStorage.getItem("login")!="active"){
    window.location.href="login.html"
  }
  }
  
  // ====================sign out===========================
  
  function signOut(){
    localStorage.removeItem("name")
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    localStorage.removeItem("selectedProductId")
    localStorage.setItem("login","inactive")
    sessionStorage.clear();
    window.location.href='login.html'
  }
  
  // ==============================================================

const cartIcon = document.querySelectorAll("#cart-icon");
const shopCart = document.querySelector(".shop-cart");
const cartClose = document.querySelector("#cart-close");
let totalCart=document.querySelector(".total-price")
// let amount=document.getElementById('amount')
/*shpw shop cart*/
cartIcon.forEach((icon) => {
  icon.addEventListener("click", () => shopCart.classList.add("shactive"));
});
cartClose.addEventListener("click", () =>
  shopCart.classList.remove("shactive")
);

let Shopproducts;
const shopCartContent = document.querySelector(".cart-content");
async function fetchData() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
async function allData() {
    const allProducts = await fetchData();
    if (allProducts) {
        Shopproducts=allProducts
        normalShop()
    }
}

allData();

function normalShop() {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    shopCartContent.innerHTML = `<p style="text-align: center;color: #3F4C56;">empty Cart</p>`;
    return;
  }
  shopCartContent.innerHTML = "";
  cart.forEach((element) => {
    let productfound = Shopproducts.find((product) => product.id == element.id);
    if (productfound) {
      drawShopCart(productfound, element.quantity);
    }
  });
  Amount();
  totalPrice();
}
function drawShopCart(product, amount) {
  let text = `<div class="cart-box">
            <img src="${product.images[0]}" alt="" class="cart-img">
            <div class="cart-details">
              <h2 class="cart-product-title">${product.title}</h2>
              <span class="cart-price">EGP ${product.price}</span>
              <div class="cart-quantity">
                <button id="decrement" onclick=decrease(${product.id}) >-</button>
                <span class="number">${amount}</span>
                <button id="increment" onclick=increase(${product.id}) >+</button>
              </div>
            </div>
            <i onclick="removeProduct(${product.id})"  class="fa-solid fa-trash-can cart-remove"></i>
          </div>`;
  shopCartContent.innerHTML += text;
}
function removeProduct(id) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  let updatedCart = cart.filter((item) => item.id !== id);

  sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  normalShop();
  Amount();
  totalPrice();
}

function increase(id) {
  // Retrieve existing cart or initialize it as an empty array
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Check if the product already exists in the cart
  const existingProductIndex = cart.findIndex((item) => item.id === id);

  if (existingProductIndex !== -1) {
    // Update the quantity of the existing product
    cart[existingProductIndex].quantity += 1;
  }

  // Save the updated cart back to sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  console.log("Cart updated:", cart);
  Amount();
  normalShop();
  totalPrice();
}
function decrease(id) {
  // Retrieve existing cart or initialize it as an empty array
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Check if the product already exists in the cart
  const existingProductIndex = cart.findIndex((item) => item.id === id);

  if (existingProductIndex !== -1) {
    // Update the quantity of the existing product
    if (cart[existingProductIndex].quantity === 1) {
      removeProduct(id);
    } else {
      cart[existingProductIndex].quantity -= 1;
    }
  }

  // Save the updated cart back to sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  console.log("Cart updated:", cart);
  Amount();
  normalShop()
  totalPrice();
}

function totalPrice() {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  console.log(cart);
  if (cart.length==0) {
    totalCart.innerHTML=0;
    return
  }
  let total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  console.log(total);
  console.log(cart[0].quantity,cart[0].price);
  
  // Display formatted total price
  totalCart.innerHTML = total > 0 ? `EGP ${total.toFixed(2)}` : 0;
}

function Amount(){
    let cart=JSON.parse(sessionStorage.getItem("cart"));
    let allQuantity= cart.reduce((acc,curr) => acc+=curr.quantity ,0 );
    amount.innerHTML=allQuantity;
    
}