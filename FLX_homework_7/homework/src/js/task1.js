let login = prompt("Enter your login", "");
if ((login === null) || (login === "")) {
    alert("Canceled");
} else if (login.length < 4) {
    alert("I don't know any users having name length less than 4 symbols");
} else if ((login === "User") || (login === "Admin")) {
    let password = prompt("Enter your password", "");
    if ((password === null) || (password === "")) {
        alert("Canceled");
    } else if (((login === "User") && (password === "UserPass")) || ((login === "Admin") && (password === "RootPass"))){
        let currentHours = new Date().getHours();
        if (currentHours < 20) {
            alert(`Good day, dear ${login}!`);
        } else {
            alert(`Good evening, dear ${login}!`);
        }
    } else {
        alert("Wrong password");
    }
} else {
    alert("I don't know you");
}