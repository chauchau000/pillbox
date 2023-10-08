import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
    <div id='home-page-container'>HomePage
      <div id='schedule-container'>
        <div id="am-container" className='section-container'>AM</div>
        <div id="noon-container" className='section-container'>NOON</div>
        <div id="evening-container" className='section-container'>PM</div>
        <div id="bedtime-container" className='section-container'>BEDTIME</div>

      </div>

      <div>
        <p id="welcome-text">Welcome to pillbox</p>
      </div>
    
    
    
    
    
    </div>
  )
}

export default HomePage