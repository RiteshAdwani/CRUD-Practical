const productDetailsForm = document.querySelector(".product-details-form");
const productId = document.querySelector("#product-id");
const productName = document.querySelector("#product-name");
const productImg = document.querySelector("#product-img");
const productPrice = document.querySelector("#product-price");
const productDescription = document.querySelector("#product-description");
const submitBtn = document.querySelector("#submit-btn");
const tableBody = document.querySelector(".table-body");
const searchInput = document.querySelector("#search");

// function handle filter by Product ID
searchInput.addEventListener("keyup", filterTask);
function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".table-row").forEach((task) => {
    const id = task.querySelectorAll(".filter")[0].textContent;
    const name = task.querySelectorAll(".filter")[1].textContent;
    if (id.toLowerCase().indexOf(text) != -1 || name.toLowerCase().indexOf(text) != -1) {
      task.style.display = "table-row";
    } else {
      task.style.display = "none";
    }
  });
}

// Displaying product items
function showData(){
  let productList = JSON.parse(localStorage.getItem("productItems")) || [];

  var tableRow = "";
  productList.forEach(function(product,index){
    tableRow +=
    
 `
 <tr class="table-row">
 <td class="filter">${product.id} </td>
<td class="filter">${product.name}</td>
<td>${product.description}</td>
<td>${product.price}</td>
<td class="px-0">
<button class=" btn btn-sm btn-outline-primary me-md-2 mb-md-0 mb-1" data-toggle="tooltip" data-placement="bottom" title="View" onclick="viewProduct(`+index+`)"><a><i class="fa-solid fa-eye"></i></a></button>
<button class="delete-btn btn btn-sm btn-outline-danger mb-md-0 mb-1" data-toggle="tooltip" data-placement="bottom" title="Delete" onclick="deleteProduct(`+index+`)"><i class="fa-solid fa-trash"></i></button>
</td>
</tr>
   `
  });
  document.querySelector(".table-body").innerHTML = tableRow;
}
document.onload=showData();

let productItems = JSON.parse(localStorage.getItem("productItems")) || [];

// Creating product object when user clicks on add product button
productDetailsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Checking if all fields are filled or not
  if (productId.value == "" || productName.value == "" || productImg.value == "" || productPrice.value == "" || productDescription.value == "") {
    Swal.fire('Please fill all the fields!')
    return;
  }
  const product = {
   id: productId.value,
   name: productName.value,
   img: file,
   price: productPrice.value,
   description: productDescription.value,
  }

  // Adding Products to local storage
  productItems.push(product);
  localStorage.setItem("productItems", JSON.stringify(productItems));
  showData();

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your data has been saved',
    showConfirmButton: false,
    timer: 1500
  })
  productDetailsForm.reset();
});

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

// Deleting Product Row from product list
function deleteProduct(index) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your data has been deleted.',
        'success'
      )
      productItems.splice(index, 1);
      localStorage.setItem("productItems", JSON.stringify(productItems));
      showData();
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your data is safe :)',
        'error'
      )
    }
  });
}

// get redirected to the View page
function viewProduct(index) {
  window.location.href = "view.html?index=" + index;
}

// sort Table data by product id,product name,price
function sortTable(n, evt) {
  let thead = document.querySelector("thead");
  let tbody = document.querySelector("tbody");
  let bRows = [...tbody.rows];
  let hData = [...thead.querySelectorAll("th")];
  let desc = false;
  
  hData.map((head) => {
    if (head != evt) {
      head.classList.remove("asc", "desc");
    }
  });

  desc = evt.classList.contains("asc") ? true : false;
  evt.classList[desc ? "remove" : "add"]("asc");
  evt.classList[desc ? "add" : "remove"]("desc");

  
  tbody.innerHTML = "";

  if (n == 0 || n == 3) {
    bRows.sort((a, b) => {
      let x = Number(a.getElementsByTagName("td")[n].innerHTML.toLowerCase());
      let y = Number(b.getElementsByTagName("td")[n].innerHTML.toLowerCase());

      return desc ? (x < y ? 1 : -1) : x < y ? -1 : 1;
    });
  } else if(n==1){bRows.sort((a, b) => {
    let x = a.getElementsByTagName('td')[n].innerHTML.toLowerCase();
    let  y = b.getElementsByTagName('td')[n].innerHTML.toLowerCase();
    return desc ? (x < y ? 1 : -1) : x < y ? -1 : 1;
  });
    
  }
  
  bRows.map((bRow) => {
    tbody.appendChild(bRow);
  });
}