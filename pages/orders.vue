<template>
    <div>
        <Navbar />

        <div id="mainDiv">
            <div class="adColumn" id="leftColumn">
                <img class="meme" id="meme3" src="/images/meme3.png" alt="">
                <img id="meme4" class="meme" src="/images/meme4.jpeg" alt="">
            </div>

            <div id="content">
                <div id="ordersDiv" class="mt-5">
                    <h1 class="text-4xl">Orders</h1>
                    <div id="orderTableDiv">

                    </div>
                </div>

                <div id="placeOrderDiv">
                    <h1 class="text-3xl">Add new order</h1>
                    <form action="" name="order-form" id="order-form" class="place-order-div-form" method="post"
                        @submit.prevent="handleForm">
                        <div>
                            Product Link: <input required type="text" name="productLink" id="productLink">
                        </div>
                        <div>
                            Size: <input required type="text" name="size" id="size" placeholder="'NA' if not applicable">
                        </div>
                        <div>
                            Color: <input requred type="text" name="color" id="color" placeholder="'NA' if not applicable">
                        </div>
                        <div>
                            Quantity: <input required type="text" name="quantity" id="quantity">
                        </div>
                        <button type="submit" value="Place order"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Place
                            Order</button>
                    </form>

                    <div id="place-order-errors">

                    </div>

                    <div id="issueDiv">
                        <h1 class="text-3xl"> Any issues with the order?</h1>
                        <form id="emailForm" action="mailto:your-email@example.com" method="post">
                            <input type="email" placeholder="Your email address" id="emailText">
                            <br>
                            <textarea name="message" id="" cols="30" rows="10" placeholder="Tell us your issue"></textarea>
                            <br>
                            <input type="submit" value="Send Email"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        </form>
                    </div>
                </div>
            </div>
            <div class="adColumn" id="rightColumn">
                <img id="meme1" class="meme" src="/images/meme1.jpg" alt="">
                <img id="meme2" class="meme" src="/images/meme2.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    middleware: ['auth'],
})
import Navbar from '~/components/Navbar.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { watchEffect, onMounted } from 'vue';

onMounted(() => {
    createTestOrdersTable();
});


const handleForm = async () => {
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
    if (errors.length > 0) {
        return;
    } else {
        // edit firebase
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = user.uid;
                let productLink = document.getElementById("productLink").value;
                let size = document.getElementById("size").value;
                let color = document.getElementById("color").value;
                let quantity = document.getElementById("quantity").value;
                inputOrder(userId, productLink, size, color, quantity);
                alert("Order has been successfully added!");
            }
        });
    }
}

const inputOrder = async (userId, productLink, size, color, quantity) => {
    const db = getDatabase();
    var ordersRef = ref(db, 'users/' + userId + '/orders/')
    var newOrderRef = push(ordersRef); // generates a unique "orderId"
    set(newOrderRef, {
        productLink: productLink,
        size: size,
        color: color,
        quantity: quantity,
        status: "Order received"
    });
}

const createTestOrdersTable = async => {
    const db = getDatabase();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      var ordersRef = ref(db, 'users/' + userId + '/orders/');
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
  });
}

</script>