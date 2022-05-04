import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZTcxLXCCBEG2bg_SVQvbVQVObN7T8Z7w",
  authDomain: "crwn-db-a4983.firebaseapp.com",
  projectId: "crwn-db-a4983",
  storageBucket: "crwn-db-a4983.appspot.com",
  messagingSenderId: "261079642113",
  appId: "1:261079642113:web:a7edd064689f2805ea1000",
};

initializeApp(firebaseConfig);

// Auth Functions
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Firestore Functions
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  try {
    const userDocRef = doc(db, "users", userAuth.uid);
    console.log({ userDocRef });

    const userSnapshot = await getDoc(userDocRef);
    console.log({ userSnapshot });
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        console.error(error.message);
      }
    }

    return userDocRef;
  } catch (error) {
    console.log("error creating user", error.message);
  }
};
