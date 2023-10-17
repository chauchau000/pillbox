import React from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { deleteUserMed, fetchUserMeds, deleteAppt, fetchUserAppointments, deleteGlucose, fetchGlucose } from '../../store/session'

import './ConfirmDeleteModal.css'

function ConfirmDeleteModal({id, deleteItem}) {
    const dispatch = useDispatch();
    const location = useLocation();

	const { closeModal } = useModal();

    const handleDelete = async () => {
        if (location.pathname === '/appointments') {
            await dispatch (deleteAppt(id))
            await dispatch(fetchUserAppointments())
        } else if (location.pathname ==='/home') {
            await dispatch(deleteUserMed(id))
            await dispatch(fetchUserMeds())
        } else if (location.pathname === '/blood-glucose') {
            await dispatch(deleteGlucose(id))
            await dispatch(fetchGlucose())
        }

        closeModal()
    }


    return (
        <div id='delete-modal-container'>
            <p id='delete-text-header'>Confirm Delete</p>
            <p id="delete-med-text">Are you sure you want to delete this {deleteItem}?</p>
            <p id="delete-med-text-small">There is no going back ... </p>
            <div id="button-div-container">
                <button className='delete-button confirm-button' onClick={handleDelete}>Confirm delete</button>
                <button className='delete-button deny-button' onClick={closeModal}>Keep this {deleteItem}</button>
            </div>
        </div>
    )
}

export default ConfirmDeleteModal