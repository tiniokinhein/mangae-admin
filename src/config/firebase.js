import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


var firebaseConfig = {
    apiKey: "AIzaSyCNoDNsqLVv0cRfJJpHaexvAVhnJTc0HKM",
    authDomain: "ma-ngae.firebaseapp.com",
    databaseURL: "https://ma-ngae-default-rtdb.firebaseio.com",
    projectId: "ma-ngae",
    storageBucket: "ma-ngae.appspot.com",
    messagingSenderId: "816579485565",
    appId: "1:816579485565:web:0097179937c226f6b73614"
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.database()