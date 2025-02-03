import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { getMyreq } from '../store/myStockInfo'
const Dummy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleShowMyButton =()=>{
    navigate('./myStock')
      
  }

  return (
    <button onClick={handleShowMyButton}>Show my request</button>
  )
}

export default Dummy