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
  
  // ==============================================================
let slider = document.querySelector(".sliderImg");
let amount=document.getElementById('amount')
let index=0

const homeImages = [
  "./images/home1.jpg",
  "./images/home2.jpg",
  "./images/home3.jpg",
];

// =======================user name ==========================
const user=document.getElementById('person')
const userInfo=document.getElementsByClassName('user-info')[0]
const userName=document.getElementById("userNameLogin")
// const [firstName, ...rest]=localStorage.getItem("name").split(' ')
userName.innerText=localStorage.getItem("name")
user.addEventListener('click',()=>{
  userInfo.style.display = userInfo.style.display === 'flex' ? 'none' : 'flex';
})

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
//==============slider in home ====================
function nextSlide() {
  index = (index + 1) % homeImages.length;
  slider.src = homeImages[index];
}

setInterval(nextSlide,2500)

async function fetchData() {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

async function allData() {
  const allProducts = await fetchData();
  const productsContainer = document.getElementById("products");

  if (allProducts) {
    const classicBouquets = allProducts
      .filter((product) => product.category === "Classic Bouquets")
      .slice(0, 8);

    classicBouquets.forEach((product) => {
      //   const productCard = document.createElement("div");
      //   productCard.classList.add("product");
      //   productCard.innerHTML = `
      //             <img src="${product.images[0]}" alt="${product.title}">
      //             <h3>${product.title}</h3>
      //              <p class="price">$${product.price}</p>
      //         `;
      //   productsContainer.appendChild(productCard);
      let productDiv = document.createElement("div");
      productDiv.innerHTML += ` <img class="product-img" src="${product.images[0]}">
                                        <h4>${product.title}</h4>
                                        <div id="raitingDiv">
                                            <i  class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i  class="fa-solid fa-star"></i>
                                            <i  class="fa-solid fa-star"></i>
                                            <i  class="fa-solid fa-star-half-stroke"></i>
                                        </div>
                                        <p>${product.category}</p>
                                        <p>EGP${product.price}</p>
                                        <i  onclick=addToCart(${product.id},1,${product.price}) class="fa-solid fa-cart-plus addToCart-btn"></i>`

      productDiv.className = "productDiv";
      productDiv.id = `${product.id}`;
      productsContainer.appendChild(productDiv);

      productsContainer.addEventListener("click", (event) => {
        if (event.target.id === `${product.id}`) {
          goToDes(product.id);
        }
      });

      document
        .getElementsByClassName("product-img")
        [product.id - 1].addEventListener("click", () => {
          goToDes(product.id);
        });
    });
  }
}

allData();

// ============================

// ================ search by title ================

async function search() {
  const all = await fetchData();
  const productsContainer = document.getElementById("products");
  const searchedImg=[]
  if (all) {
      productsContainer.innerHTML = '';  
      let searchKey = document.getElementById("searchInput").value;

      let foundProducts = false;  

      all.forEach((product) => {
          if (product.title.toLowerCase().includes(searchKey.toLowerCase())) {
              let productDiv = document.createElement("div");
              productDiv.innerHTML = `<img class="product-img"  src="${product.images[0]}" alt="${product.title}">
                                      <h4>${product.title}</h4>
                                      <div id="raitingDiv">
                                          <i  class="fa-solid fa-star"></i>
                                          <i class="fa-solid fa-star"></i>
                                          <i  class="fa-solid fa-star"></i>
                                          <i  class="fa-solid fa-star"></i>
                                          <i  class="fa-solid fa-star-half-stroke"></i>
                                      </div>
                                      <p>${product.category}</p>
                                      <p>EGP${product.price}</p>
                                      <i  onClick=addToCart(${product.id},1,${product.price}) class="fa-solid fa-cart-plus addToCart-btn"></i>`

              productDiv.className = "productDiv"
              productDiv.id=`${product.id}`
              productsContainer.appendChild(productDiv)
              foundProducts = true;
              searchedImg.push(product.id)

              productsContainer.addEventListener("click", (event) => {
                  if(event.target.id === `${product.id}`) {
                      goToDes(product.id);
                      searchKey.value=''
                  }
                  })

          }

      });

      for (let index = 0; index < searchedImg.length; index++) {
          document.getElementsByClassName("product-img")[index].addEventListener("click", () => {
              goToDes(searchedImg[index]);
          })
      }

      if (!foundProducts) 
          {
          productsContainer.innerHTML =  `<div id="notFoundDiv"><p> Not Found </p></div>`
          } 
  }
  // document.getElementById("searchInput").value='';
}

// ==================================================

function goToDes(selectedId) {
  sessionStorage.setItem("selectedProductId", selectedId);
  x = window.location.href = "description.html";
  // document.getElementById("searchInput").value='';
}

//===============add to cart=======================
Amount()
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
    normalShop();
}



function Amount(){
    let cart=JSON.parse(sessionStorage.getItem("cart"))||[];
    if(cart.length!=0)
    {
      let allQuantity= cart.reduce((acc,curr) => acc+=curr.quantity ,0 );
      amount.innerHTML=allQuantity;
    }
    else{
      amount.innerHTML=0;
    }

    
}

// ================================
//in mobile media drop-dwon menu
const toggleBtn=document.getElementById('menu')
const dropMenu=document.getElementsByClassName('drop-down')[0]

toggleBtn.addEventListener('click',()=> {
   
  if (dropMenu.style.display==='none') {
    toggleBtn.className="bi bi-x"
    dropMenu.style.display='block'
  }else{
   toggleBtn.className="bi bi-list"
   dropMenu.style.display='none'
  }
})

