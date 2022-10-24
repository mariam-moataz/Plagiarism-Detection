var inputname = document.getElementById("name");
var inputmail = document.getElementById("mail");
var inputpass = document.getElementById("pass");
var inputrepass = document.getElementById("repass");
var Sysbtn = document.getElementById("logSys")
var txt = document.getElementById("tXt");
var welink = document.getElementById("wellink");
var logout = document.getElementById("logout");
var gosign = document.getElementById("gosign");
let nameRejex = /[A-Za-z]{2,20}$/
let mailRejex = /[@]{1}[a-z0-9]{2,}[.][a-z]{2,}/
let pass_phase1Rejex = /[a-zA-Z]+[0-9]+/
let pass_phase2Rejex = /[a-zA-Z0-9]{8,}/
var currentUser;
var users;
localStorage;
var inputs = document.getElementsByClassName("form-control");
var check = localStorage.getItem("myUsers");
function validateName() {
    if (!nameRejex.test(inputname.value)) {
        return true
    }

    else {
        return false
    }
}
function validateMail() {
    if (!mailRejex.test(inputmail.value)) {
        return true
    }

    else {
        return false
    }
}
function validatePass() {

    if (!pass_phase1Rejex.test(inputpass.value)) {
        return true
    }

    else if (pass_phase1Rejex.test(inputpass.value)) {
        if (pass_phase2Rejex.test(inputpass.value)) {
            return false

        }
        else {
            return true
        }
    }
}
function validateRepass() {
    if (inputpass.value == inputrepass.value && inputrepass.value != "" && validatePass() == false) {
        return false
    }

    else {
        return true

    }
}
function resetform() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = ""
    }
}
if (check == null) {
    users = [];
}
else {
    users = JSON.parse(localStorage.getItem("myUsers"));
}
Sysbtn.onclick = function () {

    if (Sysbtn.innerHTML == "Login") {
        var checked = checkUser();
        if (checked == true) {
            welink.setAttribute("href", "Plagiarism-check.html")
        }
        else if (inputmail.value == "" || inputpass.value == "") {
            tXt.innerHTML = "All inputs are reqiured"
        }
        else {
            tXt.innerHTML = "incorrect email or password"
        }
    }
    else if (Sysbtn.innerHTML == "Sign Up") {
        if (!validateName() && !validateMail() && !validatePass() && !validateRepass()) {
            var checkAcc = checkUser()
            if (checkAcc == true) {
                tXt.innerHTML = "Account already exists"
            }
            else {
                addUser();
                txt.style.color = "green"
                tXt.innerHTML = "Success!"
                resetform()
            }



        }
        else {
            txt.style.color = "red"
            if (inputmail.value == "" || inputname.value == "" || inputpass.value == "" || inputrepass == "") {
                tXt.innerHTML = "All inputs are reqiured"
            }
            else if (validateName()) {
                tXt.innerHTML = "Incorrect Name, Should include at least two character"
            }
            else if (validateMail()) {
                tXt.innerHTML = "Incorrect mail"
            }
            else if (validatePass()) {
                tXt.innerHTML = "Incorrect password, Minimum eight characters, at least one letter and one number "
            }
            else if (validateRepass()) {
                tXt.innerHTML = "Repassword and password not the same"
            }
        }
    }

}

function checkUser() {
    
    if (users.length != 0) {
        for (var i = 0; i < users.length; i++) {
            if (inputmail.value == users[i].mail && inputpass.value == users[i].pass) {
                localStorage.setItem("lastIndex", i);

                return true;
            }
        }
        return false;
    }
}

function addUser() {
    var user =
    {
        name: inputname.value,
        mail: inputmail.value,
        pass: inputpass.value,
    };
    users.push(user);
    localStorage.setItem("myUsers", JSON.stringify(users));
}