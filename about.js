window.onload=function(){
if(localStorage.getItem("login")!="active"){
  window.location.href="login.html"
  document.body.style.display="hidden"
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

Amount()

function Amount(){
  let cart=JSON.parse(sessionStorage.getItem("cart"));
  let allQuantity= cart.reduce((acc,curr) => acc+=curr.quantity ,0 );
  amount.innerHTML=allQuantity;
  
}




