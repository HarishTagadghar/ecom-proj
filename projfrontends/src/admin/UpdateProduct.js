import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories, updateProduct, getProduct } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";
import Menu from "../core/Menu";

const UpdateProducts = ({ match }) => {
  const HomeAdmin = () => (
    <div >
      <Link to="/admin/dashboard">

        <button className="btn btn-dark c">&#8606; Admin Home</button>

      </Link>
    </div>
  );
  const ManageCategory = () => (
    <div >
      <Link to="/admin/products">

        <button className="btn btn-dark c">Manage Products &#8608;</button>

      </Link>
    </div>
  );
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: ""
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData
  } = values;

  const preload = (productId) => {
    getProduct(productId).then(data => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories()
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData()
        });
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error });

        }
        else {
          setValues({ categories: data, formData: new FormData() })
        }
      }
    )
  }

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(formData);

        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
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
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} Updated successfully</h4>
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
        {ManageCategory()}
      </div>
      <div className="ccontainer">
        <h2 className="ccontainer-hedding">Update Products</h2>
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
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories &&
                categories.map((cate, index) => (
                  <option key={index} value={cate._id}>
                    {cate.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
            />
          </div>

          <button
            type="submit"
            onClick={onSubmit}
            className="ccontainer-form-button mt-4 center-form-button"
          >
            update Product
</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProducts;
