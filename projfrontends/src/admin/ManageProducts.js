import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";
import { Table } from 'react-bootstrap'
import Menu from "../core/Menu";


const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getProducts().then(data => {
      if (!data) {
        console.log("product not found");
      } else {
        setProducts(data);
        console.log(data);

      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (

    <div>
      <Menu />
      <div className="ocontainer padding-bottom">
        <h1 className="text-center pb-4 pt-4">Total products Are {products.length}</h1>

        <Table className="tab text-center " striped responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>

            {products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td><span className="mr-4"> Stock: {product.stock}</span>  <span className="mr-4">,</span>  sold: {product.sold}</td>
                  <td><Link className="btn btn-success" to={`/admin/product/update/${product._id}`}>Update</Link></td>
                  <td><button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                          </button></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );

};

export default ManageProducts;
