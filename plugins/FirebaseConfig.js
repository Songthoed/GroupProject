import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Initialize Cloud Firestore through Firebase
if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: "AIzaSyA5orDPiDDprK6QZDZ6-LxTBmXujztt1HA",
        authDomain: "aaaa-a4361.firebaseapp.com",
        databaseURL: "https://aaaa-a4361.firebaseio.com",
        projectId: "aaaa-a4361",
        storageBucket: "aaaa-a4361.appspot.com",
        messagingSenderId: "200481287319",
        appId: "1:200481287319:web:2cdf88de5465ac069f0dd2",
        measurementId: "G-J5JSTB9P0X"
    }
    firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()