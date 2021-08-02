let inputEmail = document.getElementById("emailSign");
let inputPass = document.getElementById("passSign");
let inputConfirm = document.getElementById("confirm");
let inputUser = document.getElementById("username");
let demo = document.getElementById("demo");
let warn = document.getElementsByClassName("warning")[0];
let usedMail;
let usedName;
let confirmPass;
let passIsWrong = true;
let emailIsWrong = true;
let stuff = JSON.parse(localStorage.getItem('Stuff'));
let errorMessage = '';
let errorMes = false;
let validMail, validPass, validName;

//Enter
$(document).ready(function () {
    $(document).keypress(function ($event) {
        if ($event.keyCode == 13) {
            document.getElementById("myBtn").click();
            $event.preventDefault();
        }
    });
});


//SignUp
function store() {
    usedMail = emailIsAlreadyUsed();
    stuff = JSON.parse(localStorage.getItem('Stuff'));
    validMail = validateEmail(inputEmail.value);
    validPass = validatePass(inputPass.value);
    validName = validateName(inputUser.value);
    confirmPass = pass(inputConfirm.value, inputPass.value);
    usedName = nameIsAlreadyUsed();
    if (validMail === true && validPass === true && validName === true && usedMail === false && confirmPass === true && usedName === false) {
        if (stuff) {
            warn.classList.remove("demoStyle");
            stuff.push.apply(stuff, [{ "username": inputUser.value, "mail": inputEmail.value, "password": inputPass.value }]);
            localStorage.setItem('Stuff', JSON.stringify(stuff));
            window.location.replace("index.html");
        } else {
            warn.classList.remove("demoStyle");
            localStorage.setItem('Stuff', JSON.stringify([{ "username": inputUser.value, "mail": inputEmail.value, "password": inputPass.value }]));
            window.location.replace("index.html");
        }
    }

    if (validName === false) {
        errorMessage = "Invalid username (It must be between 8 and 20 characters long and must start with alphabets)";
        errorMes = true;
        inputUser.classList.add("error");
    } else if (usedName === true) {
        errorMessage = "This username is already taken";
        errorMes = true;
        inputUser.classList.add("error");
    } else {
        inputUser.classList.remove("error");
    }

    if (validMail === false) {
        if (errorMessage) {
            errorMessage += "<br>" + "Invalid Email";
        } else {
            errorMessage = "Invalid Email ";
        }
        errorMes = true;
        inputEmail.classList.add("error");
    } else if (usedMail === true) {
        if (errorMessage) {
            errorMessage += "<br>" + "This email is already taken";
        } else {
            errorMessage = "This email is already taken";
        }
        errorMes = true;
        inputEmail.classList.add("error");
    } else {
        inputEmail.classList.remove("error");
    }

    if (validPass === false) {
        if (errorMessage) {
            errorMessage += "<br>" + "Your password must contain at least 8 characters, including uppercase, lowercase letters and numbers";
        } else {
            errorMessage = "Your password must contain at least 8 characters, including uppercase, lowercase letters and numbers";

        }
        errorMes = true;
        inputPass.classList.add("error");
    } else {
        inputPass.classList.remove("error");
    }

    if (confirmPass === false) {
        if (errorMessage) {
            errorMessage += "<br>" + "Please make sure your passwords match";
        } else {
            errorMessage = "Please make sure your passwords match";
        }
        errorMes = true;
        inputConfirm.classList.add("error");
    } else {
        inputConfirm.classList.remove("error");
    }
    if (errorMes) {
        warn.classList.add("demoStyle");
        demo.innerHTML = errorMessage;
        errorMessage = '';
    }
    if (!inputEmail && !inputPass && !inputConfirm && !inputUser) {
        button.disabled = true;
    }
}
//Validation
function validateEmail(mail) {
        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/.test(mail)) {
        return (true)
    }
    return (false)
}

function validatePass(pass) {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(pass)) {
        return true;
    }
    return false;
}
function validateName(uname) {
    if (/^(?=.{8,20}$)[a-zA-Z]([._-]?[a-zA-Z0-9]+)*$/.test(uname)) {
        return true;
    }
    return false;

}
//ConfirmPass and Used
function pass(pass1, pass2) {
    if (pass1 === pass2) {
        return true;
    }
    return false;
}
function emailIsAlreadyUsed() {
    if (!stuff) {
        return false;
    }
    for (let i = 0; i < stuff.length; i++) {
        if (stuff[i].mail === inputEmail.value) {
            return true;
        }
    }
    return false;
}
function nameIsAlreadyUsed() {
    if (!stuff) {
        return false;
    }
    for (let i = 0; i < stuff.length; i++) {
        if (stuff[i].username === inputUser.value) {
            return true;
        }
    }
    return false;
}
//SignIn
function signIn() {
    if (inputPass.value.length === 0) {
        errorMessage = "Please fill in all the required fields";
        errorMes = true;
        inputPass.classList.add("error");
    } else {
        inputPass.classList.remove("error");
    }
    if (inputEmail.value.length === 0) {
        errorMessage = "Please fill in all the required fields";
        errorMes = true;
        inputEmail.classList.add("error");
    } else {
        inputEmail.classList.remove("error");
    }


    if (stuff && errorMes === false) {
        for (let i = 0; i < stuff.length; i++) {
            if (stuff[i].mail === inputEmail.value) {
                emailIsWrong = false;
                if (stuff[i].password === inputPass.value) {
                    alert("Welcome");
                    window.location.assign("index.html");
                    return;
                }
            }
        }
    }
    if ((emailIsWrong === true || passIsWrong === true) && errorMes === false) {
        errorMes = true;
        inputPass.classList.add("error");
        inputEmail.classList.add("error");
        errorMessage = "The entered email and password do not match those, stored in our database. Check the correctness of the entered data and try again.";
    } else if (emailIsWrong === false && passIsWrong === false) {
        inputPass.classList.remove("error");
        inputEmail.classList.remove("error");
    }
    if (errorMes) {
        errorMes = false;
        warn.classList.add("demoStyle");
        demo.innerHTML = errorMessage;
        errorMessage = '';
    }
}
//Linking to another page 
function displaySignUp() {
    window.location.assign("index2.html");
}

function displaySignIn() {
    window.location.assign("index.html");
}

