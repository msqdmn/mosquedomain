import {createUserWithEmailAndPassword,signOut,signInWithPopup} from 'firebase/auth'
import {googleAuthProvider,auth} from '../config/firebase'

export const signup = async (Email,Password) =>{
    try {
        await createUserWithEmailAndPassword(auth,Email,Password)
    } catch (error) {
        console.error(error)
    }
}

export const signout = async () => {
    try {
        await signout(auth)
        
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

