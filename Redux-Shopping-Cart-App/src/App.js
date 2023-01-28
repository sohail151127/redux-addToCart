import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { fetchData, sendCartData } from "./store/cart-action";


let isFirstRender = true;

function App() {
  const dispatch = useDispatch();

  const notification = useSelector(state=>state.ui.notification)

  const cart = useSelector((state)=>{
    console.log("state of cart in app.js:",state)
    return state.cart})

  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])
  

 useEffect(() => {
  if(isFirstRender){
    isFirstRender = false;
    return;
  }
   
  // this is a "thunk" and action creator taking "cart" as a parameter so we need to dispatch it, that why we write it inside dispatch

  // console.log("cart.changed",cart.changed)

    if(cart.changed){
      dispatch(sendCartData(cart))
    }  
   
 }, [cart, dispatch])

 console.log("state.cart.itemsList in app.js",cart)
 
//  console.log("notification.type:",notification.type)
//  console.log("notification.message:",notification.message)

  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
     { !isLoggedIn && <Auth />}
     { isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
