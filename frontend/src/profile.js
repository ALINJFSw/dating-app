const save = document.getElementById('save');
// save.addEventListener('click', () => {
//     console.log('click');
// })

// save.addEventListener("click",()=> {
//     Work_place.editProfile()
// })

const token = localStorage.getItem("token");
const profile = document.getElementById("profile");
const img1 = document.getElementById("image1")
const img2 = document.getElementById("image2")
const img3 = document.getElementById("image3")
const profile_input = document.getElementById("img-profile")
const input1 = document.getElementById("img1")
const input2 = document.getElementById("img2")
const input3 = document.getElementById("img3")
const formData = new FormData()
profile_input.addEventListener("change",(e)=>{
// const fileReader = new FileReader()
// fileReader.addEventListener("load",()=>{
//     formData.append("profile_image",fileReader.result)
// })
// fileReader.readAsDataURL(e.target.files[0]);
// console.log(fileReader);
formData.append("profile_image",event.target.files[0]);


})
save.addEventListener("click",async ()=> {
    formData.append("name","alinj")
    console.log(formData);
    const response = await Work_place.postData("http://127.0.0.1:8000/api/update-user",formData, {
headers: {
  Authorization: "Bearer " + token,
  enctype:"multipart/form-data"

},
})
console.log(response);
})
