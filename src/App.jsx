import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import Login from "./components/Login";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      console.log("AUTH STATE:", u);
      setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <p>Checking login...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 StockVault</h2>
<p>{import.meta.env.VITE_FIREBASE_PROJECT_ID}</p>
      <p>
        <b>Status:</b>{" "}
        {user ? "LOGGED IN ✅" : "NOT LOGGED IN ❌"}
      </p>

      <Login user={user} setUser={setUser} />

      {user && (
        <pre style={{ fontSize: 12 }}>
          {JSON.stringify(
            {
              uid: user.uid,
              email: user.email,
              name: user.displayName,
            },
            null,
            2
          )}
        </pre>
      )}
    </div>
  );
                 }
