var productName = document.getElementById("productName");
var productCategory = document.getElementById("productCategory");
var productPrice = document.getElementById("productPrice");
var productDescription = document.getElementById("productDescription");
var productImge = document.getElementById("img");
var upDate = document.getElementById("updateProduct");
var addDate = document.getElementById("addProduct");
var searchitem = document.getElementById("search");
var welcomeMsg = document.getElementById("welcomeMsg");
var objectIndex = 0;
var productConainer = [];
if (localStorage.getItem("items") != null) {
  productConainer = JSON.parse(localStorage.getItem("items"));
  showItems();
}
function addProduct() {
  if(  validationInputs(productName)&&
  validationInputs(productCategory)&&
  validationInputs(productPrice)&&
  validationInputs(productDescription))
  {
    var product = {
      name: productName.value,
      category: productCategory.value,
      price: productPrice.value,
      description: productDescription.value,
      image: productImge.files[0]?.name
        ? `images/${productImge.files[0]?.name}`
        : `images/0.webp`,
    };
    productConainer.push(product);
    localStorage.setItem("items", JSON.stringify(productConainer));
    showItems();
    clearInputs();
  }

}

function clearInputs() {
  productName.value = null;
  productCategory.value = null;
  productPrice.value = null;
  productDescription.value = null;
  productImge.value = null;

  productName.classList.remove("is-valid")
  productCategory.classList.remove("is-valid")
  productPrice.classList.remove("is-valid")
  productDescription.classList.remove("is-valid")
}

function showItems() {
  var cartona = "";
  for (i = 0; i < productConainer.length; i++) {
    cartona += `<div class="col-lg-3 col-md-6">
    <div class="productItem text-center border rounded-3 text-white" data-aos="fade-up" data-aos-offset="50">
    <div class="imgContainer my-3">
    <img src="${productConainer[i].image}" alt="">
    </div>
    <h5>${productConainer[i].name}</h5>
    <h6>${productConainer[i].category}</h6>
    <h6>${productConainer[i].price}</h6>
    <span>${productConainer[i].description}</span>
    <div class="my-3 d-flex justify-content-center gap-2">
        <button onclick="deleteItem(${i})" class="btn btn-outline-danger">Delete</button>
        <button  onclick="UpdateItem(${i})" class="btn btn-outline-warning">Update</button>
    </div>
</div>
</div>`;
  }
  document.getElementById("products").innerHTML = cartona;
}
function deleteItem(index) {
  productConainer.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(productConainer));
  showItems();
}
function UpdateItem(index) {
  objectIndex = index;
  productName.value = productConainer[index].name;
  productCategory.value = productConainer[index].category;
  productPrice.value = productConainer[index].price;
  productDescription.value = productConainer[index].description;
  upDate.classList.remove("d-none");
  addDate.classList.add("d-none");
}

function Updating() {
  var product = {
    name: productName.value,
    category: productCategory.value,
    price: productPrice.value,
    description: productDescription.value,
    image: productImge.files[0]?.name
      ? `images/${productImge.files[0]?.name}`
      : `images/0.webp`,
  };
  productConainer.splice(objectIndex, 1, product);
  localStorage.setItem("items", JSON.stringify(productConainer));
  showItems();
  addDate.classList.remove("d-none");
  upDate.classList.add("d-none");
  clearInputs();
}

function search() {
  var cartona = "";
  for (i = 0; i < productConainer.length; i++) {
    if (
      productConainer[i].name
        .toLowerCase()
        .includes(searchitem.value.toLowerCase())
    ) {
      cartona += `<div class="col-lg-3 col-md-6">
      <div class="productItem text-center border rounded-3 text-white" data-aos="fade-up" data-aos-offset="50">
      <div class="imgContainer my-3">
      <img src="${productConainer[i].image}" alt="">
      </div>
      <h5>${productConainer[i].name}</h5>
      <h6>${productConainer[i].category}</h6>
      <h6>${productConainer[i].price}</h6>
      <span>${productConainer[i].description}</span>
      <div class="my-3 d-flex justify-content-center gap-2">
          <button onclick="deleteItem(${i})" class="btn btn-outline-danger">Delete</button>
          <button  onclick="UpdateItem(${i})" class="btn btn-outline-warning">Update</button>
      </div>
  </div>
  </div>`;
    }
  }
  document.getElementById("products").innerHTML = cartona;
}
function SignOut(){
  window.location = "./index.html";
}
function validationInputs(elemnt){
text=elemnt.value
regx={
  productName:/^[A-Z]\w{3,10}$/,
  productCategory:/^(tv|mobile|laptop|screen|computer)$/i,
  productPrice:/^[1-9][0-9]{3,6}$/,
  productDescription:/^.{3,}$/m
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
welcomeMsg.innerHTML=localStorage.getItem('userName')