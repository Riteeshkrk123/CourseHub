import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import PropTypes from "prop-types";
import AuthContext from "../context/AuthContext";
import auth from "../firebase/Firebase.config";
import { useEffect, useState } from "react";
import axios from 'axios';

const googleProvider = new GoogleAuthProvider(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const createNewUser = (email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userSignIn = (email, password) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }


    const singInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }


    const userSignOut = () => {
        setIsLoading(true);
        return signOut(auth);
    }



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const email = currentUser.email;
                const userEmail = { email: email };

                const newUser = {
                    email: email,
                    role: 'student'
                };

                // Sending JWT token request
                await axios.post('https://course-hub-backend.vercel.app/jwt', userEmail, {
                    withCredentials: true
                });

                // console.log(currentUser);

                // Send the user data to be saved
                await axios.post('https://course-hub-backend.vercel.app/user', newUser);
            } else {
                // Handle logout
                await axios.post('https://course-hub-backend.vercel.app/api/logout', {}, {
                    withCredentials: true
                });
                // console.log('User is logged out');
            }

            setIsLoading(false); // Ensure this is called after the API requests
        });

        return () => {
            unSubscribe();
        };

    }, []);


    const info = {
        createNewUser,
        userSignIn,
        updateUserProfile,
        singInWithGoogle,
        userSignOut,
        user,
        isLoading,
        setIsLoading
    }

    
    return (
        <AuthContext.Provider value={info}>
            {children}
            {/* {!isLoading && children} */}
        </AuthContext.Provider>
    );
};

// PropTypes validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;