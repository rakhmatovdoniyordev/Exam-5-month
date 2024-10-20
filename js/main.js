const collection = document.querySelector(".navbar__collection")
const inputs = document.querySelectorAll(".register__inp")
const form = document.querySelector(".form")
const inpUsername = document.querySelector(".form input[type=text]")
const inpPassword = document.querySelector(".form input[type=password]")
const loading = document.querySelector(".loading")

const BASE__URL = "https://fakestoreapi.com"

form.addEventListener("submit", e =>{
    e.preventDefault()
    let user = {
        username: inpUsername.value,
        password: inpPassword.value
    }
    fetch(`${BASE__URL}/auth/login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(res => {
        if(res.ok){
            return res.json()
        }
        throw Error("username or password is incorrect")
    })
    .then(res => {
        console.log({res});
        localStorage.setItem("accessToken", res.token)
        open("/pages/home/home.html","_self")
    })
    .catch(err => {
        console.log(err);
        alert(err.message)
    })
    .finally(()=> {
        loading.style.display = "none"
    })
})


inputs.forEach(element => {
    element.addEventListener("click", ()=> {
        inputs.forEach(inp => inp.classList.remove("active"))
        element.classList.add("active")
    });
});
function navbarToggle(){
    collection.classList.toggle("show")
}