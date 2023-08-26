// header
const headerTemplate = document.createElement("div");
headerTemplate.innerHTML = `<div id="header-div">
<img src="images/agent-yj-logo.png" alt="logo" id="header-logo">
</div>
<nav id="header-nav">
<ul>
    <li><a href="./index.html">Home</a></li>
    <li><a href="./login.html">Login</a></li>
    <li><a href="./place-order.html">Place Order</a></li>
    <li><a href="./track-order.html">Track Order</a></li>
</ul>
</nav>`;
let sp2 = document.getElementById("childElement");
let parentDiv = sp2.parentNode;
parentDiv.insertBefore(headerTemplate, sp2);
// end of header

//********************************************* form validation *********************************************
export function validateForm() {
  let errors = [];
  var errorMsgs = document.getElementById("place-order-errors");
  errorMsgs.innerHTML = ""; // reset the HTML if it is repeated multiple times;

  let input_link = document.forms["order-form"]["productLink"].value;
  if (!input_link.includes("item.taobao.com") && !input_link.includes("weidian.com")) {
    errors.push("Please enter a valid taobao or weidian link")
  }
  let input_size = document.forms["order-form"]["size"].value;
  if (isNaN(input_size) && input_size.toLowerCase() !== "na") {
    errors.push("Please enter a number or 'NA' for size")
  }
  let input_qty = document.forms["order-form"]["quantity"].value;
  if (isNaN(input_qty)) {
    errors.push("Please enter a number for qty");
  }

  // if any errors, display it 
  if (errors.length > 0) {
    errorMsgs.innerHTML += "<ol>";
    for (var i = 0; i < errors.length; i++) {
      errorMsgs.innerHTML += `<li>${errors[i]}</li>`;
    }
    errorMsgs.innerHTML += "</ol>";
  }
  return errors;
}

export function handleForm(event) {
  event.preventDefault(); // Prevent form submission
  let errors = validateForm(); // Validate the form before submission
  if (errors.length > 0) {
    return;
  } else {
    // edit firebase
    let productLink = document.getElementById("productLink").value;
    let size = document.getElementById("size").value;
    let color = document.getElementById("color").value;
    let quantity = document.getElementById("quantity").value;
    testInput(productLink, size, color, quantity);
    alert("Order has been successfully added!");
  }
}

// ********************************************* end of form validation *********************************************

// script to receive from firebase
import { getDatabase, ref, set, push, child } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";
import { db } from "./firebase.js";

function inputOrder(userId, productLink, size, color, quantity) {
  // order already exists! are you sure you want to add again?

  var ordersRef = ref('users/' + userId + '/orders/')
  var newOrderRef = ordersRef.push(); // generates a unique "orderId"
  newOrderRef.set({
    productLink: productLink,
    size: size,
    color: color,
    quantity: quantity
  });
}

function testInput(productLink, size, color, quantity) {
  var ordersRef = ref(db, 'orders/');
  var newOrderRef = push(ordersRef); // generates a unique "orderId"
  set(newOrderRef, {
    productLink: productLink,
    size: size,
    color: color,
    quantity: quantity
  });

};
// end of script

// script to check order 

