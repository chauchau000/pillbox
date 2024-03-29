import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGlucose } from '../../store/session'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'
import EditGlucoseModal from '../EditGlucoseModal/EditGlucoseModal'
import AddGlucoseModal from '../AddGlucoseModal/AddGlucoseModal'
import GlucoseChart from '../GlucoseChart/GlucoseChart'
import { format, isBefore } from 'date-fns'
import './Glucose.css'


function Glucose() {
  const dispatch = useDispatch()
  const glucoseData = useSelector(state => state.session.glucose);

  const glucoseArray = glucoseData?.filter((a) => {
    const today = new Date();
    const glucoseDate = new Date(a.date+'T00:00:00');

    return isBefore(glucoseDate,today)
  }).map(a => {
    return {
      ...a,
      dateObj: new Date(a.date + "T" + a.time)
    }
  })


  const levels = glucoseArray?.map((g) => g.level).slice(0, 60).reverse()
  const dates = glucoseArray?.map((g) => g.dateObj).slice(0, 60).reverse()



  useEffect(() => {
    dispatch(fetchGlucose())
  }, [dispatch])

  return (
    <div id='glucose-page-container'>
      <div id="glucose-chart-container">
        <GlucoseChart dates={dates} levels={levels} />
      </div>

      <div id="glucose-table-container">

        {glucoseArray?.length > 0 ?

          <table id="glucose-table">
            <thead>
              <tr id="glucose-table-header-container">
                <th className="glucose-table-item glucose-date">Date</th>
                <th className="glucose-table-item glucose-time">Time</th>
                <th className="glucose-table-item glucose-level">Glucose Level</th>
                <th className="glucose-table-item glucose-notes">Notes</th>
                <th className="glucose-table-item glucose-edit">Edit</th>
                <th className="glucose-table-item glucose-delete">Del</th>
              </tr>
            </thead>
            <tbody>
              {glucoseArray?.length > 0 && glucoseArray?.slice(0, 10).map((g, idx) =>
              (
                <tr className="glucose-item-container" key={idx}>
                  <th className="glucose-table-item glucose-date">{format(g.dateObj, "M/d/yy")}</th>
                  <th className="glucose-table-item glucose-time">{format(g.dateObj, "h:mm aa")}</th>
                  <th className="glucose-table-item glucose-level">{g.level}</th>
                  <th className="glucose-table-item glucose-notes">{g.notes}</th>
                  <th className="glucose-table-item glucose-edit edit-item">
                    <OpenModalButton modalComponent={<EditGlucoseModal glucose={g} />}
                      buttonHTML={<span className="material-symbols-outlined">edit</span>}
                      className='glucose-edit'
                    />
                  </th>
                  <th className="glucose-table-item glucose-delete delete-item">
                    <OpenModalButton modalComponent={<ConfirmDeleteModal id={g.id} deleteItem='glucose level' />}
                      buttonHTML={<span className="material-symbols-outlined">close</span>}
                      className='glucose-delete'
                    />
                    {/* <span className="material-symbols-outlined">close</span> */}
                  </th>
                </tr>
              ))}

            </tbody>

          </table>
          : <div id="no-glucose-data">You don't have any glucose levels yet. Add some now!</div>}
        <div id="bottom-button-container">

          <OpenModalButton modalComponent={<AddGlucoseModal />} buttonText='Add a new glucose level' className='add-glucose-modal' />
        </div>


      </div>


    </div>
  )
}

export default Glucose