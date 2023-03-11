import React, {useContext, useEffect, useState} from 'react';
import './DeleteForm.css'
import RegularButton from "../UI/RegularButton/RegularButton";
import LineLoader from "../Loaders/LineLoader";
import RestaurantsAPI from "../../API/RestaurantsAPI";
import {AuthContext} from "../../context/context";

const DeleteForm = ({itemForDelete, setModalActive, updatePage}) => {
    const {currentUser} = useContext(AuthContext)
    const [isDeleting, setIsDeleting] = useState(false)

    async function deleteAction() {
        setIsDeleting(true)
        const res = RestaurantsAPI.delete(itemForDelete, currentUser.username, currentUser.password)
        return res
    }

    function submit() {
        deleteAction().then(res => {
            setIsDeleting(false)
            setModalActive(false)
            updatePage()
        })
    }

    return (
        <div className="dfMain">
            <span className="dfQuestion">Вы действительно хотите удалить ресторан</span>
            <span className="dfItemsName">"{itemForDelete.name}"?</span>

            <div className="dfLoaderContainer">
                {
                    isDeleting &&
                    <LineLoader/>
                }
            </div>

            <div className="dfButtonsContainer">
                <RegularButton
                    onClick={submit}
                >
                    Да
                </RegularButton>
                <span
                    onClick={() => setModalActive(false)}
                    className="dfCancelButton"
                >
                    Отмена
                </span>
            </div>
        </div>
    );
};

export default DeleteForm;