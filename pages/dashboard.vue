<template>
    <div>
        <Navbar />
        <div id="ordersDiv" class="mt-3 text-center">
            <h1 class="text-4xl">Orders</h1>
            <div id="orderTableDiv" class="mx-auto"></div>
        </div>

    </div>
</template>


<script setup>
definePageMeta({
    middleware: ['auth'],
})
import Navbar from '~/components/Navbar.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, set, child, get } from "firebase/database";
import { watchEffect, onMounted } from 'vue';

onMounted(() => {
    createAllOrdersTable();
});

// function to get all the users in the database
const listAllUsers = (nextPageToken) => {
  // List batch of users, 100 at a time.
  getAuth()
    .listUsers(100, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        console.log('user', userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
};
listAllUsers();

const createAllOrdersTable = async => {
    const dbRef = ref(getDatabase());
    // get all orders from the firebase
    get(child(dbRef, 'users/11')).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });


}
</script>