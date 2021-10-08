import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "../config/firebase";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

export const submitAttendee = async (attendeeDetails) => {
  console.log(attendeeDetails);
  return db
    .collection("attendeeDetails")
    .add(attendeeDetails)
    .then(() => {
      return {
        status: 200
      };
    })
    .catch(() => {
      return {
        status: 500
      };
    });
};

export const getAttendees = async () => {
  let attendeeDetails = [];
  let attendeeRef = db.collection("attendeeDetails");
  let response = await attendeeRef.get();

  if (response) {
    response.forEach((doc) => {
      attendeeDetails.push(doc.data());
    });

    return {
      status: 200,
      data: attendeeDetails
    };
  } else {
    return {
      status: 500,
      data: []
    };
  }
};
export async function loginService({ email, password }) {
  return await auth
    .signInWithEmailAndPassword(email, password)
    .then((d) => {
      // Signed in

      return {
        status: 200,
        data: "Successfully Logged In"
      };
    })
    .catch(() => {
      return { status: 401, data: "Unauthorized" };
    });
}
export const isAuthed = async () => {
  return await firebase.auth().currentUser;
};

export const logoutService = async () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      return { status: 200, data: "Successfully Logged Out" };
    })
    .catch((error) => {
      // An error happened.
      return { status: 500, data: "Error while Logging out" };
    });
};
