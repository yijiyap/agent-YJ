<template>
  <Navbar />
  <div class="flex">
    <div class="mx-auto mt-10">
      <h1>Reddit W2C ft. r/FashionReps</h1>
    </div>
  </div>

  <div class="flex">
    <div class="mt-5 mx-auto">
      <p>Find your favourite reps based on reviews on Reddit</p>
    </div>
  </div>

  <div class="mt-10 container">
    <!-- on submit, pass the user_input to flask.py  -->
    <form action="" class="flex flex-col" @submit.prevent="handleSubmit">
      <div class="mx-auto">
        <div class="mb-3">
          <input type="text" class="form-control" id="exampleFormControlInput1" v-model="userInput"
            placeholder="Search for a product">
        </div>

      </div>
      <div class="mx-auto">
        <button type="button" class="btn btn-primary mt-2" @click="handleSearch">Search</button>
      </div>
    </form>

    <!-- loading spinner -->
    <div class="text-center">
      <div class="spinner-border mt-5" role="status" v-if="isLoading">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>


    <div class="row row-cols-1 row-cols-md-2 g-4 mx-auto d-flex justify-content-center align-items-center">
      <div class="col mx-auto" v-if="output" v-for="post in output" :key="post">
        <Post class="mx-auto" :post="post" />
      </div>
    </div>
    <!-- error message if any -->
    <div class="text-center mt-10">
      <p>{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
})
import Navbar from '~/components/Navbar.vue';

import { ref } from "vue";
const userInput = ref("");
const output = ref("");
const errorMsg = ref("");
const isLoading = ref(false);

// check what is isLoading value
const handleSearch = async () => {
  try {
    isLoading.value = true;
    const response = await fetch("http://localhost:5733/api/process-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: userInput.value }),
    });
    const result = await response.json();
    output.value = result;
    errorMsg.value = "";
    console.log(result);
  } catch (error) {
    console.log(error);
    errorMsg.value = "Oops something went wrong. Please try a different query.";
  } finally {
    isLoading.value = false;
  }
}


</script>