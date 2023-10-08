import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { fetchUserMeds } from '../../store/session'
import { fetchAllMeds } from '../../store/meds'
import { fetchAllProviders } from '../../store/providers'
import './HomePage.css'

function HomePage() {
  const dispatch = useDispatch()


  useEffect( () => {
    dispatch(fetchAllMeds())
    dispatch(fetchAllProviders())
    dispatch(fetchUserMeds())
  }, [dispatch])

  return (
    <div id='home-page-container'>HomePage</div>
  )
}

export default HomePage