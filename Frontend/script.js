const API_URL = "http://localhost:3000/items";

function handleFormSubmit(event) {
  event.preventDefault();

  const itemsList = {
    itemName: event.target.itemName.value,
    description: event.target.description.value,
    category: event.target.category.value,
    price:event.target.price.value,
    quantity:event.target.quantity.value
  };

  axios
      .post(`${API_URL}/add`,itemsList)
      .then((response) => {
        displayItemsOnScreen(response.data);
      })
      .catch((error) => console.log(error));

// Clear form inputs
  event.target.reset();
}
window.addEventListener("DOMContentLoaded", getAllItems);

function getAllItems() {
  axios
    .get(API_URL)
    .then((response) => {
      const itemdetails = document.getElementById("items-list");
      itemdetails.innerHTML = ""; // clear existing list
      response.data.forEach((item) => displayItemsOnScreen(item));
    })
    .catch((error) => console.log(error));
}

// DISPLAY items on screen
function displayItemsOnScreen(itemsList) {
  const itemsDetails = document.getElementById("items-list");

  const item = document.createElement("li");
  item.className = "list-group-item";

  const row = document.createElement("div");
  row.className = "row align-items-center";

  // ITEM NAME
  const colName = document.createElement("div");
  colName.className = "col-2";
  colName.textContent = itemsList.itemName;

  // DESCRIPTION
  const colDesc = document.createElement("div");
  colDesc.className = "col-3";
  colDesc.textContent = itemsList.description;

  // CATEGORY
  const colCat = document.createElement("div");
  colCat.className = "col-3";
  colCat.textContent = itemsList.category;

  // PRICE
  const colPrice = document.createElement("div");
  colPrice.className = "col-2";
  colPrice.textContent = "₹" + itemsList.price;

  // Quantity
  const colQty = document.createElement("div");
  colQty.className = "col-1";
  const qtySpan = document.createElement("strong");
  qtySpan.textContent = itemsList.quantity;
  qtySpan.id = `qty-${itemsList.id}`;
  colQty.appendChild(qtySpan);

  // BUTTONS
  const colButtons = document.createElement("div");
  colButtons.className = "col-1 text-end";

  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group btn-group-sm";

  // BUY 1
  const buy1 = document.createElement("button");
  buy1.className = "btn btn-primary";
  buy1.textContent = "1";
  buy1.onclick = () => updateQuantity(itemsList, 1, qtySpan);

  // BUY 2
  const buy2 = document.createElement("button");
  buy2.className = "btn btn-warning";
  buy2.textContent = "2";
  buy2.onclick = () => updateQuantity(itemsList, 2, qtySpan);

  // BUY 3
  const buy3 = document.createElement("button");
  buy3.className = "btn btn-danger";
  buy3.textContent = "3";
  buy3.onclick = () => updateQuantity(itemsList, 3, qtySpan);

  btnGroup.appendChild(buy1);
  btnGroup.appendChild(buy2);
  btnGroup.appendChild(buy3);

  colButtons.appendChild(btnGroup);

  // Append columns into row
  row.appendChild(colName);
  row.appendChild(colDesc);
  row.appendChild(colCat);
  row.appendChild(colPrice);
  row.appendChild(colQty);
  row.appendChild(colButtons);

  // Add row to list item
  item.appendChild(row);

  itemsDetails.appendChild(item);
}

function updateQuantity(item, subtractValue, qtySpan) {
  const currentQty = parseInt(qtySpan.textContent);

  if (currentQty < subtractValue) {
    alert("Not enough quantity available!");
    return;
  }

  const updatedQty = currentQty - subtractValue;

  // Update UI instantly
  qtySpan.textContent = updatedQty;

  // Update on server
  axios
    .put(`${API_URL}/${item.id}`, { quantity: updatedQty })
    .then((res) => {
      console.log("Quantity updated:", updatedQty);
    })
    .catch((err) => console.log(err));
}
  
