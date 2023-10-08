import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { fetchGlucose } from '../../store/session'
import './Glucose.css'

function Glucose() {
  const dispatch = useDispatch()


  useEffect( () => {
    dispatch(fetchGlucose())
  }, [dispatch])

  return (
    <div>Glucose</div>
  )
}

export default Glucose