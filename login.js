<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
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



    const submit=document.getElementNyId('submit').value;
submit.addEventListener("click",function(event){
  event.preventDefault()
  //input ko store keya
const email=document.getElementById('email').value;
  const submit=document.getElementById('password').value;
  //registration data goes to firebase
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("Account bana rha hu babar karo")
    window.location.href="index.html"
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    alert("gundai nahi karne ka edhar")
  });
})

      
</script>
