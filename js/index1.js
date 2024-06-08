var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");
var Button1 = document.getElementById("btn1")
var Button2 = document.getElementById("btn2")
var alertInput=document.getElementById("alert")
var searchProductInput= document.getElementById("productSearch")
var bookMarkContainer = [];
if (localStorage.getItem("products") !== null) {
    bookMarkContainer = JSON.parse(localStorage.getItem("products"));
    display();
}
function addProduct() {
    if(
        bookmarkNameInput.classList.contains("is-valid")&&
        bookmarkURLInput.classList.contains("is-valid")
    ){
        var product = {
            name: bookmarkNameInput.value,
            link: bookmarkURLInput.value,
        }
        bookMarkContainer.push(product);
        clearInput();
        display();
        localStorage.setItem("products", JSON.stringify(bookMarkContainer));
        bookmarkNameInput.classList.remove("is-valid")
        bookmarkURLInput.classList.remove("is-valid")
        productSearch.classList.remove("d-none");
    }
    else{
        alertInput.classList.remove("d-none")
    }
}
function clearInput() {
    bookmarkNameInput.value = null;
    bookmarkURLInput.value = null;
}
function display() {
    cartona = "";
    for (var i = 0; i < bookMarkContainer.length; i++) {
        cartona += `
        <tr>
            <td class="py-4">${i}</td>
            <td class="py-4">${bookMarkContainer[i].name}</td>
            <td><button onclick="visitLink(${i});" class="btn btn-success px-4 visit-button my-3"><i class="fa-solid fa-eye pe-1"></i> Visit</button></td>
            <td><button onclick="deleteproduct(${i});" class="btn btn-danger px-4 my-3"><i class="fa-solid fa-trash pe-1"></i> Delete</button></td>
            <td><button onclick="setFormForUpdate(${i});" id="btn1" class="btn btn-primary px-4 my-3"><i class="fa-solid fa-pen pe-1"></i> Update</button></td>
        </tr>
        `
    }
    document.getElementById("tableContent").innerHTML = cartona;
}
function deleteproduct(deleteIndex) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            bookMarkContainer.splice(deleteIndex, 1);
            display();
            localStorage.setItem("products", JSON.stringify(bookMarkContainer));
        }
    });
}
var update;
function setFormForUpdate(updateIndex) {
    update = updateIndex;
    bookmarkNameInput.value = bookMarkContainer[updateIndex].name;
    bookmarkURLInput.value = bookMarkContainer[updateIndex].link;
    Button1.classList.add("d-none")
    Button2.classList.remove("d-none")
    bookmarkNameInput.classList.add("is-valid")
        bookmarkURLInput.classList.add("is-valid")
}
function updateproduct() {
    if(
        bookmarkNameInput.classList.contains("is-valid")&&
        bookmarkURLInput.classList.contains("is-valid")
    ){
        bookMarkContainer[update].name = bookmarkNameInput.value;
    bookMarkContainer[update].link = bookmarkURLInput.value;
    Button2.classList.add("d-none")
    Button1.classList.remove("d-none")
    display();
    localStorage.setItem("products", JSON.stringify(bookMarkContainer));
    }
    else{
        alertInput.classList.remove("d-none")
    }
    
}
function visitLink(visit) {
    open(bookMarkContainer[visit].link, "_blank")
}
function validation(ele){
    var regex={
        bookmarkName: /^[a-z0-9_-]{3,15}$/ig,
        bookmarkURL: /(http:\/\/|https:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    }
    if(regex[ele.id].test(ele.value)){
        ele.classList.add("is-valid")
        ele.classList.remove("is-invalid")
        ele.nextElementSibling.classList.add("d-none")
    }
    else{
        ele.classList.add("is-invalid")
        ele.classList.remove("is-valid")
        ele.nextElementSibling.classList.remove("d-none")
    }
}
function searchProduct(){
    var Type=searchProductInput.value;
    cartona="";
    for(var i=0; i<bookMarkContainer.length; i++){
        if(bookMarkContainer[i].name.toLowerCase().includes(Type.toLowerCase())){
            cartona += `
        <tr>
            <td class="py-4">${i}</td>
            <td class="py-4">${bookMarkContainer[i].name}</td>
            <td><button onclick="visitLink(${i});" class="btn btn-success px-4 visit-button my-3"><i class="fa-solid fa-eye pe-1"></i> Visit</button></td>
            <td><button onclick="deleteproduct(${i});" class="btn btn-danger px-4 my-3"><i class="fa-solid fa-trash pe-1"></i> Delete</button></td>
            <td><button onclick="setFormForUpdate(${i});" id="btn1" class="btn btn-primary px-4 my-3"><i class="fa-solid fa-pen pe-1"></i> Update</button></td>
        </tr>
        `
        }
    }
    document.getElementById("tableContent").innerHTML = cartona;
}