const listProductItem = document.querySelector(".product__item"),
  productCart = document.querySelector(".product__cart"),
  listCartInfo = document.querySelector(".product__cart-info"),
  emptyCart = document.querySelector(".product__cart-empty"),
  orderDiv = document.querySelector(".product__cart-order"),
  totalPrice = document.querySelector(".total"),
  modalTotal = document.querySelector(".modal__total"),
  modalProduct = document.querySelector(".modal__product"),
  confirmBtn = document.querySelector(".product__cart-order-btn"),
  modal = document.querySelector(".modal"),
  startNewOrderButton = document.querySelector(".start__button");

const initApp = () => {
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      listProduct = data;
      showProduct();
    });
};

initApp();

let listProduct = [];
let carts = [];
orderDiv.style.display = "none";

function showProduct() {
  listProduct.forEach(({ image, name, category, price, id }, key) => {
    let newProduct = document.createElement("div");
    newProduct.classList.add("product__item-child");
    newProduct.dataset.id = id;
    newProduct.innerHTML = `
            <div class="product__item-child-pic">
              <img
                class="product__item-child-img"
                src=${image}
                alt=${category}
              />
            </div>
            <button onclick="addToCard(${id} , ${key})" class="product__item-child-button">
              <img src="assets/images/icon-add-to-cart.svg" alt="" /> Add to Cart
            </button>
            <div class="product__item-child-info">
              <p>${category}</p>
              <h1>${name}</h1>
              <span>$${price}</span>
            </div>
        `;
    listProductItem.appendChild(newProduct);
  });
}

let addToCartEnabled = true;

function addToCard(id, key) {
  let item = carts.filter((item) => item.id === id);

  if (item.length == 0) {
    carts.push({
      ...listProduct[key],
      quantity: 1,
    });
  }
  orderDiv.style.display = "flex";
  showItems();
}

function removeItem(key, id) {

  const remove = carts.filter((item) => item.id !== id);

  carts = remove;

  showItems();
}

function showItems() {
  if (carts.length !== 0) {
    let price = 0;
    let quantityPrice = 0;
    listCartInfo.innerHTML = `
             
        `;
    carts.map((item, key) => {
      let newCart = document.createElement("div");
      newCart.classList.add("product__cart-child");
      quantityPrice += item.price * item.quantity;
      price += item.price;
      totalPrice.innerHTML = `
      $${quantityPrice}
      `;
      newCart.innerHTML = `
        
            
              <div class="child__info">
                <h4>${item.name}</h4>
                <div class="child-info">
                  <p>${item.quantity}x</p>
                  <span>@ $${item.price}</span>
                  <p class="total-price">$${item.price * item.quantity}</p>
                </div>
              </div>
              <div class="child-btns">
                <button onclick="decrement(${item.id})">-</button>
                <button onclick="increment(${item.id})">+</button>
              </div>
              <button onclick="removeItem(${key}, ${item.id})" class="child-img"
                ><img src="assets/images/icon-remove-item.svg" alt=""
              /></button>
            


        `;

      listCartInfo.appendChild(newCart);
      emptyCart.style.display = "none";
    });
  }
}

function increment(id) {
  const meals = carts.map((item) => {
    if (item.id == id) {
      return {
        ...item,
        quantity: item.quantity + 1,
      };
    } else {
      return item;
    }
  });

  carts = meals;
 showItems()
  
}
function decrement(id) {
  const product = carts.find((item) => item.id === id);

  if (product.quantity === 1) {
    const remove = carts.filter((item) => item.id !== id);

  carts = remove;

  showItems();
  } else {
    const meal = carts.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      } else {
        return item;
      }
    });

    carts = meal;
  }
  showItems()
}

confirmBtn.addEventListener("click", () => {
  if (carts.length !== 0) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    showOrder();
  }else{
    alert("Cart empty")
  }
});
startNewOrderButton.addEventListener("click", () => {
  location.reload();
});
function showOrder() {
  let modalPrice = 0;
  carts.map((item) => {
    let newOrder = document.createElement("div");
    newOrder.classList.add("modal__cart");

    modalPrice += item.price * item.quantity;

    modalTotal.innerHTML = `
      $${modalPrice}
      `;
    newOrder.innerHTML = `

      
      <div class="modal__child-info">
          <img
            class="modal-img"
            src=${item.image}
            alt=${item.category}
          />
        
        <div class="child-class">
          <h4>${item.name}</h4>
          <div class="info">
            <p>${item.quantity}x</p>
            <span>@ $${item.price}</span>
          </div>
        </div>
        
      </div>
      <p class="modal__total-price">$${item.price * item.quantity}</p>
    
`;
    modalProduct.appendChild(newOrder);
  });
}
