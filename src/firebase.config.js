// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBbCZfp0sgKEdnUQbsVpFASTi0tF9m32Pw",
    authDomain: "maltimart-5166a.firebaseapp.com",
    projectId: "maltimart-5166a",
    storageBucket: "maltimart-5166a.appspot.com",
    messagingSenderId: "617690474872",
    appId: "1:617690474872:web:5ac02f8c96cb1a934a808d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app