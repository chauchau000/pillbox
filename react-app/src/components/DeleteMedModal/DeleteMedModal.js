import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal";
import { deleteUserMed, fetchUserMeds } from '../../store/session'

import './DeleteMedModal.css'

function DeleteMedModal({id}) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

    const handleDelete = async () => {
        const res = await dispatch(deleteUserMed(id))
        // console.log(res)
        if (res.ok) {
            await dispatch(fetchUserMeds())
            closeModal()
        } else {
            console.log('Something went wrong with the delete')
        }
    }

  return (
    <div id='delete-med-modal-container'>
        <p id="delete-med-text">Are you sure you want to delete this med?</p>
        <p id="delete-med-text-small">There is no going back ... </p>

        <div id="button-div-container">
        <button id='delete-button confirm-button' onClick={handleDelete}>Confirm delete</button>
        <button id='delete-button deny-button' onClick={closeModal}>Keep this med</button>

        </div>

    </div>
  )
}

export default DeleteMedModal