import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { api } from "../init";

function Login() {
  const [tes, setTes] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(api, "user"));

      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(usersList);
      setTes(usersList);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = (e) => {
    if (e.role === "server") {
      window.location.href = "/admin";
    } else {
      localStorage.setItem("user", e.id);
      window.location.href = "/";
    }
  };

  return (
    <main>
      <div className="flex justify-center items-center h-screen">
        <div>
          <h1>Welcome! Login As?</h1>
          <p>{loading ? "" : "Memuat Data..."}</p>
          <div className="w-full ">
            {tes.map((item) => (
              <button
                className="w-full ring-1 ring-slate-900 my-2"
                onClick={() => handleLogin(item)}
              >
                {item.username} sebagai {item.role}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
export default Login;
