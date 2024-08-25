const listProductItem = document.querySelector(".product__item"),
  listCartItem = document.querySelector(".product__cart-items"),
  listCartInfo = document.querySelector(".product__cart-info"),
  emptyCart = document.querySelector(".product__cart-empty"),
  total = document.querySelector(".total"),
  count = document.querySelector(".count");

const initApp = () => {
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      listProduct = data;
      addDataToList();
    });
};

initApp();

let listProduct = [];
let carts = [];
let counts = 1

listCartItem.style.display = "none";

const addDataToList = () => {
  listProductItem.innerHTML = ``;
  if (listProduct.length > 0) {
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
            <button onclick="addToCart(${id})" class="product__item-child-button">
                <img src="assets/images/icon-add-to-cart.svg" alt="" />
                Add to Cart
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
};

listProductItem.addEventListener("click", (event) => {
  let positionClick = event.target;

  
  if (positionClick.classList.contains("product__item-child-button")) {
    let product_id = positionClick.parentElement.dataset.id;

    positionClick.innerHTML = `
      
     
      <button onclick="decrement(${product_id})" class="active-btn">  
        <i class="fa-solid fa-minus"></i>
      </button>
      <h5>${counts}</h5>
      <button onclick='increment(${product_id})' class="active-btn"><i class="fa-solid fa-plus"></i></button>
     

      `;

    positionClick.classList.add("active-button");
    addToCart(product_id);
  }
});

const increment = (id) => {
  let items = carts.findIndex(item => item.product__id == id)

  if(items !== -1){
    carts[items].quantity += 1
  }
}
  
  
  


const addToCart = (product__id) => {
  let itemIndex = carts.findIndex((item) => item.product__id === product__id);
  

  if (itemIndex !== -1) {
    carts[itemIndex].quantity += 1;
    
  } else {
    carts.push({
      product__id: product__id,
      quantity: 1,
    });
  }

  listCartItem.style.display = "flex";
  emptyCart.style.display = "none";
  console.log(carts);

  addCart();
};

const addCart = () => {
  if (carts.length > 0) {
    carts.forEach((item) => {
      listCartInfo.innerHTML = `
             
        `;

      let newCart = document.createElement("div");
      newCart.classList.add("product__cart-child");
      let positionProduct = listProduct.findIndex(
        (value) => value.id == item.product__id
      );
      let info = listProduct[positionProduct];
      counts = item.quantity
      newCart.innerHTML = `
        
            <div class="product__cart-child">
              <div class="child__info">
                <h4>${info.name}</h4>
                <div class="child-info">
                  <p>${item.quantity}x</p>
                  <span>@ $${info.price}</span>
                  <p class="total-price">$${info.price * item.quantity}</p>
                </div>
              </div>
              <span class="child-img"
                ><img src="assets/images/icon-remove-item.svg" alt=""
              /></span>
            </div>


        `;

      listCartInfo.appendChild(newCart);
    });
  }
};
