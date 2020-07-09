import React, { useState ,useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import {  updateUser } from "./helper/adminapicall";

const UpdateProfiles = ({match}) => {


    const [Info , setInfo] = useState({
        name:"",
        email:"",
        error:"",
        success:false

    })
    const{name , email ,  encry_password , error , success} = Info

    
  const { user, token } = isAutheticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/">
        Home Page
      </Link>
    </div>
  );

  const preload = () => {
        isAutheticated() && (
            setInfo({...Info , name:isAutheticated().user.name , email:isAutheticated().user.email , success:false})
        )
  }
  useEffect(()=>{
      preload()
  },[])



  const successMessage = () => {
   if (success) {
       return (
       <div className="alert alert-success mt-3">
           <h1>Update Successfully</h1>
       </div>
       )
   }
  
   };

   const errorMessage = () => {
    if (error) {
     return (
     <div className="alert alert-danger mt-3">
        <h1>{error} </h1>
      </div>
     )
    }
    } ;


    const handleChange = event => {
        setInfo({...Info , error:false , name: event.target.value})
    }
    const handleChange1 = event => {
        setInfo({...Info , error:false , email: event.target.value})
    }
    const handleChange2 = event => {
        setInfo({...Info , error:false ,  encry_password: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
      
        updateUser(user._id,token , Info).then(data => {
            if(!data || data.error){
                setInfo({error:" FAILD Please Try agian "})
            }else{
                console.log(data);
                setInfo({...Info,
                name:"",
                email:"",
                encry_password:"",
                error:false,
                success:true
                })
            }
        })
    }





    
    const UpdateUserForm = () => (
        <form>
            <span>Update User</span>
            <div className="form-group">
                    <input
                     type="text"
                     onChange={handleChange}
                     value={name}
                     className="form-control"
                     placeholder="Name"
                     required
                    />
            </div>
            <div className="form-group">
                    <input
                     type="email"
                     onChange={handleChange1}
                     value={email}
                     className="form-control"
                     placeholder="Email"
                     required

                    />
            </div>
            {/* <div className="form-group">
                    <input
                     type="text"
                     onChange={handleChange2}
                     value={encry_password}
                     className="form-control"
                     placeholder="Password"
                     required

                    />
            </div> */}
                    <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-outline-success mb-3"
            >
                Update Profile
            </button>
        </form>
    )





    return (
        <Base title="User Profile" description="Update your Profile">
        <div className="container">
        <h1>User profile</h1>
            Name: {isAutheticated().user.name} <br/>
            email: {isAutheticated().user.email}

        </div>
    <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
            {goBack()}
          {errorMessage()}
          {successMessage()}
          {UpdateUserForm()}
        </div>
      </div>


        </Base>
    )
}

export default UpdateProfiles