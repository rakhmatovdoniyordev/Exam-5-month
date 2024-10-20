const wrapper = document.querySelector(".detail__wrapper");
const loading = document.querySelector(".loading");

const BASE__URL = "https://fakestoreapi.com";

async function getData() {
    let query = new URLSearchParams(window.location.search);
    let id = query.get("q");
    try {
        const response = await fetch(`${BASE__URL}/products/${id}`);
        const data = await response.json();
        createContent(data);
    } catch (err) {
        console.error(err);
    } finally {
        loading.style.display = "none";
    }
}

function createContent(data) {
    console.log(data);
    wrapper.innerHTML = `
        <div class="breadcrumb">
            <a href="#" class="breadcrumb__link">Account</a> /
            <a href="#" class="breadcrumb__link">Gaming</a> /
            <span class="breadcrumb__current">${data.title}</span>
        </div>
        <div class="product">
        <div class="product__gallery">
        <div class="product__thumbnails">
        <img class="product__thumbnail" src="${data.image}" alt="Thumbnail 1">
        </div>
        </div>
        <div class="product__main-image">
            <img src="${data.image}" alt="Main Product Image">
        </div>
            <div class="product__details">
                <h1 class="product__title">${data.title}</h1>
                <div class="product__rating">
                    ${`<i class="fa-solid fa-star"></i>`.repeat(Math.floor(data.rating.rate))}
                    ${`<i class="fa-regular fa-star"></i>`.repeat(5 - Math.floor(data.rating.rate))} (${data.rating.count} Reviews) | <span class="product__status">In Stock</span>
                </div>
                <div class="product__price">$${data.price}</div>
                <p class="product__description">
                    ${data.description}
                </p>
                <div class="product__options">
                    <div class="product__colors">
                        <h4 style="padding: 5px; margin-left: 13px;">Colours:</h4>
                        <div class="checkbox-wrapper-63">
                            <label class="switch">
                              <input type="checkbox">
                              <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                    <div class="product__sizes">
                        <label class="product__label">Size:</label>
                        <button class="product__size">XS</button>
                        <button class="product__size">S</button>
                        <button class="product__size">M</button>
                        <button class="product__size">L</button>
                        <button class="product__size">XL</button>
                    </div>
                    <div class="product__quantity">
                        <div class="product__inp">
                            <button class="product__quantity-btn">-</button>
                            <input class="product__quantity-input" type="number" value="2" min="1">
                            <button class="product__quantity-btn">+</button>
                        </div>
                        <button class="product__buy-now">Buy Now</button>
                        <a href="#" class="product__like"><i class="fa-regular fa-heart"></i></a>
                    </div>
                </div>
                <div class="product__delivery-info">
                    <div class="product__delivery">
                        <img src="../../assets/icon-delivery.png" alt="">
                        <p class="product__delivery-text"><span>Free Delivery</span> Enter your postal code for Delivery Availability</p>
                    </div>
                    <div class="product__return">
                        <img src="../../assets/Icon-return.png" alt="">
                        <p class="product__return-text"><span>Return Delivery</span> Free 30 Days Delivery Returns. <a href="#" class="product__link">Details</a></p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.addEventListener("DOMContentLoaded", getData);
