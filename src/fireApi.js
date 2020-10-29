import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyD5rgceH1hoLoIyG6ELVXeN2jzEPHECQVg",
  authDomain: "login-laporan-rapat.firebaseapp.com",
  projectId: "login-laporan-rapat"
};

const firebaseApp = firebase.initializeApp(config);

export const fireAuth = firebaseApp.auth();

