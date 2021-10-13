import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialstate ={
  loading:false,
  cart:cartItems,
  total:0,
  amount:0
}


const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialstate)

  const clearcart = () =>{
    dispatch({
      type: 'CLEARCART'
    })
  }

  const removeitem =(id) =>{
    dispatch({
      type:'REMOVEITEM',
      payload:id
    })
  }

  const increaseitem =(id) =>{
    dispatch({
      type:'INCREASEITEM',
      payload:id
    })
  }

  const decreaseitem =(id) =>{
    dispatch({
      type:'DECREASEITEM',
      payload:id
    })
  }

  useEffect(()=>{
    dispatch({
      type:'GETTOTALS'
    })
  },[state.cart])

  const fetchdata = async() =>{
    dispatch({
      type:'LOADING'
    })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({
      type:'DISPLAYITEMS',
      payload:cart
    })
  }

  useEffect(()=>{
    fetchdata()
  },[])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearcart,
        removeitem,
        increaseitem,
        decreaseitem
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
