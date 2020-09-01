import React, { useState, useEffect, createContext } from 'react';
import { auth, generateUserDocument, firestore } from '../firebase';

export const UserContext = createContext({
  user: null,
  data: [],
  purchaseIDS: [],
  purchaseNames: [],
  loading: true,
});

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      async function onMount() {
        auth.onAuthStateChanged(async (userAuth) => {
          const receivedUser = await generateUserDocument(userAuth);
          setUser(receivedUser);
          setLoading(false);
        });
      }
      onMount();
    }
    if (user) {
      async function getData() {
        setLoading(true);
        const final = [];
        firestore
          .collection(`users/${user.uid}/charges`)
          .get()
          .then((snapshot) => {
            snapshot.docs.map((doc) => final.push(doc.data()));
            setData(final);
          });
        setLoading(false);
      }

      getData();
    }
  }, [user]);

  const purchases = data.map((items) => items.items.map((item) => item));
  const purchaseIDS = [];
  const purchaseNames = [];
  purchases.map((e) =>
    e.map((item) => {
      purchaseIDS.push(item.id);
      purchaseNames.push(item.name);
      return null;
    })
  );

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setUser,
        setLoading,
        data,
        purchaseIDS,
        purchaseNames,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
