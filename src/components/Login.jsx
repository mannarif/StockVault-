import {signInWithPopup,signOut} from "firebase/auth";
import {auth,provider} from "../config/firebaseConfig";
export default function Login({user,setUser}){
 return user?(
 <button onClick={()=>signOut(auth)}>Logout</button>
 ):(
 <button onClick={async()=>{
 const r=await signInWithPopup(auth,provider);
 setUser(r.user);
 }}>Login with Google</button>
 );
}