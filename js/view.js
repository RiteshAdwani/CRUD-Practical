const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const index = urlParams.get("index");

document.onload = showData(index);

function showData(index){
// if page did not get index then it redirect to home page
 if (index) {
   let productItems = JSON.parse(localStorage.getItem("productItems")) || []

 var cardData = "";
 cardData += `
  <div class="card-header text-white" id="product-id">
    Product ID : ${productItems[index].id}
  </div>
  <div class="card-body px-md-5">
    <img src="${productItems[index].img}" class="card-img-top" height="400px">
    <h5 class="card-title">${productItems[index].name}</h5>
    <p class="card-text">${productItems[index].description}</p>
    <div class="d-flex justify-content-between">
    <a class="btn btn-success" data-bs-toggle="modal" data-bs-target="#update-data">Update</a>
    <a href="index.html" class="btn btn-secondary">Back</a>
  </div>
  <div class="card-footer text-white mt-3" id="product-price">
    Price : ₹${productItems[index].price} 
  </div>

  <div class="modal fade" id="update-data" tabindex="-1" aria-labelledby="updateData" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-white">Update Product Data</h1>
          <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="product-update-form" autocomplete="off">
            <div class="row container-fluid py-3 mx-0">
              <div class="col-md-6 mt-md-5 mt-3">
                <label for="productid" class="form-label">Product ID</label>
                <input type="text" class="form-control" id="productid" placeholder="Product ID" inputmode="numeric" pattern="[0-9]*"/>
              </div>

              <div class="col-md-6 mt-md-5 mt-3">
                <label for="product-name" class="form-label">Product Name</label>
                <input type="text" class="form-control" id="product-name" placeholder="Enter Product Name" />
              </div>

              <div class="col-md-6 mt-md-5 mt-3">
                <label for="productprice" class="form-label">Product Price</label>
                <input class="form-control" type="text" id="productprice" placeholder="Enter Product Price in ₹" inputmode="numeric" pattern="[0-9]*"/>
              </div>

              <div class="col-md-6 mt-md-5 mt-3">
                <label for="product-img" class="form-label">Product Image</label>
                <input class="form-control" type="file" id="product-img" accept="image/*" onchange="readURL()" />
              </div>

              <div class="col-md-6 mt-md-5 mt-3">
                <label for="product-description" class="form-label">Product Description</label>
                <textarea class="form-control" id="product-description" rows="4" placeholder="Enter Product Description"></textarea>
              </div>

              <div class="col-md-6 mt-md-5 mt-3">
                <div class="row">
                  <div class="col-md-6">
                    <label for="img-preview" class="form-label">Image Preview</label>
                    <img src="" id="img-preview" class="d-block" height="110px">
                  </div>
                </div>
              </div>
            </div>  
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary close" data-bs-dismiss="modal" onclick="updateProduct(index)">Save</button>
        </div>
      </div>
    </div>
  </div>
 `
 document.querySelector(".view-product").innerHTML = cardData;
 } else {
 window.location.href = "index.html";
 }
}

function updateProduct(index){
 // let productItems = JSON.parse(localStorage.getItem("productItems")) || [];
  
  let productId= document.querySelector("#productid");
  let productName = document.querySelector("#product-name");
  let productImg = document.querySelector("#product-img");
  let productPrice = document.getElementById("productprice");
  let productDescription = document.querySelector("#product-description");
  // Checking if all fields are filled or not
  if (productId.value == "" || productName.value == "" || productImg.value == "" || productPrice.value == "" || productDescription.value == "") {
    Swal.fire('Please fill all the fields!');
    return;
  }

  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      let productItems = JSON.parse(localStorage.getItem("productItems"));

      productItems[index].id = productId.value;
      productItems[index].name = productName.value;
      productItems[index].img = file;
      productItems[index].description = productDescription.value;
      productItems[index].price = productPrice.value;

      localStorage.setItem("productItems",JSON.stringify(productItems));
      showData(index);
      Swal.fire('Saved!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
}

// convert image data to URl for storing in localStorage
function readURL() {
  var image = document.getElementById("product-img").files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.addEventListener("load", async () =>
  { file = reader.result; });
  document.getElementById("img-preview").src = URL.createObjectURL(image);
  return;
}