const collection = document.querySelector(".navbar__collection")

function navbarToggle(){
    collection.classList.toggle("show")
}


const wrapper = document.querySelector(".procuts__wrapper")
const moreBtn = document.querySelector(".products__button button")
const category = document.querySelector(".category__collection")
const loading = document.querySelector(".loading")

const BASE__URL = "https://fakestoreapi.com"
let limitCount = 8
let offset = 1

async function getData(endpoint, count){
    const response =  await fetch(`${BASE__URL}/${endpoint}/?limit=${limitCount * count}`)
    response
        .json()
        .then(res => createProduct(res))
        .catch(err => console.log(err))
        .finally(()=> loading.style.display = "none")
}
getData("products", offset)

function createProduct(data){
    while(wrapper.firstChild){
        wrapper.firstChild.remove()
    }
    data.forEach(product => {
        const card = document.createElement("div")
        card.className ="products__card"
        card.dataset.id = product.id
        card.innerHTML = `
        <div class="products__img">
                            <img src=${product.image} alt="" class="product__photo">
                            <div class="products__icons">
                                <a href="#"><i class="fa-regular fa-heart"></i></a>
                                <a href="#"><i class="fa-regular fa-eye"></i></a>
                            </div>
                        </div>
                        <div class="products__text">
                            <p class="products__text__title">${product.title}</p>
                            <div class="products__bottom">
                                <p>${product.price} $</p>
                                <div class="products__star">
                                ${`<i class="fa-solid fa-star"></i>`.repeat(product.rating.rate)}
                                ${`<i class="fa-regular fa-star"></i>`.repeat(5-product.rating.rate)}
                                </div>
                                <span>(${product.rating.count})</span>
                            </div>
                        </div>
        `
        wrapper.appendChild(card)
    });
}



async function getCategory(endpoint){
    const response = await fetch(`${BASE__URL}/${endpoint}`)
    response
        .json()
        .then(res => createCategory(res))
        .catch(err => console.log(err))
        .finally(()=> loading.style.display = "none")
}
getCategory("products/categories")

let categoryType = `products`
function createCategory(data){
    data.forEach(item => {
        const li = document.createElement("li")
        const dataval = document.createElement("data")
        li.className = "category__item"
        dataval.innerHTML = item
        dataval.setAttribute("value", `/category/${item}`)
        dataval.addEventListener("click", e => {
            categoryType = `products` + e.target.value
            offset = 1
            getData(categoryType, offset)
            loading.style.display = "flex";
        })
        li.appendChild(dataval)
        category.appendChild(li)
    })
}

moreBtn.addEventListener("click", ()=>{
    offset++
    getData(categoryType, offset);
})



wrapper.addEventListener("click", i=>{
    if(i.target.className === "product__photo" || i.target.className === "products__text__title"){
        let id = i.target.closest(".products__card").dataset.id;
        open(`/pages/detail/detail.html?q=${id}`, `_self`)
    }
})

// wrapper.addEventListener("click", (event)=>{
//     if(event.target.className === "product__photo" || event.target.className === "products__text__title"){
//         let id = event.target.closest("products__card").dataset.id;
//         open(`/pages/detail/detail.html?q=${id}`, `_self`)
//     }
// })