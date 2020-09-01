import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { functions } from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: '1:938082741309:web:3293409f04e3b7004f4e54',
  measurementId: 'G-2FYC6VNMTJ',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, name } = user;
    try {
      await userRef.set({
        name,
        email,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};

export const saveDataToFireStore = async (stripeObject, user) => {
  const chargesRef = firestore.collection(`users/${user.uid}/charges`);
  const pushId = chargesRef.doc().id;
  chargesRef.doc(pushId).set(stripeObject);
};

export const getPurchaseData = async (user) => {
  const snapshot = await firestore
    .collection(`users/${user.uid}/charges`)
    .get();
  const charges = snapshot.docs.map((data) => data.id);
  console.log(charges);
  const data = [];
  charges.forEach(async (charge) => {
    data.push(
      (await firestore.doc(`users/${user.uid}/charges/${charge}`).get()).data()
    );
  });
  return data;
};

export const saveChecklist = async (checklist, user) => {
  const checklistRef = firestore.collection(`users/${user.uid}/checklist`);
  const pushId = checklistRef.doc().id;
  checklistRef.doc(pushId).set(checklist);
};
