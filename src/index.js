import { app } from './firebase.js';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js';
let auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in");
  } else {
    console.log("User is not signed in");
  }
});

// header
const headerTemplate = document.createElement("div");
headerTemplate.innerHTML = `<div id="header-div">
<img src="images/agent-yj-logo.png" alt="logo" id="header-logo">
</div>
<nav id="header-nav">
<ul>
    <li><a href="./index.html">Home</a></li>
    <li><a href="./orders.html">Orders</a></li>
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
import { getDatabase, ref, set, push, get, onValue } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";
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
    quantity: quantity,
    status: "Order received"
  });

};
// end of script

// script to print table (right now it only shows when there is a change in data)
export function createTestOrdersTable() {
  var ordersRef = ref(db, 'orders/');
  onValue(ordersRef, (snapshot) => { // when there is a change in the data, we update the table
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var headers = ["productLink", "size", "color", "quantity", "status"];
    var tr = document.createElement('tr');
    for (var i = 0; i < headers.length; i++) {
      var th = document.createElement('th');
      th.appendChild(document.createTextNode(headers[i]));
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);
    var tbody = document.createElement('tbody');
    const data = snapshot.val();
    for (var key in data) {
      var tr = document.createElement('tr');
      for (var i = 0; i < headers.length; i++) {
        var td = document.createElement('td');
        if (headers[i] === "productLink") {
          var a = document.createElement('a');
          a.href = data[key][headers[i]];
          a.textContent = data[key][headers[i]];
          td.appendChild(a);
        } else {
          td.appendChild(document.createTextNode(data[key][headers[i]]));
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    let orderTableDiv = document.getElementById("orderTableDiv");
    orderTableDiv.textContent = "";
    orderTableDiv.appendChild(table);
  });
}