window.onload = async() =>{
    if(!localStorage.getItem("token")){
        window.location.href = "./index.html"
    }
    await Work_place.getNotifications();
}
