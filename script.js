
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

  // Your Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBwOirKommp_Z_OLs8jURz_2b9Sk8LfTek",
    authDomain: "alumni-b92c5.firebaseapp.com",
    projectId: "alumni-b92c5",
    storageBucket: "alumni-b92c5.firebasestorage.app",
    messagingSenderId: "949804160290",
    appId: "1:949804160290:web:d6b6fe4b168d0ef3dc817b",
    measurementId: "G-93SZRD34KE"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  // Get the submit button
  const submitBtn = document.getElementById('submit');

  submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    // Get input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Register user with Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("✅ Account successfully created!");
        window.location.href = "index.html"; // redirect
      })
      .catch((error) => {
        alert("❌ Error: " + error.message);
      });
  });

