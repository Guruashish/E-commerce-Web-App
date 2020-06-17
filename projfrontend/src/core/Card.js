import React,{useState,useEffect} from 'react'
import ImageHelper from '../admin/helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart,removeItemFromCart } from '../admin/helper/cartHelper';

    const Card = ({
        product,
        addtoCart=true,
        removeFromCart=false,
        setReload=f=>f,
        //function(f){return f}
        reload=undefined

    }) => {

        const[redirect,setRedirect]=useState(false)
        const [count,setCount]=useState(product.count)

        const cartTitle=product ? product.name:"A Photo From Website"
        const cartDescription=product ? product.description:"Default Description"
        const cartPrice=product ? product.price:"Default"

        const addToCart=()=>{
          addItemToCart(product,()=>setRedirect(true))
        }


        const getARedirect=(redirect)=>{
          if(redirect){
          return <Redirect to="/cart"/>
        }
      }

        const showAddToCart=()=>{
            return(
                addtoCart && (
                    <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                  >
                    Add to Cart
                  </button>
                )
            )
        }
        const showRemoveFromCart=()=>{
          return(
            removeFromCart && (<button
                onClick={() => {
                  removeItemFromCart(product._id)
                  setReload(!reload);
                  
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>)
          )
        }
        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cartTitle}</div>
            {getARedirect(redirect)}
            <ImageHelper product={product}/>
            <div className="card-body">
              
              <p className="lead bg-success font-weight-normal text-wrap">
                {cartDescription}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
              <div className="row">
                <div className="col-12">
                  {showAddToCart(addtoCart)}
                </div>
                <div className="col-12">
                  {showRemoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };


   export default Card;
