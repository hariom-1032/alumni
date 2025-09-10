<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBwOirKommp_Z_OLs8jURz_2b9Sk8LfTek",
    authDomain: "alumni-b92c5.firebaseapp.com",
    projectId: "alumni-b92c5",
    storageBucket: "alumni-b92c5.appspot.com", // ✅ fixed
    messagingSenderId: "949804160290",
    appId: "1:949804160290:web:d6b6fe4b168d0ef3dc817b",
    measurementId: "G-93SZRD34KE"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  // Handle form submission
  const form = document.getElementById('signupForm');

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (password.length < 6) {
      alert("⚠️ Password must be at least 6 characters.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("✅ Account successfully created!");
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert("❌ Error: " + error.message);
      });
  });
</script>
