import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";

import './AddProvider.css'

function AddProvider() {
    const allProviders = useSelector(state => state.providers)
    


  return (
    <div>AddProvider</div>
  )
}

export default AddProvider