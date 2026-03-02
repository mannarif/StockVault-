import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, logoutUser } from './config/firebaseConfig';
import Login from './components/Login';
import AddStock from './components/AddStock';
import StockList from './components/StockList';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unSub();
  }, []);

  if (loading) return <p>Checking login...</p>;

  if (user) {
    return (
      <div className="container">
        <h2>📈 Stock Tracker</h2>
        <button className="logout-btn" onClick={logoutUser}>
          Logout
        </button>
        <AddStock />
        <StockList />
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 StockVault</h2>
      <p>{import.meta.env.VITE_FIREBASE_PROJECT_ID}</p>
      <Login user={user} setUser={setUser} />
    </div>
  );
}
