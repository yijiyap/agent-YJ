<template>
<Navbar/>

</template>

<script setup>
definePageMeta({
    middleware: ['auth'],
})
import Navbar from '~/components/Navbar.vue';
</script>