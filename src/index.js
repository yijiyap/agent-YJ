// header
const headerTemplate = document.createElement("header");
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
document.body.insertBefore(headerTemplate, document.getElementById("firstChild"));
// end of header

// form validation
function validateForm() {
  errors = [];
  let input_link = document.forms["order-form"]["product-link"].value;
  if (!input_link.includes("item.taobao.com") && !input_link.includes("weidian.com")) {
    errors.push("Please enter a valid taobao or weidian link")
  }
  let input_size = document.forms["order-form"]["size"].value;
  if (isNaN(input_size) && input_size.toLowerCase() !== "na" ) {
    errors.push("Please enter a number or 'NA' for size")
  }
  let input_qty = document.forms["order-form"]["quantity"].value;
  if (isNaN(input_qty)) {
    errors.push("Please enter a number for qty");
  }
  // if any errors, display it 
  if (errors.length > 0) {
    var errorMsgs = document.getElementById("place-order-errors");
    errorMsgs.innerHTML += "<ol>";
    for (i=0;i<errors.length;i++) {
      errorMsgs.innerHTML += `<li>${errors[i]}</li>`;
    }
    errorMsgs.innerHTML += "</ol>";
  }
}
// end of form validation

// script to prevent page reload on a page submission
var form = document.getElementById("order-form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
// end of script

// script to receive from firebase

// end of script