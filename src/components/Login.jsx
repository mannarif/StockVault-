import {
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth, provider } from '../firebase/firebase';

export default function Login() {
  const login = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, provider);
      console.log('Login success');
    } catch (e) {
      console.error('Login error', e);
    }
  };

  return <button onClick={login}>Login with Google</button>;
}
