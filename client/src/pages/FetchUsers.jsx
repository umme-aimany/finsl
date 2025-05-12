import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const FetchUsers = ({refresh}) => {
  const [userData, setUserData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [searchUser, setSearchUser] = useState("");

  const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getUsers");
        // console.log(response.data.users);
        setUserData(response.data.users);
      }
      catch (err) {
        console.log(err);
      }
    }

  useEffect(() => {
    fetchUserData();
  }, [refresh])

  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:3000/deleteuser/${id}`);
    console.log(response.data.message);
    toast.success(response.data.message, {
      iconTheme: {
        primary: "red"
      }
    });
  }

  const handleEdit = (user) => {
    setEditingId(user._id);
    setEditName(user.name);
    setEditEmail(user.email);
  }

  const saveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/updateuser/${editingId}`, {
        name: editName,
        email: editEmail
      })
      toast.success(response.data.message);
      setEditingId(null);
      setEditName("");
      setEditEmail("");
    }
    catch (err) {
      toast.error(err);
    }
  }

  const handleSearch = async() => {
    if(!searchUser){
      fetchUserData();
      return;
    }
    try {
    const response = await axios.get(`http://localhost:3000/search-user/${searchUser}`);
    console.log(response.data);
    setUserData(response.data);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
      {userData.length > 0 ?
        <>
        <div className='mx-[20%] my-4'>
            <input type="text" className='w-[100%] border border-gray-700 p-1 px-6 focus:outline-none focus:border-red-600'
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            onKeyUp={handleSearch}
            />
        </div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mx-[20%] mb-10">

          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {userData.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>

                  <td>
                    {editingId == user._id ?
                      <input className='border border-gray-600 p-2 w-[100%]' type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                      :
                      user.name
                    }
                  </td>

                  <td>
                    {editingId == user._id ?
                      <input className='border border-gray-600 p-2 w-[100%]' type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                      :
                      user.email
                    }
                  </td>
                  <td className='space-x-2'>
                    {editingId == user._id ?
                      <>
                        <button className="btn btn-soft btn-success" onClick={saveEdit}>Save</button>
                        <button className="btn btn-soft btn-warning" onClick={() => setEditingId(null)}>Cancel</button>
                      </>
                      :
                      <>
                        <button className="btn btn-soft btn-info" onClick={() => handleEdit(user)}>Edit</button>
                        <button className="btn btn-soft btn-error" onClick={() => handleDelete(user._id)}>Delete</button>
                      </>
                    }
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
        </>
        : null}

    </>
  )
}

export default FetchUsers
