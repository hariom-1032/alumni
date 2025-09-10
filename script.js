<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
</script>
