window.onload=function(){
  if(localStorage.getItem("login")!="active"){
    window.location.href="login.html"
  }
  }
  
  // ====================sign out===========================
  
  function signOut(){
    // localStorage.removeItem("name")
    // localStorage.removeItem("email")
    // localStorage.removeItem("password")
    localStorage.removeItem("selectedProductId")
    localStorage.setItem("login","inactive")
    sessionStorage.clear();
    window.location.href='login.html'
  }

  //======================================================== 

const user=document.getElementById('person')
const userInfo=document.getElementsByClassName('user-info')[0]
const cartContainer=document.getElementsByClassName('content')[0]
const toggleBtn=document.getElementById('menu')
const dropMenu=document.getElementsByClassName('drop-down')[0]
let amount=document.getElementById('amount')
let subprice=document.getElementsByClassName('subPrice')
let totalPrice=document.getElementById('totalprice')
let number=document.getElementById('Number')
const shippingSelect = document.getElementById("shipping");
const promoCodeInput = document.getElementById("promocode")

// =======================user name ==========================

const userName=document.getElementById("userNameLogin")
// const [firstName, ...rest]=localStorage.getItem("name").split(' ')
userName.innerText=localStorage.getItem("name")

//////////////////////////dark and light modes///////////////////////
let darkmode=localStorage.getItem('darkmode')
const modeSwitch=document.getElementById("modeSwitch")

const enableDarkMode=() => {
document.body.classList.add('darkMode')
localStorage.setItem('darkmode','active')
}

const disableDarkMode=() => {
  document.body.classList.remove('darkMode')
  localStorage.setItem('darkmode',null)
  }

  if(darkmode==="active") enableDarkMode()

modeSwitch.addEventListener('click', () => {
  darkmode=localStorage.getItem('darkmode')
darkmode!=="active"? enableDarkMode() : disableDarkMode()

})
 
//in mobile media drop-dwon menu
toggleBtn.addEventListener('click',()=> {
   
   if (dropMenu.style.display==='none') {
     toggleBtn.className="bi bi-x"
     dropMenu.style.display='block'
   }else{
    toggleBtn.className="bi bi-list"
    dropMenu.style.display='none'
   }
})

let allProductsGlobal = [];



user.addEventListener('click',()=>{
    userInfo.style.display = userInfo.style.display === 'flex' ? 'none' : 'flex';
})

// ===================fetchdata===================
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
          allProductsGlobal = allProducts; // Save globally
             console.log(allProducts)
             filterData(allProducts)
        }
    }

allData(); 

//=================filter product=====================
function filterData(products) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  if (cart.length === 0) {
      cartContainer.innerHTML=`<p style="text-align:center;margin:20px auto"; >empty Cart</p>`;
      return
  }
  cartContainer.innerHTML='';
  cart.forEach(element => {
    let product=products.find(ele => ele.id === element.id);
    if (product) {
      display(product,element.quantity)
    }
  })
  Amount()
  SubPrice()
}

//===========draw product ======================
function display(product,quantity) {
    let data = ` <div class="product">
                <div class="product-details">
                  <img src="${product.images[0]}" alt="" />
                  <p>${product.title}</p>
                  <div class="quantity">
                    <button onclick=increase(${product.id}) class="plus">
                      <i class="bi bi-plus"></i>
                    </button>
                    <span>${quantity}</span>
                    <button onclick=decrease(${product.id}) class="minus">
                      <i class="bi bi-dash"></i>
                    </button>
                  </div>
                  <h5>EGP${product.price}</h5>
                </div>
                 <i onclick=removeProduct(${product.id}) class="bi bi-trash" ></i>
              </div>`

  
    cartContainer.innerHTML += data;
    
}

//======================= increase quantity==============
function increase(id) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
   let existingProductIndex=cart.findIndex(item => item.id === id)
   if (existingProductIndex != -1) {
       cart[existingProductIndex].quantity+=1;
   }
   sessionStorage.setItem("cart", JSON.stringify(cart));
   filterData(allProductsGlobal);
   Amount()
   SubPrice()
}

//=====================decrease quantity============
function decrease(id) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  
  // Check if the product already exists in the cart
  const existingProductIndex = cart.findIndex(item => item.id === id);

  if (existingProductIndex !== -1) {
    // Update the quantity of the existing product
    if(cart[existingProductIndex].quantity === 1){
        
        removeProduct(id);
    } else {
        cart[existingProductIndex].quantity-=1;
    }
  } 

  // Save the updated cart back to sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  filterData(allProductsGlobal);
  Amount()
  SubPrice()
}


//================== remove product=================
function removeProduct(id){
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  
  // Check if the product already exists in the cart
  const updatedCart = cart.filter(item => item.id !== id);
 
  // Save the updated cart back to sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  filterData(allProductsGlobal)
  Amount()
  SubPrice()
}

function Amount(){
  let cart=JSON.parse(sessionStorage.getItem("cart"));
  let allQuantity= cart.reduce((acc,curr) => acc+=curr.quantity ,0 );
  amount.innerHTML=allQuantity;
  number.innerHTML=`items ${cart.length}`
}

let sum;
function SubPrice() {
  let cart=JSON.parse(sessionStorage.getItem("cart"));
   sum=cart.reduce((acc,curr) => acc+=curr.quantity * curr.price , 0);
  subprice[0].innerHTML=`EGP ${sum}`;
  subprice[1].innerHTML=`EGP ${sum}`;
  calculateTotal(sum)
}

//==================calculate total===============
function calculateTotal(sub) {
  // Ensure 'sub' is a valid number
  if (isNaN(sub)) {
    console.error('Invalid subtotal:', sub);
    return;
  }

  // Get selected shipping cost and ensure it's a valid number
  const shippingCost = parseFloat(shippingSelect.value);
  if (isNaN(shippingCost)) {
    console.error('Invalid shipping cost:', shippingSelect.value);
    return;
  }

  // Get promo code value and calculate discount
  const promoCode = promoCodeInput.value.trim();
  let discount = 0;
  if (promoCode === "DISCOUNT10") {
    discount = 0.10; // 10% discount
  }

  // Calculate total price
  const total = (sub + shippingCost) * (1 - discount);

  // Update total price display
  totalPrice.textContent = `EGP ${total.toFixed(2)}`;
}

// Event listeners to recalculate total when shipping or promo code changes
shippingSelect.addEventListener("change", () => calculateTotal(sum));
promoCodeInput.addEventListener("input", () => calculateTotal(sum));