const submit = document.querySelector(".send");
const email = document.querySelector(".email");
const message = document.querySelector(".message");
const Name = document.querySelector(".name");

window.onload = function () {
    window.scrollTo(0, 0);  // Scroll to top of the page
};

function Menu(e) {
    let list = document.querySelector('ul');
    e.name === 'menu' ? (e.name = "close", list.classList.add('top-[80px]'), list.classList.add('opacity-100')) : (e.name = "menu", list.classList.remove('top-[80px]'), list.classList.remove('opacity-100'))
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

const sendEmail = () => {
    Email.send({
        SecureToken: "YOUR_SECURE_TOKEN",
        Host: "smtp.elasticemail.com",
        Username: "amantatla312@gmail.com",
        Password: "YOUR_PASSWORD",
        To: 'amantatla312@gmail.com',
        From: email.value,
        Subject: "Email from Portfolio",
        Body: message.value
    }).then(
        message => alert(message)
    );
    reset()
}

const reset = () => {
    Name.value = ''
    email.value = ''
    message.value = ''
}

submit.addEventListener("click", sendEmail)
