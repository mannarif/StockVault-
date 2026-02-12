import { useState } from "react";
import Login from "./components/Login";
import StockList from "./components/StockList";
export default function App(){
 const [user,setUser]=useState(null);
 return (<div style={{maxWidth:480,margin:"auto",padding:12}}>
 <h2>📊 StockVault</h2>
 <Login user={user} setUser={setUser}/>
 {user && <StockList user={user}/>}
 </div>);
}