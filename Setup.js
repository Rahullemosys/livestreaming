import React from 'react'
import App from "./App";
import firebase from "@react-native-firebase/app";
import Auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAdzw1cQ573nQVOtGbFY67sn3WpiXxBiBg",
    authDomain: "livestreaming-f0761.firebaseapp.com",
    databaseURL: "https://livestreaming-f0761-default-rtdb.firebaseio.com",
    projectId: "livestreaming-f0761",
    storageBucket: "livestreaming-f0761.appspot.com",
    messagingSenderId: "380883462455",
    appId: "1:380883462455:web:022e3a538b5bb2027952b2"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase, Auth, database }

function Setup() {
    return (<App />)
}

export default Setup
