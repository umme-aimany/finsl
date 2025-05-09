import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const FetchUsers = () => {
  const [userData, setUserData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
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

    fetchUserData();
  }, [userData])

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

  return (
    <>
        {userData.length > 0 ?

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mx-[20%] my-20">

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
                      <input className='border border-gray-600 p-2 w-[100%]' type="text" value={user.name} onChange={(e) => setEditName(e.target.value)}/>
                      :
                      user.name
                    }
                  </td>

                  <td>
                    {editingId == user._id ?
                      <input className='border border-gray-600 p-2 w-[100%]' type="email" value={user.email} onChange={(e) => setEditEmail(e.target.value)}/>
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
          : null}

    </>
  )
}

export default FetchUsers