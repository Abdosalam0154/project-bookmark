var bookMarkNameInput = document.getElementById("bookmarkName");
var bookMarkURLInput = document.getElementById("bookmarkURL");
var bookMarkContainer;
var buttonUpdate = document.getElementById("btn1");
var buttonDone = document.getElementById("btn2");
var alertInput = document.getElementById("alert");

if (localStorage.getItem("products") !== null) {
    bookMarkContainer = JSON.parse(localStorage.getItem("products"));
    display();
}else{
    bookMarkContainer = [];
}

function addProduct() {

    if (
        bookMarkNameInput.classList.contains('is-valid') &&
        bookMarkURLInput.classList.contains('is-valid')
    ) {
        var product = {
            name: bookMarkNameInput.value,
            link: bookMarkURLInput.value,
        }
        bookMarkContainer.push(product);
        localStorage.setItem("products", JSON.stringify(bookMarkContainer));
        display();
        clearForm();
        bookMarkNameInput.classList.remove('is-valid')
        bookMarkURLInput.classList.remove('is-valid')
    }

    else {
        alertInput.classList.remove("d-none")


    }

}
function clearForm() {
    bookMarkNameInput.value = null;
    bookMarkURLInput.value = null;
}

function display() {
    cartona = "";
    for (var i = 1; i < bookMarkContainer.length; i++) {
        cartona += `
        <tr>
                    <td>${i}</td>
                    <td>${bookMarkContainer[i].name}</td>
                    <td><button onclick="visit(${i})" class="btn btn-success px-4 visit-button my-3"><i class="fa-solid fa-eye pe-1"></i> Visit</button></td>
                    <td><button onclick="deleteProduct(${i});" class="btn btn-danger px-4 my-3"><i class="fa-solid fa-trash pe-1"></i> Delete</button></td>
                    <td>
                    <button onclick="setFormForUpdate(${i})" id="btn1" class="btn btn-primary px-4 my-3"><i class="fa-solid fa-pen pe-1"></i> Update</button>
                    <button onclick="updateProduct(${i})" id="btn2" class="btn btn-warning px-4 my-3">Done</button>
                    </td>
                </tr>`
    }
    document.getElementById("tableContent").innerHTML = cartona;
}

function deleteProduct(deleteIndex) {



    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success mx-2",
            cancelButton: "btn btn-danger mx-2"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            bookMarkContainer.splice(deleteIndex, 1);
            display();
            localStorage.setItem("products", JSON.stringify(bookMarkContainer));
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
}
var updateIndex;
function setFormForUpdate(update) {
    updateIndex = update
    bookMarkNameInput.value = bookMarkContainer[update].name
    bookMarkURLInput.value = bookMarkContainer[update].link
    bookMarkNameInput.classList.add('is-valid')
    bookMarkURLInput.classList.add('is-valid')
}

function updateProduct(update) {


    if (
        bookMarkNameInput.classList.contains('is-valid') &&
        bookMarkURLInput.classList.contains('is-valid')
    ) {
        bookMarkContainer[updateIndex].name = bookMarkNameInput.value;
        bookMarkContainer[updateIndex].link = bookMarkURLInput.value;
        display();
        localStorage.setItem("products", JSON.stringify(bookMarkContainer));
        clearForm();
    }
    else{
        alertInput.classList.remove("d-none")
    }
    
}


function visit(i    ) {
    window.open(bookMarkContainer[i].link, '_blank');

}


function validation(ele) {
    var regex = {
        bookmarkName: /^[a-z0-9_-]{3,15}$/ig,
        bookmarkURL: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    }

    if (regex[ele.id].test(ele.value)) {
        ele.classList.remove('is-invalid')
        ele.classList.add('is-valid')

        ele.nextElementSibling.classList.add("d-none")
    }
    else {
        ele.classList.remove('is-valid')
        ele.classList.add('is-invalid')
        ele.nextElementSibling.classList.remove("d-none")
    }
    
}
