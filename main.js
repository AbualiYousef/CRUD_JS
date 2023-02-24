var productNameInput = document.getElementById("productName");
var productCategoryInput = document.getElementById("productCategory");
var productPriceInput = document.getElementById("productPrice");
var productDescriptionInput = document.getElementById("productDescription");
var addBtn = document.getElementById("addBtn");
var deleteAll = document.getElementById("deleteAll");
var products = [];
var data = document.getElementById("data");
var inputs = document.getElementsByClassName("form-control");
var currentIndex = 0;
var nameAlert = document.getElementById("nameAlert");

if (localStorage.getItem("productsList") != null) {
    products = JSON.parse(localStorage.getItem("productsList"));
    displayData();
}

addBtn.onclick = function () {
    if (addBtn.innerHTML == "Add Product")
        addProduct();
    else {
        addBtn.innerHTML = "Add Product";
        updateProduct();
    }
    displayData();
    clearForm();
}

function addProduct() {
    var product = {
        name: productNameInput.value,
        category: productCategoryInput.value,
        price: productPriceInput.value,
        description: productDescriptionInput.value,
    }
    products.push(product);
    localStorage.setItem("productsList", JSON.stringify(products));
    addBtn.setAttribute("disabled", "disabled");
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Product Added successfully',
        showConfirmButton: false,
        timer: 1500
    })
}

function displayData() {
    var result = "";
    for (var i = 0; i < products.length; i++) {
        result += `<tr>
        <td>${i}</td>
        <td>${products[i].name}</td>
        <td>${products[i].category}</td>
        <td>${products[i].price+" ₪"}</td>
        <td>${products[i].description}</td>
        <td><button class="btn btn-outline-info" onclick=getProductData(${i})>Update</button></td>
        <td><button class="btn btn-outline-danger" onclick=deleteProduct(${i})>Delete</button></td>
        </tr>`;
    }
    data.innerHTML = result;
}

function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    productName.classList.remove("is-valid");
}

function deleteProduct(index) {
    Swal.fire({
        title: 'Are you sure you want to delete this product?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            products.splice(index, 1);
            localStorage.setItem("productsList", JSON.stringify(products));
            displayData();
            Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
            )
        }
    })
}

deleteAll.onclick = function () {
    Swal.fire({
        title: 'Are you sure you want to delete all products?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("productsList");
            products = [];
            data.innerHTML = "";
            Swal.fire(
                'Deleted!',
                'Your products has been deleted.',
                'success'
            )
        }
    })

}

function search(name) {
    var result = "";
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(name.toLowerCase())) {
            result += `<tr>
        <td>${i}</td>
        <td>${products[i].name}</td>
        <td>${products[i].category}</td>
        <td>${products[i].price}</td>
        <td>${products[i].description}</td>
        <td><button class="btn btn-outline-info" onclick=getProductData(${i})>Update</button></td>
        <td><button class="btn btn-outline-danger" onclick=deleteProduct(${i})>Delete</button></td>
        </tr>`;
        }
    }
    data.innerHTML = result;
}

function getProductData(index) {
    addBtn.removeAttribute("disabled");

    var product = products[index];

    productNameInput.value = product.name;
    productCategoryInput.value = product.category;
    productPriceInput.value = product.price;
    productDescriptionInput.value = product.description;
    addBtn.innerHTML = "Update";
    currentIndex = index;
}

function updateProduct() {
    var product = {
        name: productNameInput.value,
        category: productCategoryInput.value,
        price: productPriceInput.value,
        description: productDescriptionInput.value,
    }
    products[currentIndex].name = product.name;
    products[currentIndex].category = product.category;
    products[currentIndex].price = product.price;
    products[currentIndex].description = product.description;
    localStorage.setItem("productsList", JSON.stringify(products));
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Product Updated successfully',
        showConfirmButton: false,
        timer: 1500
    })
}

productName.onkeyup = function () {
    var namePattern = /^[A-Z]([a-zA-z]|[0-9]| ){2,12}$/;
    if (namePattern.test(productName.value)) {
        addBtn.removeAttribute("disabled");
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        nameAlert.classList.add("d-none");

    } else {
        addBtn.setAttribute("disabled", "disabled");
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        nameAlert.classList.remove("d-none");
    }
}

productPrice.onkeyup = function () {
    var pricePattern = /^\d{1,8}(?:\.\d{1,4})?$/;
    if (pricePattern.test(productPrice.value)) {
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
    } else {
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
    }
}

console.log(productCategory.value)

// productCategory.classList.add("is-valid");