import { api } from "../init";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";

function Admin() {
  const [usersList, setUsersList] = useState([]);
  const [editableUser, setEditableUser] = useState(null);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(api, "user"));
      const allUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Filter hanya user dengan role 'player'
      const playerUsers = allUsers.filter((user) => user.role === "player");
      setUsersList(playerUsers);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === "select-one" ? value === "true" : value;

    setEditableUser((prevUser) => ({
      ...prevUser,
      [name]: finalValue,
    }));
  };

  const handleUpdate = async () => {
    if (!editableUser) return;
    const { id, username, role, ...dataToUpdate } = editableUser;

    dataToUpdate.balance = Number(dataToUpdate.balance);
    dataToUpdate.menang = Number(dataToUpdate.menang);

    const userDocRef = doc(api, "user", id);
    try {
      await updateDoc(userDocRef, dataToUpdate);
      alert("User berhasil di-update!");
      setEditableUser(null);
      fetchData();
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Gagal meng-update user.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <h2 className="text-lg mb-2">Daftar Semua Pemain</h2>
      <div className="w-full max-w-sm">
        {usersList.map((user) => (
          <div
            key={user.id}
            className="flex justify-between w-full items-center ring-1 ring-slate-300 my-2 p-2 rounded-md"
          >
            <p className="font-medium">{user.username}</p>
            <button
              onClick={() => setEditableUser(user)}
              className="ring-1 ring-slate-400 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md text-sm"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Form edit hanya akan ditampilkan jika 'editableUser' ada isinya */}
      {editableUser && (
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-xl font-bold mb-4 text-center">
            Edit User: {editableUser.username}
          </h2>
          <table className="w-full border-collapse border border-slate-400 text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="p-2 border border-slate-300">Properti</th>
                <th className="p-2 border border-slate-300">Nilai</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-slate-300 font-semibold">
                  ID
                </td>
                <td className="p-3 border border-slate-300">
                  {editableUser.id}
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 font-semibold">
                  Username
                </td>
                <td className="p-3 border border-slate-300">
                  {editableUser.username}
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 font-semibold">
                  Balance
                </td>
                <td className="p-3 border border-slate-300">
                  <input
                    type="number"
                    name="balance"
                    value={editableUser.balance}
                    onChange={handleInputChange}
                    className="ring-1 p-2 rounded-md w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 font-semibold">
                  Menang
                </td>
                <td className="p-3 border border-slate-300">
                  <input
                    type="number"
                    name="menang"
                    value={editableUser.menang}
                    onChange={handleInputChange}
                    className="ring-1 p-2 rounded-md w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 font-semibold">
                  Selalu Menang
                </td>
                <td className="p-3 border border-slate-300">
                  <select
                    name="alwaysWin"
                    value={editableUser.alwaysWin}
                    onChange={handleInputChange}
                    className="ring-1 p-2 rounded-md w-full bg-white"
                  >
                    <option value="true">Ya</option>
                    <option value="false">Tidak</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-300 font-semibold">
                  Selalu Kalah
                </td>
                <td className="p-3 border border-slate-300">
                  <select
                    name="alwaysLose"
                    value={editableUser.alwaysLose}
                    onChange={handleInputChange}
                    className="ring-1 p-2 rounded-md w-full bg-white"
                  >
                    <option value="true">Ya</option>
                    <option value="false">Tidak</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={() => setEditableUser(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Batal
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
