import {createUserWithEmailAndPassword,signOut,signInWithPopup,onAuthStateChanged,signInWithEmailAndPassword} from 'firebase/auth'
import {googleAuthProvider,auth,db} from '../config/firebase'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'; // For navigation
import React, { useEffect, useState } from 'react'; 
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

export const signup = async (Email,Password) =>{
    try {
        await createUserWithEmailAndPassword(auth,Email,Password)
    } catch (error) {
        console.error(error)
    }
}

export const SignIn = async (Email,Password) =>{
  try{
    await signInWithEmailAndPassword(auth,Email,Password)
  }catch(error){
    console.error(error)
  }
}

export const Signout = async () => {
    
    try {
        await signOut(auth)
    
        
    } catch (error) {
        console.error(error)
    }
}



export const googlesignin = async () => {
  try {
    await signInWithPopup(auth,googleAuthProvider)
  } catch (error) {
    console.error(error)
  }
}

export const AuthStatus = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // State to store the user role
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log('User is signed in:', user);
          setUser(user);
          const userRole = await createOrGetUserRole(user);
          
          setRole(userRole);
        } else {
          console.log('No user is signed in');
          setUser(null);
          setRole(null);
        }
      });
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, []);

    return (
        <div>
          {user ? (
            <>
              <p>Signed in as: {user.email}</p>
              
            </>
          ) : (
            <p>No user signed in</p>
          )}
        </div>
      );
  

  

  };

  export const ProtectedRoutes = () => {
    const [user, setUser] = useState(null);
    const [crole, setRole] = useState(null); // State to store the user role
    const [loading, setLoading] = useState(true); // Add a loading state
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log('User is signed in:', user);
          setUser(user);
          const userRole = await createOrGetUserRole(user);
          console.log("USER ROLE IS", userRole.role);
          setRole(userRole.role);
        } else {
          console.log('No user is signed in');
          setUser(null);
          setRole(null);
        }
        setLoading(false); // Set loading to false after user and role are fetched
      });
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, []);
  
    // Log `crole` whenever it changes
    useEffect(() => {
      console.log("IN ES", crole);
    }, [crole]);
  
    // Show a loading indicator or nothing until loading is complete
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // Render protected routes based on role
    return (crole === 'admin' ? <Outlet /> : <Navigate to="/login" />);
  };

  
 const createOrGetUserRole = async (user) => {
    if (!user) return;
  
    const userRef = doc(db, "users", user.uid); // Reference to Firestore 'users' collection
    const userSnap = await getDoc(userRef); // Get user document snapshot
  
    if (!userSnap.exists()) {
      // If user doesn't exist, create new user document with default 'user' role
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: "user", // Default role can be 'user', adjust as necessary
        createdAt: new Date(),
      };
  
      // Create the user document in Firestore
      await setDoc(userRef, userData);
      console.log("New user created with role: user");
      return userData;
    } else {
      // User already exists, return the existing data
      const existingUser = userSnap.data();
      console.log("Existing user role:", existingUser.role);
      return existingUser;
    }
  };
  