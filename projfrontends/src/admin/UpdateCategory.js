import React, { useState ,useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory , getCategory } from "./helper/adminapicall";

const UpdateCategory = ({match}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const preload = (categoryId) => {
      getCategory(categoryId).then(data => {
          if(data.error){
              setError(true)
          }
          else{
              setName(data.name)
          }
      })
  }

  useEffect(() => {
      preload(match.params.categoryId);
  } , [])


  const handleChange = event => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    updateCategory( match.params.categoryId , user._id, token,  {name} ).then(data => {
      if (!data) {    
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <div className="alert alert-success mt-3">
          <h4>category updated successfully</h4>
      </div>
    }
  };

  const warningMessage = () => {
    if (error) {
      return  (
        <div className="alert alert-danger mt-3">
        <h4>Failed to update {name}</h4>
    </div>
      )
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Update the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
        
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="update  category here"
      description="only admin can update the category"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};


export default UpdateCategory ; 