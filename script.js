window.onload=function(){
    if(localStorage.getItem("login")!="active"){
      window.location.href="index.html"
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
      window.location.href='index.html'
    }
    
    // ==============================================================
const user=document.getElementById('person')
const userInfo=document.getElementsByClassName('user-info')[0]
const toggleBtn=document.getElementById('menu')
const dropMenu=document.getElementsByClassName('drop-down')[0]
let amount=document.getElementById('amount')

// =======================user name ==========================
const userName=document.getElementById("userNameLogin")
// const [firstName, ...rest]=localStorage.getItem("name").split(' ')
userName.innerText=localStorage.getItem("name")
// ==========================================================

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



user.addEventListener('click',()=>{
    userInfo.style.display = userInfo.style.display === 'flex' ? 'none' : 'flex';
})

// sessionStorage.setItem("selectedProductId", 18);

async function loadProductDetails() {
 
  
    // const params = new URLSearchParams(window.location.search);
    // const productId = params.get('id');
     const productId = sessionStorage.getItem("selectedProductId");

    if (!productId) {
        document.body.innerHTML = "<h2>Product not found</h2>";
        return;
    }

    try {
        const response = await fetch('data.json');
        if (!response.ok) 
        
        throw new Error("Failed to fetch product data");

        const products = await response.json();
        const product = products.find(p => p.id == productId);

        if (!product) {
            document.body.innerHTML = "<h2>Product not found</h2>";
            return;
        }

        document.getElementById('add-to-cart').addEventListener('click', () => {
            addToCart(product.id, 1, product.price);
        });
        document.getElementById("product-title").textContent = product.title;
        document.getElementById("product-category").textContent=product.category;
        document.getElementById("product-raiting").innerHTML=`<i  class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i  class="fa-solid fa-star"></i>
                                            <i  class="fa-solid fa-star"></i>
                                            <i  class="fa-solid fa-star-half-stroke"></i>`;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-price").innerText = `EGP${product.price}`;
        document.getElementById("main-image").src = product.images[0];
        
 
        const thumbnails = document.getElementById("thumbnails");
        product.images.forEach(image => {
            const img = document.createElement("img");
            img.src = image;
            img.classList.add("thumbnail");
            img.onclick = () => document.getElementById("main-image").src = image;
            thumbnails.appendChild(img);
        });

    } catch (error) {
        console.error("Error loading product details:", error);
    }
}

loadProductDetails();


//================addtocart===================
Amount();

function addToCart(id,quantity,price) {
    let cart=JSON.parse(sessionStorage.getItem('cart')) || [];
    // Check if the product already exists in the cart
  const existingProductIndex = cart.findIndex(item => item.id === id);

  if (existingProductIndex !== -1) {
    // Update the quantity of the existing product
    cart[existingProductIndex].quantity += quantity;
    }else{
        cart.push({id,quantity,price})
    }
    sessionStorage.setItem('cart',JSON.stringify(cart))
    Amount();
     window.location.href="./cart.html"
}



function Amount(){
    let cart=JSON.parse(sessionStorage.getItem("cart"));
    let allQuantity= cart.reduce((acc,curr) => acc+=curr.quantity ,0 );
    amount.innerHTML=allQuantity;
    
}


