"sue strict";

const elForm = document.querySelector(".form");
const elLogin = document.querySelector(".login-input");
const elPassword = document.querySelector(".password-input");
const elResult = document.querySelector(".result")

elForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const loginValue = elLogin.value;
    const passwordValue = elPassword.value;

    elLogin.value = null;
    elPassword.value = null

    if(loginValue === "najottalim"){
        window.location.replace("index2.html");
    } else if(passwordValue === 123456789){
        window.location.replace("index2.html");
    } else {
        elResult.textContent = "Iltimos parol yoki usernamingizni tekshirib ko'ring"
    }

    elResult.setAttribute("class", "text-danger")

})
