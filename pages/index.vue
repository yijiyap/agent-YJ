<template>
	<Navbar />

	<div id="authDiv">
		<form action="" id="signInForm" class="authForm" @submit.prevent="signIn">
			<label class="block text-gray-700 text-sm font-bold">
				Sign In:
			</label>
			<input type="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="email" id="signInE"><br>
			<input type="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="password" id="signInP"><br>
			<input type="submit" value="Sign In" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
		</form>
		<form action="" id="signUpForm" class="authForm" @submit.prevent="signUp" method="post">
			<label class="block text-gray-700 text-sm font-bold">
				Sign Up:
			</label>
			<input type="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="email" id="signUpE"><br>
			<input type="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="password" id="signUpP"><br>
			<input type="submit" value="Sign Up" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
		</form>
		<div id="welcomeDiv"></div>
		<div id="signOutDiv"><button id="signOutBtn" @click.prevent="handleSignOut" style="display: none;" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Sign
				Out</button></div>
	</div>

	<div id="countdown-div">
		<h2>
			<!-- Countdown until next haul -->
			Next haul in
		</h2>
		<div id="countdown">
			Stay tuned!
		</div>
	</div>

	<div id="top-selling-div">
		<h2>
			<!-- Most bought goods -->
			Hottest goods
		</h2>
		<div id="top-selling">
			Stay tuned!
		</div>
	</div>

	<div id="forFlexing">
		<div id="customerCountDiv">
			<h4>
				Number of happy customers
			</h4>
			<div id="customerCount">
				17,489
			</div>
		</div>

		<div id="ordersFulfilledDiv">
			<h4>
				Orders fulfilled
			</h4>
			<div id="ordersFulfilled">
				54,815
			</div>
		</div>

		<div id="shippingTimeDiv">
			<h4>
				Average shipping time
			</h4>
			<div id="shippingTime">
				2 weeks
			</div>
		</div>

	</div>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";

// make app available
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

const signIn = async () => {
	let auth = getAuth();
	let email = document.getElementById("signInE").value;
	let password = document.getElementById("signInP").value;
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			alert("Sign In successful!")
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			alert(error.message);
		});
};

const signUp = async () => {
	let auth = getAuth();
	let email = document.getElementById("signUpE").value;
	let password = document.getElementById("signUpP").value;
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			alert("Sign Up successful!")
			//...
		})
		.catch((error) => {
			alert(error.message);
		});
};

const handleSignOut = () => {
	let auth = getAuth();
	signOut(auth).then(() => {
		alert("Sign Out successful!")
	}).catch((error) => {
		alert(error.message);
	});
};

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
	if (user) {
		document.getElementById("signOutBtn").style.display = "block";
		document.getElementById("welcomeDiv").innerHTML = "Welcome " + user.email;
		document.getElementById("signInForm").style.display = "none";
		document.getElementById("signUpForm").style.display = "none";
	} else {
		document.getElementById("signOutBtn").style.display = "none";
		document.getElementById("welcomeDiv").innerHTML = "";
		document.getElementById("signInForm").style.display = "block";
		document.getElementById("signUpForm").style.display = "block";
	}
});

</script>