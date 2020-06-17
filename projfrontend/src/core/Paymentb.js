import React,{useState,useEffect} from 'react'
import { loadCart, cartEmpty } from '../admin/helper/cartHelper';
import { Link } from 'react-router-dom';
import { getmeToken, processPayment } from '../admin/helper/paymentbhelper';
import {createOrder} from "../admin/helper/orderHelper"
import { isAuthenticated } from '../auth/helper';
import DropIn from "braintree-web-drop-in-react"
const Paymentb=({products,setReload=f=>f,reload=undefined})=> {
   
   const [info,setInfo]=useState({
       loading:false,
       success:false,
       clientToken:null,
       error:"",
       instance:{}
   })

   const userId=isAuthenticated() && isAuthenticated().user._id
   const token=isAuthenticated() && isAuthenticated().token
   const getToken = (userId, token) => {
    getmeToken(userId, token).then(info => {
       //console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };


  const showbtdropIn=()=>{
    return(
      <div>
       {info.clientToken!==null && products.length>0 ?(
        <div>
        <DropIn
          options={{ authorization: info.clientToken }}
          onInstance={(instance) => (info.instance = instance)}
        />
        <button className="btn btn-block btn-success"onClick={onPurchase}>Buy</button>
      </div>
       ):(<h3>Please login or add Something to caer</h3>)} 
      </div>
    )
  }
   useEffect(()=>{
    getToken(userId,token)
   },[])

   const onPurchase=()=>{
     setInfo({loading:true})
     let nonce;
     let getNonce=info.instance
      .requestPaymentMethod()
      .then(data=>{
        nonce=data.nonce
        const paymentData={
          paymentMethodNonce:nonce,
          amount:getAmount()
        }
        processPayment(userId,token,paymentData)
        .then(response=>{
          setInfo({...info,success:response.success,loading:false})
          console.log("payment success")
          const orderData={
            products:products,
            transaction_id:response.transaction.id,
            amount:response.transaction.amount
          }
          
          cartEmpty(()=>{
            console.log("Did we got crash")
          })
          
          setReload(!reload)
        })
        .catch(err=>{
          setInfo({loading:false,success:false})
          console.log("payment failed")

        })
      })
   }

   const getAmount=()=>{
     let amount=0
     products.map(p=>{
       amount=amount+ p.price
     })
     return amount
   }
   
    return (
        <div>
         <h3>Your bill is {getAmount()}$</h3> 
         {showbtdropIn()}  
        </div>
    )
}
export default Paymentb;