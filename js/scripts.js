// https://www.w3schools.com/jsref/met_element_addeventlistener.asp
document.getElementById("startOrderingBtn").addEventListener("click", () => {
  document.getElementById("welcomePage").classList.add("d-none");
  document.getElementById("mainNavbar").classList.remove("d-none");
  document.getElementById("shopSection").classList.remove("d-none");
});

const products = [
  { id: 1, title: "Vegetable Soup", price: 10.00, img: "img/harvest-vegetable-soup4.webp" },
  { id: 2, title: "Chicken Soup", price: 12.00, img: "img/chickensoup.jpg" },
  { id: 3, title: "Veggie Rice", price: 11.50, img: "img/rice.jpg" },
  { id: 4, title: "Pasta with Tomato Sauce", price: 10.50, img: "img/pasta.jpg" },
  { id: 5, title: "Baked Potatoes", price: 8.00, img: "img/potato.jpg" },
  { id: 6, title: "Stewed Vegetables", price: 9.00, img: "img/Vegetable-Stew-10.jpg" },
  { id: 7, title: "Oatmeal Porridge", price: 7.50, img: "img/porridge.jpg" },
  { id: 8, title: "Wheat Porridge with Gravy", price: 8.50, img: "img/wheat.webp" },
  { id: 9, title: "Salad", price: 9.00, img: "img/salad.jpg" },
  { id: 10, title: "Stewed Beans", price: 8.00, img: "img/stewed.jpg" },
  { id: 11, title: "Pilaf", price: 11.00, img: "img/ric.webp" },
  { id: 12, title: "Moqueca", price: 13.50, img: "img/fish.webp" }
];

const productsRow = document.getElementById("productsRow");

products.forEach(p => {
  const col = document.createElement("div");
  col.className = "col-md-4";
  col.innerHTML = `
    <div class="card product-card h-100">
      <img src="${p.img}" class="card-img-top">
      <div class="card-body">
        <h5>${p.title}</h5>
        <p>${p.price.toFixed(2)} €</p>
        <button class="btn btn-dark w-100" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `;
  productsRow.appendChild(col);
});

let cart = [];

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

document.getElementById("clearCartBtn")?.addEventListener("click", () => {
  cart = [];
  updateCart();
});

function updateCart() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  cart.forEach((item, i) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `${item.title} — ${item.price.toFixed(2)} €
      <button class="btn btn-sm btn-danger" onclick="removeItem(${i})">X</button>`;
    cartList.appendChild(li);
  });

  document.getElementById("cartCount").innerText = cart.length;
  calculateTotals();
  document.getElementById("checkoutBtn").disabled = cart.length === 0;
}

function calculateTotals() {
  let subtotal = cart.reduce((sum, i) => sum + i.price, 0);
  let tax = subtotal * 0.1;
  let discount = cart.length >= 3 ? subtotal * 0.10 : 0;
  let total = subtotal + tax - discount;

  document.getElementById("subtotal").innerText = subtotal.toFixed(2) + " €";
  document.getElementById("tax").innerText = tax.toFixed(2) + " €";
  document.getElementById("discount").innerText = discount.toFixed(2) + " €";
  document.getElementById("total").innerText = total.toFixed(2) + " €";
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("cartPanel"));
  offcanvas.hide();
  document.getElementById("shopSection").classList.add("d-none");
  document.getElementById("checkoutSection").classList.remove("d-none");
});

document.getElementById("backToShopBtn").addEventListener("click", () => {
  document.getElementById("checkoutSection").classList.add("d-none");
  document.getElementById("shopSection").classList.remove("d-none");
});

document.getElementById("checkoutForm").addEventListener("submit", e => {
  // https://www.w3schools.com/jsref/event_preventdefault.asp
  e.preventDefault();
  // https://www.w3schools.com/jsref/jsref_trim_string.asp
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const zip = document.getElementById("zip").value.trim();
  // https://www.w3schools.com/jsref/jsref_regexp_test.asp it test if email includes @, phone only digits and zip max 6 characters
  if (!email.includes("@") || !/^\d+$/.test(phone) || zip.length > 6) {
    alert("Please fill fields correctly");
    return;
  }

   document.getElementById("thankYouMessage").innerText = "Thank you for ordering!";

  showConfirmation();
});



function showConfirmation() {
  const subtotal = cart.reduce((sum, i) => sum + i.price, 0);
  const tax = subtotal * 0.1;
  const discount = cart.length >= 3 ? subtotal * 0.10 : 0;
  const total = subtotal + tax - discount;

  document.getElementById("checkoutSection").classList.add("d-none");
  document.getElementById("confirmationSection").classList.remove("d-none");

  document.getElementById("confirmationBody").innerHTML = `
    <p><strong>Order Completed!</strong></p>
    <p><strong>Name:</strong> ${document.getElementById("name").value}</p>
    <p><strong>Email:</strong> ${document.getElementById("email").value}</p>
    <p><strong>Address:</strong> ${document.getElementById("address").value}</p>
    <p><strong>Total Paid:</strong> ${total.toFixed(2)} €</p>
  `;
}



document.getElementById("goHomeBtn").addEventListener("click", () => {
  document.getElementById("confirmationSection").classList.add("d-none");
  document.getElementById("shopSection").classList.remove("d-none");
});
