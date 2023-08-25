import { getDatabase } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";

//********************************************* form validation *********************************************
//FUNCTION RUNS,BUT IT JUST REFRESHES THE PAGE
export function validateForm() {
  let errors = [];
  var errorMsgs = document.getElementById("place-order-errors");
  errorMsgs.innerHTML = ""; // reset the HTML if it is repeated multiple times;

  let input_link = document.forms["order-form"]["product-link"].value;
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
  // Validate the form before submission
  let errors = validateForm();
  if (errors.length > 0) {
    event.preventDefault(); // Prevent form submission
    return;
  } else {
    // edit firebase
    console.log("ok");
  }
}

// form.addEventListener('submit', handleForm);

// ********************************************* end of form validation *********************************************

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


// script to receive from firebase


// end of script