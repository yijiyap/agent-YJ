<template>
	<div id="header-div" class="w-full">
		<img src="/images/agent-yj-logo.png" alt="logo" id="header-logo" class="mx-auto">
	</div>
	<nav id="header-nav" class="flex items-center justify-between flex-wrap p-6">
		<div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
			<div class="text-base lg:flex-grow">
				<NuxtLink to="/" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4">Home</NuxtLink>
				<NuxtLink to="/orders" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4">Orders</NuxtLink>
				<NuxtLink to="/w2c" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4">W2C</NuxtLink>
				<NuxtLink to="/dashboard" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4">Dashboard</NuxtLink>
			</div>
		</div>
	</nav>
</template>

<script setup>

</script>