import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
	apiKey: "AIzaSyDGjlraI69SC5dBUdnmflyQvIGEZNKsNC0",
	authDomain: "mamaeatz-a4d64.firebaseapp.com",
	databaseURL: "https://mamaeatz-a4d64.firebaseio.com",
	projectId: "mamaeatz-a4d64",
	storageBucket: "mamaeatz-a4d64.appspot.com",
	messagingSenderId: "611846061472",
	appId: "1:611846061472:web:e9898f457cbae3c78078c5",
	measurementId: "G-TJBBXE51VH",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

export default firebase;
