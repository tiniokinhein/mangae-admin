import { auth } from './firebase'

export const SIGNIN = (email,password) => {
    return auth.signInWithEmailAndPassword(email,password)
}

export const SIGNOUT = () => {
    return auth.signOut()
}