import React,{useState,useEffect} from "react";
import "../styles.css"
import {API} from "../backend";
import Base from "./Base";
import Card from "./Card"
import { loadCart } from "../admin/helper/cartHelper";
import Paymentb from "./Paymentb";

 const Cart=()=> {
    const[products,setProducts]=useState([])
    const[reload,setReload]=useState(false)
    useEffect(()=>{
        setProducts(loadCart())
    },[reload])
    const loadAllProducts=products=>{
       return(
           <div>
               <h2>This section is to load products</h2>
               {products.map((product,index)=>(
                   <Card
                   key={index}
                   product={product}
                   removeFromCart={true}
                   addtoCart={false}
                   setReload={setReload}
                   reload={reload}
                   
                   
                   />)
               )}
           </div>
       )
   }
   const loadCheckout=()=>{
    return(
        <div>
            <h2>This section is for Checkout</h2>
        </div>
    )
}  


  return (
    <Base title="Cart page" description="Welcome to The Cart">
      <div className="row text-center">
       <div className="col-6">{products.length>0 ?loadAllProducts(products) :(<h3>No Products in Cart</h3>)}</div>
       <div className="col-6"> <Paymentb products={products} setReload={setReload}/></div>
       </div>
    </Base>
  );
}
export default Cart;