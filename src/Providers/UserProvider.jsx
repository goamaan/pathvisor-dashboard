import React, { useState, useEffect, createContext } from 'react';
import { auth, generateUserDocument, firestore } from '../firebase';

export const UserContext = createContext({
  user: null,
  data: [],
  purchaseIDS: [],
  purchaseNames: [],
  loading: true,
  valid: null
});

const UserProvider = props => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [purchaseIDS, setPurchaseIDS] = useState([]);
  const [purchaseNames, setPurchaseNames] = useState([]);
  const [valid, setValid] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(true);
      async function onMount() {
        auth.onAuthStateChanged(async userAuth => {
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
          .then(snapshot => {
            snapshot.docs.map(doc => final.push(doc.data()));
            setData(final);
            const newData = final.map(items => items.items.map(item => item));
            setPurchases(newData);
            let idData = newData.map(e => e.map(item => item.id));
            let nameData = newData.map(e => e.map(item => item.name));
            let mergedIDS = [].concat.apply([], idData);
            let mergedNames = [].concat.apply([], nameData);
            setPurchaseIDS(mergedIDS);
            setPurchaseNames(mergedNames);

            setLoading(false);
          });
        setValid(
          user.board.trim() !== '' &&
            (user.canada || user.usa || user.uk || user.germany) &&
            user.course.trim() !== ''
        );
      }
      getData();
    }
  }, [user]);

  // purchases.map(e =>
  //   e.map(item => {
  //     purchaseIDS.push(item.id);
  //     purchaseNames.push(item.name);
  //     return null;
  //   })
  // );

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
        valid
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
