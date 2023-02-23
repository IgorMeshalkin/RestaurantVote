import React, {useEffect, useRef, useState} from 'react';
import './RestaurantForm.css'
import InputText from "../UI/InputText/InputText";
import InputTime from "../UI/InputTime/InputTime";
import SmallDropDownList from "../UI/SmallDropDownList/SmallDropDownList";
import {getCuisineByValue, getCuisinesArray, sortCuisineList} from "../../utils/arrays";
import MenuEditor from "./MenuEditor/MenuEditor";
import ImageInput from "../ImageInput/ImageInput";
import {combineAddress, combineLunchTime, splitAddress, splitLunchTime} from "../../utils/strings";
import PlusButton from "../UI/PlusButton/PlusButton";
import {saveMenu, savePhotos, saveRestaurantFields, validateRestaurantForm} from "../../utils/restaurantSave";
import LineLoader from "../Loaders/LineLoader";
import {useNavigate} from "react-router-dom";

const RestaurantForm = ({restaurant, isUpdate}) => {
    const navigate = useNavigate();

    const menuEditorRef = useRef()
    const restaurantNameRef = useRef()
    const priceRef = useRef()
    const streetNameRef = useRef()
    const houseNumberRef = useRef()
    const phoneNumberRef = useRef()
    const validationResultRef = useRef()
    const firstUpdate = useRef(true);

    const [selectedCuisine, setSelectedCuisine] = useState(getCuisineByValue(restaurant.cuisine))
    const [cuisinesList, setCuisinesList] = useState(getCuisinesArray().splice(1, 10))
    const [menu, setMenu] = useState(restaurant.menu ? restaurant.menu : [{
        id: Date.now(),
        name: '',
        weight: ''
    }])
    const [startLunchTime, setStartLunchTime] = useState(isUpdate ? splitLunchTime(restaurant.lunchTime)[0] : "12:00")
    const [finishLunchTime, setFinishLunchTime] = useState(isUpdate ? splitLunchTime(restaurant.lunchTime)[1] : "14:00")

    const [imageFiles, setImageFiles] = useState([])
    const [imagePreview, setImagePreview] = useState([])

    const [validationResult, setValidationResult] = useState([])

    const [isSavingForm, setIsSavingForm] = useState(false)

    //Логика выбора типа кухни из выпадающего списка
    useEffect(() => {
        setCuisinesList(sortCuisineList([...cuisinesList], selectedCuisine))
    }, [selectedCuisine])

    //данный useEffect служит для того что бы окно меню меняло размер плавно с первого нажатия
    //если его убрать первое изменение размера (метод replaceMenuSize) будет происходить резко.
    useEffect(() => {
        const menuSize = menuEditorRef.current.getBoundingClientRect().height
        menuEditorRef.current.setAttribute("style", "height: " + menuSize + "px")
    }, [])

    //Меняет высоту окна меню при добавлении-удалении пункта меню.
    function replaceMenuSize(value) {
        const menuSize = menuEditorRef.current.getBoundingClientRect().height

        if (value > 0) {
            menuEditorRef.current.setAttribute("style", "height: " + (menuSize + 41) + "px")
        } else {
            menuEditorRef.current.setAttribute("style", "height: " + (menuSize - 41) + "px")
        }
    }

    function addMealToMenu() {
        replaceMenuSize(1)
        const newMenu = [...menu];
        newMenu.push({id: Date.now(), name: '', weight: ''})
        setMenu(newMenu)
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        } else {
            validationResultRef.current.scrollIntoView({block: "center", behavior: "smooth"});
        }
    }, [validationResult])

    async function saveForm() {
        setIsSavingForm(true)
        let result = [];
        const fieldsResp = await saveRestaurantFields(restaurant
            , restaurantNameRef.current.value
            , selectedCuisine.value
            , priceRef.current.value
            , combineAddress(streetNameRef.current.value, houseNumberRef.current.value)
            , phoneNumberRef.current.value
            , combineLunchTime(startLunchTime, finishLunchTime))
        result.push(fieldsResp)

        const menuResp = await saveMenu(restaurant, menu)
        result.push(menuResp)

        const photoResp = await savePhotos(restaurant, imageFiles, imagePreview)
        result.push(photoResp)

        return result;
    }

    function submit() {
        const result = validateRestaurantForm(restaurantNameRef.current.value, priceRef.current.value, streetNameRef.current.value, houseNumberRef.current.value, phoneNumberRef.current.value, startLunchTime, finishLunchTime, menu)
        if (result.length > 0) {
            setValidationResult(result)
        } else {
            saveForm().then(() => {
                setIsSavingForm(false)
                navigate(-1)
            }).catch(() => {
                setIsSavingForm(false)
                setValidationResult([...validationResult, 'Не удалось сохранить. Попробуйте ещё раз.'])
            })
        }
    }

    return (
        <div className="rfMain">
            <div className="rfGeneralTitle" onClick={() => setIsSavingForm(!isSavingForm)}>
                {isUpdate ? 'Изменить ресторан' : 'Создать ресторан'}
            </div>

            <div className="rfManyInputContainer">
                <div className="rfInputContainer perс60">
                    <div className="rfInputTitle">Название</div>
                    <InputText value={isUpdate ? restaurant.name : undefined} ref={restaurantNameRef}/>
                </div>
                <div className="rfInputContainer perс40">
                    <div className="rfInputTitle">Тип кухни</div>
                    <div className="rfDropDownContainer">
                        <SmallDropDownList list={cuisinesList} selectItem={setSelectedCuisine}/>
                    </div>
                </div>
                <div className="rfInputContainer perс30">
                    <div className="rfInputTitle">Цена</div>
                    <InputText value={isUpdate ? restaurant.price : undefined} ref={priceRef}/>
                </div>
            </div>
            <div className="rfManyInputContainer">
                <div className="rfInputContainer  perс60">
                    <div className="rfInputTitle">Улица</div>
                    <InputText value={isUpdate ? splitAddress(restaurant.address)[0] : undefined}
                               ref={streetNameRef}/>
                </div>
                <div className="rfInputContainer  perс40">
                    <div className="rfInputTitle">Номер дома</div>
                    <InputText value={isUpdate ? splitAddress(restaurant.address)[1] : undefined}
                               ref={houseNumberRef}/>
                </div>
            </div>
            <div className="rfManyInputContainer">
                <div className="rfInputContainer">
                    <div className="rfInputTitle">Телефон</div>
                    <InputText value={isUpdate ? restaurant.phoneNumber : "+7 "}
                               ref={phoneNumberRef}/>
                </div>
                <div className="rfInputContainer perс70">
                    <div className="rfInputTitle">Начало обеда</div>
                    <InputTime
                        value={startLunchTime}
                        onChange={setStartLunchTime}
                    />
                </div>
                <div className="rfInputContainer perс70">
                    <div className="rfInputTitle">Окончание обеда</div>
                    <InputTime
                        value={finishLunchTime}
                        onChange={setFinishLunchTime}
                    />
                </div>
            </div>
            <div className="rfManyInputContainer" ref={menuEditorRef}>
                <div className="rfInputContainer forMenu">
                    <div className="rfInputTitle">Меню:</div>
                    <MenuEditor
                        menu={menu}
                        setMenu={setMenu}
                        replaceMenuSize={replaceMenuSize}
                    />
                </div>
                <div className="rfPlusButtonContainer">
                    <PlusButton onClick={addMealToMenu}/>
                </div>
            </div>

            <div className="rfManyInputContainer">
                <div className="rfInputContainer">
                    <div className="rfInputTitle">Фотографии:</div>
                    <ImageInput
                        photo={restaurant.photos}
                        imagePreview={imagePreview}
                        setImagePreview={setImagePreview}
                        images={imageFiles}
                        setImages={setImageFiles}
                    />
                </div>
            </div>

            <div className="rfLoaderContainer">
                {
                    isSavingForm &&
                    <LineLoader/>
                }
            </div>

            <div className="rfSubmitButton" onClick={submit}>Сохранить</div>

            <div className="rfInputContainer" ref={validationResultRef}>
                {
                    validationResult.map(error =>
                        <span
                            key={error}
                            className="rfValidateResult">
                            {error}
                        </span>
                    )
                }
            </div>
        </div>
    );
};

export default RestaurantForm;