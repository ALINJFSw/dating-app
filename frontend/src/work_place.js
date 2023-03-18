const Work_place =  {};
Work_place.showNav = false;
Work_place.showPhoneNav = () => {
    const Phonenav = document.getElementById("phoneNav");
    if (Work_place.showNav == false) {
        Phonenav.style.display = "block";
        Work_place.showNav = true;
    }
    else {
        Phonenav.style.display = "none";
        Work_place.showNav = false;

    }
}