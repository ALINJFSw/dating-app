window.onload = ()=> {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html"
    }
    const send = document.getElementById("send");
    send.addEventListener("click", ()=>Work_place.send_message());
}