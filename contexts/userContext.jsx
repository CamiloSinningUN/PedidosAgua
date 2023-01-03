import React, { useState, useEffect } from 'react';
import { firebaseConfig } from '../firebase-config';
import firebase from 'firebase/compat/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log("hasta aquí sí")
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("noseee", user);
                setUser(user);
                setLoading(false);
            }
            else {
                setUser(null);
                setLoading(false);
            }
        });

        // AsyncStorage.getItem('user').then((userString) => {
        //     const tempuserString = JSON.parse(userString);

        //     //verify this user exist in firebase
        //     firebase.firestore().collection('users').doc(tempuserString.uid)
        //         .get()
        //         .then((firestoreDocument) => {
        //             if (!firestoreDocument.exists) {
        //                 Alert.alert("User does not exist anymore.");
        //                 return;
        //             }
        //             const user = firestoreDocument.data();
        //             user.uid = firestoreDocument.id;
        //             setUser(user);
        //         })
        //         .catch((error) => {
        //             Alert.alert(error.message);
        //         });
        //     if (userString) {
        //         setUser(JSON.parse(userString));
        //     }
        //     setLoading(false);
        // }).catch((error) => {
        //     console.log(error);
        //     setLoading(false);
        // })
        // setLoading(false);
    }, []);

    if (loading) {
        return <></>
    }

    return (
        <UserContext.Provider value={{ user, setUser, name, setName, role, setRole, phone, setPhone }}>
            {children}
        </UserContext.Provider>
    );
}