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

  // Create row container
  const row = document.createElement("div");
  row.className = "item-row";

  // ITEM NAME
  const colName = document.createElement("div");
  colName.textContent = itemsList.itemName;

  // DESCRIPTION
  const colDesc = document.createElement("div");
  colDesc.textContent = itemsList.description;

  // CATEGORY
  const colCat = document.createElement("div");
  colCat.textContent = itemsList.category;

  // PRICE
  const colPrice = document.createElement("div");
  colPrice.textContent = "₹" + itemsList.price;

  // Quantity
  const colQty = document.createElement("div");
  const qtySpan = document.createElement("strong");
  qtySpan.textContent = itemsList.quantity;
  qtySpan.id = `qty-${itemsList.id}`;
  colQty.appendChild(qtySpan);

  // BUTTONS
  const colButtons = document.createElement("div");
  colButtons.className = "buy-bottons";

  // BUY 1
  const buy1 = document.createElement("button");
  buy1.textContent = "1";
  buy1.onclick = () => updateQuantity(itemsList, 1, qtySpan);

  // BUY 2
  const buy2 = document.createElement("button");
  buy2.textContent = "2";
  buy2.onclick = () => updateQuantity(itemsList, 2, qtySpan);

  // BUY 3
  const buy3 = document.createElement("button");
  buy3.textContent = "3";
  buy3.onclick = () => updateQuantity(itemsList, 3, qtySpan);

  //Append buttons to button group
  colButtons.appendChild(buy1);
  colButtons.appendChild(buy2);
  colButtons.appendChild(buy3);

  // Append columns into row
  row.appendChild(colName);
  row.appendChild(colDesc);
  row.appendChild(colCat);
  row.appendChild(colPrice);
  row.appendChild(colQty);
  row.appendChild(colButtons);

  // Add row to items list
  itemsDetails.appendChild(row);
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