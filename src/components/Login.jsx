import { auth, provider } from "../config/firebaseConfig";
import {
  signInWithRedirect,
  getRedirectResult,
  signOut
} from "firebase/auth";
import { useEffect } from "react";

export default function Login({ user, setUser }) {

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
        }
      })
      .catch((error) => {
        console.error("Auth error:", error);
      });
  }, []);

  return user ? (
    <button onClick={() => signOut(auth)}>Logout</button>
  ) : (
    <button
      onClick={() => signInWithRedirect(auth, provider)}
    >
      Login with Google
    </button>
  );
}
