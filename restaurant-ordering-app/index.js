import { menuArray } from "./data.js";

let cartArray = []

const itemsSection = document.querySelector(".items-section")
const cartContent = document.querySelector(".cart-content")
const paymentModal = document.querySelector(".payment-modal")

document.addEventListener("click", (e) => {
    if (e.target.id === "add-to-cart-btn") {
        addToCart(e.target.dataset.btnId)
    } else if (e.target.id === "remove-btn") {
        removeBtn(e.target.dataset.removeBtn)
    } else if (e.target.id === "order-btn") {
        orderBtn()
    } else if(e.target.id === "new-order-btn"){
        newOrderBtn()
    }
})

document.addEventListener("submit", function(e){
    e.preventDefault()

    const clientName = new FormData(document.getElementById('payment-form')).get("client-name")
    
    cartContent.innerHTML = `
        <div class="order-complete">
            <p class="message">Thanks, ${clientName}! Your order is on its way!</p>
        </div>
        <button class="new-order-btn" id="new-order-btn">Start a new order</button>
    `
    
    document.getElementById('client-name').value = ""
    document.getElementById('card-number').value = ""
    document.getElementById('card-cvv').value = ""
    cartArray = []
    paymentModal.style.display = "none"

})

const addToCart = (cartItemId) => {
    const itemsArray = [...menuArray]
    const targetListItems = itemsArray.filter(item => {
        return item.id === parseInt(cartItemId, 10)
    })[0]

    cartArray.unshift(
        {name: `${targetListItems.name}`,
        price: `${targetListItems.price}`,
        id: `${cartArray.length}`}
    )

    if (cartArray) {
        cartContent.innerHTML = 
        `
        <p class="order-title">Your order</p>
        <div class="order-area" id="order-area">              
        </div>
        <hr class="checkout-divider">
        <div class="order-total" id="order-total">
            <p class="total-price">Total price:</p>
            <p class="order-item-price" id="total-price"></p>
        </div>
        <button class="order-btn" id="order-btn">Complete order</button>
        ` 
    }
    
    getItems()
}

const getItems = () => {
    let orderHtml = ""
    let totalPrice = 0

    cartArray.forEach(function(item){
        cartContent.style.display = "block"
        orderHtml +=
        `<div class="order-item-container" id="order-item-container">
                <h2 class="order-item">${item.name}</h2>
                <button 
                    class="remove-btn" 
                    id="remove-btn" 
                    data-remove-btn="${item.id}">
                    remove
                </button>
                <p class="order-item-price" id="order-item-price">\$${item.price}</p>
            </div>`
        
         totalPrice += parseInt(item.price, 10)   
         document.getElementById("total-price").textContent = `\$${totalPrice}`
    })
    
    document.getElementById("order-area").innerHTML = orderHtml
}

const removeBtn = (removeBtnId) => {
    if (cartArray.length === 1) {
        cartArray = []
        cartContent.style.display = "none"
        paymentModal.style.display = "none"
    } else {
        cartArray = cartArray.filter(item => {
            return item.id != removeBtnId 
        })
    }
    getItems()
}

const orderBtn = () => {
    let modal = `
    <h2 class="form-title">Enter card details</h2>
    <form id="payment-form">
        <input 
        type="text"
        id="client-name"
        name="client-name"
        placeholder="Enter your name"
        aria-label="Enter name"
        required
        >
        
        <input 
        type="text"
        id="card-number"
        name="card-number"
        inputmode="numeric"
        pattern="[0-9]*"
        maxlength="16"
        placeholder="Enter card number"
        aria-label="Enter card number"
        required
        >
        
        <input 
        type="text"
        id="card-cvv"
        name="card-cvv"
        inputmode="numeric"
        pattern="[0-9]*"
        maxlength="3"
        placeholder="Enter CVV"
        aria-label="Enter CVV"
        required
        >
        
        <button class="submit-btn" type="submit">Pay</button>
    </form>
    `
    paymentModal.innerHTML = modal
    paymentModal.style.display = "block"
}

const newOrderBtn = () => {
    cartContent.style.display = "none"
} 

const renderItems = () => {
    let items = ''
    const itemsArray = [...menuArray]

    itemsArray.forEach((item) => {
        items += `
        <div class="item">
            <div class="item-img">
                <p class="item-emoji">${item.emoji}</p>
            </div>
            <div class="item-content">
                <h3 class="item-title">${item.name}</h3>
                <p class="item-description">ingredients: ${item.ingredients}</p>
                <p class="item-price">${item.price}€</p>
            </div>
            <div class="item-btn">
                <button class="btn add-to-cart-btn" id="add-to-cart-btn" data-btn-id="${item.id}">
                    +
                </button>
            </div>
        </div>
        `
    });

    itemsSection.innerHTML = items
}

const render = () => {
    renderItems()
}

render()

