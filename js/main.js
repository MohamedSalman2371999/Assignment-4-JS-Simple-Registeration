var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPassword = document.getElementById("signUpPassword");
var signInEmail = document.getElementById("signInEmail");
var signInPassword = document.getElementById("signInPassword");
var log_In = document.getElementById("logIn");
var sign_Up = document.getElementById("signUp");
var nodeListSignUp = document.querySelectorAll(".signUp-Form input");
var P_WorngExsist = document.getElementById("p-worng-exsist");
var P_WorngRequired = document.getElementById("p-worng-required");
var P_WorngSuccess = document.getElementById("p-worng-success");
var P_WorngIncorrectLogIn = document.getElementById("p-worng-incorrectLogIn");
var P_WorngRequiredLogIn = document.getElementById("p-worng-requiredLogIn");
var box_modal = document.getElementById("modalShown");
var closebox_modal = document.getElementById("closeBtn");
var showPasswordSignOut = document.getElementById("showPasswordSignOut");
var hiddenPasswordSignOut = document.getElementById("hiddenPasswordSignOut");
var showPasswordSignIn = document.getElementById("showPasswordSignIn");
var hiddenPasswordSignIn = document.getElementById("hiddenPasswordSignIn");

var userContainer = [];

if (localStorage.getItem("usersInfo") != null) {
  userContainer = JSON.parse(localStorage.getItem("usersInfo"));
}
if (log_In) {
  log_In.addEventListener("click", function () {
    var currectSignInEmail = signInEmail.value;
    var currectSignInPassword = signInPassword.value;
    if(signInEmail.value==''||signInPassword.value==''){
        P_WorngRequiredLogIn.classList.remove("d-none");
        P_WorngIncorrectLogIn.classList.add("d-none");
    }else {
      for (let i = 0; i < userContainer.length; i++) {
      if (userContainer[i].email == currectSignInEmail && userContainer[i].password == currectSignInPassword) 
        { 
          localStorage.setItem('userName',userContainer[i].name)
           window.location = "./home.html";
        }else{
        P_WorngIncorrectLogIn.classList.remove("d-none");
        P_WorngRequiredLogIn.classList.add("d-none");
        }
    }
  }
  });
}
if (sign_Up) {
  sign_Up.addEventListener("click", function () {
    if (
      signUpName.value == "" ||
      signUpEmail.value == "" ||
      signUpPassword.value == ""
    ) {
      P_WorngRequired.classList.remove("d-none");
      P_WorngExsist.classList.add("d-none");
      P_WorngSuccess.classList.add("d-none");
    }else if(validationInputs(signUpName)&&validationInputs(signUpEmail)&&validationInputs(signUpPassword)){
      if (checkExist()) {
        P_WorngExsist.classList.remove("d-none");
        P_WorngRequired.classList.add("d-none");
        P_WorngSuccess.classList.add("d-none");
      } else {
          userInfo = {
            name: signUpName.value,
            email: signUpEmail.value,
            password: signUpPassword.value,
          };
          userContainer.push(userInfo);
          localStorage.setItem("usersInfo", JSON.stringify(userContainer));
          P_WorngSuccess.classList.remove("d-none");
          P_WorngExsist.classList.add("d-none");
          P_WorngRequired.classList.add("d-none");
          clearInputsSignUp();
        
        }
    }else{
      box_modal.classList.remove('d-none')
      P_WorngSuccess.classList.add("d-none");
      P_WorngExsist.classList.add("d-none");
      P_WorngRequired.classList.add("d-none");
    }
  });
}
function clearInputsSignUp() {
  signUpName.value = null;
  signUpEmail.value = null;
  signUpPassword.value = null;
  signUpName.classList.remove("is-valid");
  signUpEmail.classList.remove("is-valid");
  signUpPassword.classList.remove("is-valid");
}
function clearInputsSignIn() {
  signInEmail.value = null;
  signInPassword.value = null;
  signInEmail.classList.remove("is-valid");
  signInPassword.classList.remove("is-valid");
}

function checkExist() {
  for (let i = 0; i < userContainer.length; i++) {
    if (userContainer[i].email == signUpEmail.value) {
      return true;
    }
  }
}

document.addEventListener('input',function(e){
   validationInputs(e.target)
})
function validationInputs(elemnt){
  text=elemnt.value
  regx={
    signUpName: /^([A-Z]|[a-z])+\w? ?\w{1,}$/,
    signUpEmail: /^[A-Z]?(\w|\.){1,}\@gmail.com$/,
    signUpPassword: /^([A-Z]|[a-z])+(\w|\.| |@){8,}$/,
    signInEmail:/^[A-Z]?(\w|\.){1,}\@gmail.com$/,
    signInPassword:/^([A-Z]|[a-z])+(\w|\.| |@){8,}$/,
  };
  if(regx[elemnt.id].test(text)){
    elemnt.classList.add("is-valid")
    elemnt.classList.remove("is-invalid")
    return true
  }else{
    elemnt.classList.add("is-invalid")
    elemnt.classList.remove("is-valid")
    return false
  }
  }
  if(closebox_modal){
    closebox_modal.addEventListener('click',function(e){
      box_modal.classList.add('d-none')
    })
  }
  if(hiddenPasswordSignOut){
  hiddenPasswordSignOut.addEventListener('click',function(){
    signUpPassword.setAttribute('type' , 'text');
    hiddenPasswordSignOut.classList.add('d-none')
    showPasswordSignOut.classList.remove('d-none')
  })
}
if(showPasswordSignOut){
  showPasswordSignOut.addEventListener('click',function(){
    signUpPassword.setAttribute('type' , 'password');
    showPasswordSignOut.classList.add('d-none')
    hiddenPasswordSignOut.classList.remove('d-none')
  })
}
if(hiddenPasswordSignIn){
    hiddenPasswordSignIn.addEventListener('click',function(){
      signInPassword.setAttribute('type' , 'text');
      hiddenPasswordSignIn.classList.add('d-none')
      showPasswordSignIn.classList.remove('d-none')
    })
}
if(showPasswordSignIn){
  showPasswordSignIn.addEventListener('click',function(){
    signInPassword.setAttribute('type' , 'password');
    showPasswordSignIn.classList.add('d-none')
    hiddenPasswordSignIn.classList.remove('d-none')
  })
}
