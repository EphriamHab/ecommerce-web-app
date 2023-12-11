import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import {toast} from 'react-toastify'
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
    const [email,setEmail] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [answer,setAnswer] = useState("")
    
    const navigate = useNavigate()
   

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
           const res = await axios.post(`/api/v1/auth/forgot-password`,
           { 
            email,
            newPassword,
            answer}
        );
        if(res && res.data.success){
            toast.success(res.data && res.data.message);

            navigate('/login');  
        }else{
            toast.error(res.data.message)
        }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }
  return (
<Layout title={'Forgot-Password - Ecommerce App'}>
     <div className="form-container">
     <h1>Reset Password</h1>
     <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
        <input
         type="email" 
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         className="form-control"
         id="exampleInputEmail1"
         placeholder='Enter Your Email'
         required/>
        </div>
        <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your favorite Sport Name "
              required
            />
          </div>
      <div className="mb-3">
        <input 
         type="password"
         value={newPassword}
         onChange={(e)=>setNewPassword(e.target.value)}
         className="form-control"
         id="exampleInputPassword1"
         placeholder='Enter Your Password'
         required/>
      </div>
      <div className="mb-3">
      <button type="submit" className="btn btn-primary">RESET</button>
      </div>
    </form>
     </div>
    </Layout>
  )
}

export default ForgotPassword