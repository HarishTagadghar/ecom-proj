import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {updateBanner , getBanner} from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";
import Menu from "../core/Menu";

const UpdateBanner = ({ match }) => {
  const HomeAdmin = () => (
    <div >
      <Link to="/admin/dashboard">

        <button className="btn btn-dark c">&#8606; Admin Home</button>

      </Link>
    </div>
  );

  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
   photo: "",
  loading: false,
    error: "",
     getaRedirect: false,
     createdBanner:"",
    formData: ""
  });

  const {
    name,
    loading,
    error,
     getaRedirect,
    formData,
    createdBanner
  } = values;

  const preload = (bannerId) => {
    getBanner(bannerId).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          
          formData: new FormData()
        });
      }
    });
  };


  useEffect(() => {
    preload(match.params.bannerId);
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateBanner(match.params.bannerId, user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(formData);

        setValues({
          ...values,
          name: "",
         photo: "",
         loading: false,
         createdBanner: data.name,

          getaRedirect: true
        });


      }
    });
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => {
    return <div
      className="alert alert-success mt-3"
      style={{ display: createdBanner ? "" : "none" }}
    >
      <h4>{createdBanner} Updated successfully</h4>
    </div>

  };
  const warningMessage = () => {
    if (error) {
      return <div className="alert alert-danger mt-3">
        <h1>{error} </h1>
      </div>

    }

  };



  return (
    <div className="p">
      <Menu />
      <div className="cbuttons">
        {HomeAdmin()}
      </div>
      <div className="ccontainer">
        <h2 className="ccontainer-hedding">Update Banne</h2>
        {successMessage()}
        {warningMessage()}
        <form>
          <span className="text-big">Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-dark">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              disabled
              value={name}
            />
          </div>
    
          <button
            type="submit"
            onClick={onSubmit}
            className="ccontainer-form-button mt-4 center-form-button"
          >
            update Banner
</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBanner;
