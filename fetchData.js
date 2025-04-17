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




// =====================================================
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

const catBtns = document.getElementsByClassName("category")
const searchBtn = document.getElementById("searchBtn")
const productsContainer = document.getElementById("productsContainer")

// ================ display all products ================

async function allData() {
        const allProducts = await fetchData();
        if (allProducts) 
            {
            allProducts.forEach((product) => {

                let productDiv=document.createElement("div")
                productDiv.innerHTML+=` <img class="product-img" src="${product.images[0]}">
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

                productDiv.className="productDiv"
                productDiv.id=`${product.id}`    
                productsContainer.appendChild(productDiv)      
                
                productsContainer.addEventListener("click", (event) => {
                    if(event.target.id === `${product.id}`) {
                        goToDes(product.id);
                    }
                    })

                    document.getElementsByClassName("product-img")[product.id-1].addEventListener("click", () => {
                            goToDes(product.id);
                        
                        })
            });
    }
    
}

allData(); 

// ================ search by title ================

async function search() {
    const all = await fetchData();
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

// // ================ get the selected product ================

function goToDes(selectedId){
    sessionStorage.setItem("selectedProductId", selectedId)
    x=window.location.href="description.html"
    document.getElementById("searchInput").value='';
}

// // ================ search by category ================

async function byCat(event) {
    const all = await fetchData();
    if (all) {
        const searchedImg=[]
        document.getElementById("searchInput").value='';
        productsContainer.innerHTML = '';  
        
        all.forEach((product)=>{
            if(event.target.id === `${product.category}`){
                let productDiv=document.createElement("div")
            productDiv.innerHTML+=`<img class="product-img"  src="${product.images[0]}" alt="${product.title}">
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

            productDiv.className="productDiv"
            productDiv.id=`${product.id}`    
            productsContainer.appendChild(productDiv)  
            searchedImg.push(product.id)
    
            productsContainer.addEventListener("click", (event) => {
                if(event.target.id === `${product.id}`) {
                    goToDes(product.id);
                }
                })

                
            }

        })

        for (let index = 0; index < searchedImg.length; index++) {
            document.getElementsByClassName("product-img")[index].addEventListener("click", () => {
                goToDes(searchedImg[index]);
            })
        }
        
    }
}

// ================ search by all categories ================

async function allCat() {
    const allProducts = await fetchData();
    if (allProducts) 
        {
            document.getElementById("searchInput").value='';
            productsContainer.innerHTML = '';  
            allProducts.forEach((product) => {

            let productDiv=document.createElement("div")
            productDiv.innerHTML+=`<img class="product-img"  src="${product.images[0]}" alt="${product.title}">
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

            productDiv.className="productDiv"
            productDiv.id=`${product.id}`    
            productsContainer.appendChild(productDiv)      
            
            productsContainer.addEventListener("click", (event) => {
                if(event.target.id === `${product.id}`) {
                    goToDes(product.id);
                }
                })

                document.getElementsByClassName("product-img")[product.id-1].addEventListener("click", () => {
                    goToDes(product.id);
                
                })
        });  
}

}


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
    

    sessionStorage.setItem('cart',JSON.stringify(cart));
    Amount();
    normalShop()
}



function Amount(){
    let cart=JSON.parse(sessionStorage.getItem("cart"));
    let allQuantity= cart.reduce((acc,curr) => acc+=curr.quantity ,0 );
    amount.innerHTML=allQuantity;
    
}

// ==============================choose category==================
// const categoriesDiv=document.getElementById("categoriesDiv")
// const chooseCategory=document.getElementById("chooseCat")

// function chooseCat(){
//     document.getElementById("categoriesDivMobile").style.display="none"
//     categoriesDiv.style.display="flex"
//     categoriesDiv.style.backgroundColor="#3334"
//     categoriesDiv.style.padding="10px"
//     categoriesDiv.style.borderRadius="15px"
//     document.getElementById("closeIcon").style.display="flex"
//     // chooseCategory.style.display="none"
// }

