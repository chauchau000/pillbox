import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserMeds, fetchUserProviders, flipActive } from '../../store/session'
import { fetchAllMeds } from '../../store/meds'
import { fetchAllProviders } from '../../store/providers'

import OpenModalButton from '../OpenModalButton/OpenModalButton'
import './HomePage.css'
import AddMedModal from '../AddMedModal/AddMedModal'
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'
import MedChart from '../MedChart/MedChart'
import EditMedModal from '../EditMedModal/EditMedModal'
import AddProvider from '../AddProvider/AddProvider'



function HomePage() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const userMeds = useSelector(state => state.session.meds)



  const handleActive = async (med_id) => {
    const res = await dispatch(flipActive(med_id))

    if (res.ok) {
      await dispatch(fetchUserMeds())
    } 
  }

  useEffect(() => {
    dispatch(fetchAllMeds())
    dispatch(fetchAllProviders())
    dispatch(fetchUserMeds())
    dispatch(fetchUserProviders())
  }, [dispatch])

  return (
    <div id='home-page-container'>
      <MedChart />

      <div id="med-table-container">

        {userMeds?.length > 0 ?
          <>
            <p id="welcome-text">Welcome {user?.first_name}! Your medication list includes:</p>
            <table id="med-table">
              <thead>

                <tr id='med-table-header-container'>
                  <th className="med-table-item med-name">Medication</th>
                  <th className="med-table-item med-strength">Strength</th>
                  <th className="med-table-item med-directions">Directions</th>
                  <th className="med-table-item med-indication">Indication</th>
                  <th className="med-table-item med-provider">Provider</th>
                  <th className="med-table-item med-active">Active</th>
                  <th className="med-table-item med-edit">Edit</th>
                  <th className="med-table-item med-delete">Del</th>
                </tr>
              </thead>
              <tbody>
                {userMeds?.map((med, index) =>
                (
                  <tr key={index} className='med-item-container'>
                    <th className="med-table-item med-name">{med?.medication.name}</th>
                    <th className="med-table-item med-strength">{med?.strength}</th>
                    <th className="med-table-item med-directions">{med?.directions}</th>
                    <th className="med-table-item med-indication">{med?.indication}</th>
                    <th className="med-table-item med-provider">{med?.provider_id.name}</th>
                    <th className="med-table-item med-active active-item" onClick={() => handleActive(med.id)}>
                      {med?.active ? <div className='med-green-active'><span className='dot'>·</span>Active</div> : <div className='med-red-active'><span className='dot'>·</span> Inactive</div>}
                    </th>
                    <th className="med-table-item med-edit edit-item">
                      <OpenModalButton modalComponent={<EditMedModal userMed={med} />}
                        buttonHTML={<span className="material-symbols-outlined">edit</span>}
                        className='med-edit'
                      />
                    </th>
                    <th className="med-table-item med-delete delete-item">
                      <OpenModalButton modalComponent={<ConfirmDeleteModal id={med.id} deleteItem='med' />}
                        buttonHTML={<span className="material-symbols-outlined">close</span>}
                        className='med-delete'
                      />
                      {/* <span className="material-symbols-outlined">close</span> */}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
          : <div id="no-med-yet-text"> You have not added any medications yet. Add some now! </div>}

        <div id="bottom-button-container">

          <OpenModalButton modalComponent={<AddMedModal />} buttonText='Add a new medication' className='add-med-modal' />
          <OpenModalButton modalComponent={<AddProvider />} buttonText='Add a new provider' className='add-provider-modal' />
        </div>

      </div>




    </div>
  )
}

export default HomePage