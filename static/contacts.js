localStorage;
var logout = document.getElementById("goindex")
var log = document.getElementById("logout")
users = []
users = JSON.parse(localStorage.getItem("myUsers"));
var usersIndex;
last = JSON.parse(localStorage.getItem("lastIndex"));
var wel = document.getElementById("wel");
wel.innerHTML = `Welcome ${users[last].name}`
var inputname = document.getElementById("name");
var inputphone = document.getElementById("phone");
var inputage = document.getElementById("age");
var inputsalary = document.getElementById("salary");
var addbtn = document.getElementById("addbtn");
let nameRejex = /^[A-Z][a-z]{2,20}$/
let ageRejex = /^([1-9]|[1-9][0-9]|100)$/
let phoneRejex = /^(010|012|015|011)[0-9]{8}$/
var salaryRejex = /[1-9][0-9]{2,5}$/
var alerttXt = document.getElementById("alertTxt")
alerttXt.style.color = "red"
var updateIndex;
var contacts;
var inputs = document.getElementsByClassName("form-control");
var check = localStorage.getItem(users[last].mail);
if (check == null) {
    contacts = [];
}
else {
    contacts = JSON.parse(localStorage.getItem(users[last].mail));
    displayContact();
}

function addContact() {
    var Contact =
    {
        name: inputname.value,
        age: inputage.value,
        salary: inputsalary.value,
        phone: inputphone.value
    };
    contacts.push(Contact);
    
    localStorage.setItem(users[last].mail, JSON.stringify(contacts));
}
function editContact(index) {
    contacts[index].name = inputname.value;
    contacts[index].age = inputage.value;
    contacts[index].salary = inputsalary.value;
    contacts[index].phone = inputphone.value;
    localStorage.setItem(users[last].mail, JSON.stringify(contacts))
}


function displayContact() {
    var trs = "";
    for (var i = 0; i < contacts.length; i++) {
        trs += `
     <tr>
     <td>${contacts[i].name}</td>
     <td>${contacts[i].age}</td>
     <td>${contacts[i].salary}</td> 
     <td>${contacts[i].phone}</td>
     <td><button onclick="updateContact(${i})" class="btn text-white bg-warning">Update</button></td>
     <td><button onclick="deleteContact(${i})" class="btn text-white bg-danger">delete</button></td>
     </tr>
     `

    }
    document.getElementById("tableBody").innerHTML = trs
}
function search(searchtext) {
    var trs = "";
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].name.toLowerCase().includes(searchtext.toLowerCase())) {
            trs += `
     <tr>
     <td>${contacts[i].name}</td>
     <td>${contacts[i].age}</td>
     <td>${contacts[i].salary}</td>
     <td>${contacts[i].phone}</td>
     <td><button onclick="updateContact(${i})" class="btn text-white bg-warning">Update</button></td>
     <td><button onclick="deleteContact(${i})" class="btn text-white bg-danger">delete</button></td>
     </tr>
     `
        }
    }
    document.getElementById("tableBody").innerHTML = trs

}
function deleteContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem(users[last].mail, JSON.stringify(contacts));
    displayContact();
}
function updateContact(index) {
    inputname.value = contacts[index].name;
    inputage.value = contacts[index].age;
    inputsalary.value = contacts[index].salary;
    inputphone.value = contacts[index].phone;
    updateIndex = index;
    addbtn.innerHTML = "Edit Contact";
}
function resetform() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = ""
    }
}

function checkContact() {
    if (contacts.length != 0) {
        for (var i = 0; i < contacts.length; i++) {
            if (inputphone.value == contacts[i].phone) {
                return true;
            }
        }
        return false;
    }
}
function checkUpdated() {
    for (var i = 0; i < contacts.length; i++) {
        if (inputphone.value == contacts[i].phone && i != updateIndex) {
            return true
        }
    }
    return false
}
function hide() {
    alerttXt.innerHTML = ""
    alerttXt.style.color = "red"
}
logout.onclick = function () {
    log.setAttribute("href", "index.html")
}
function finish() {
    displayContact();
    resetform();
    setTimeout(hide, 3000)
}
function validateName() {
    if (!nameRejex.test(inputname.value)) {
        return true
    }

}
function validateAge() {
    if (!ageRejex.test(inputage.value)) {
        return true
    }
}

function validateSalary() {
    if (!salaryRejex.test(inputsalary.value)) {
        return true
    }
}
function validatePhone() {
    if (!phoneRejex.test(inputphone.value)) {
        return true
    }

}
function validateTest() {
    if (!validateName() &&
        !validateAge() &&
        !validateSalary() &&
        !validatePhone()) {
        return true
    }
    else {
        return false
    }
}
addbtn.onclick = function () {
    if (validateTest()) {
        if (addbtn.innerHTML == "add Contact") {
            if (!checkContact()) {
                addContact();
                alerttXt.style.color = "green"
                alerttXt.innerHTML = "Success!"
                finish()
            }

            else {
                alerttXt.innerHTML = "Phone number already exists"
            }
        }
        if (addbtn.innerHTML == "Edit Contact") {
            if (!checkUpdated()) {
                editContact(updateIndex);
                addbtn.innerHTML = "add Contact";
                alerttXt.style.color = "green"
                alerttXt.innerHTML = "Success!"
                finish()
            }
            else {
                alerttXt.innerHTML = "Phone number already exists"
            }
        }

    }
    else {
        alerttXt.style.color = "red"
        if (inputname.value == "" || inputage.value == "" || inputsalary == "" || inputphone == "") {
            alerttXt.innerHTML = "All inputs are reqiured"
        }
        else if (validateName()) {
            alerttXt.innerHTML = "Incorrect Name,chars only and Should start with one capital letter"
        }
        else if (validateAge()) {
            alerttXt.innerHTML = "Incorrect Age"
        }
        else if (validateSalary()) {
            alerttXt.innerHTML = "Incorrect Salary, at least three numbers"
        }
        else if (validatePhone()) {
            alerttXt.innerHTML = "Incorrect egyptian phone number"
        }
    }
}