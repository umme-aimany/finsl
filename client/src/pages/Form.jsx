import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import FetchUsers from './FetchUsers';

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/adduser", { name, email })
      toast.success(response.data.message)
      console.log(response.data.message);

      setName("");
      setEmail("");
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <div className='flex justify-center py-20'>
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">UserForm</legend>

            <label className="label">Name</label>
            <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <button className="btn btn-neutral mt-4">Add</button>
          </fieldset>
        </form>
      </div>

      <FetchUsers />
    </>
  )
}

export default Form