import { auth, provider } from "../config/firebaseConfig";
import {
  signInWithRedirect,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { useEffect } from "react";

export default function Login({ user, setUser }) {

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  return user ? (
    <button onClick={() => signOut(auth)}>Logout</button>
  ) : (
    <button onClick={() => signInWithRedirect(auth, provider)}>
      Login with Google
    </button>
  );
}
