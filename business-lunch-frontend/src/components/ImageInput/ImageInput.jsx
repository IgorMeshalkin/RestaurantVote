import React, {useEffect, useState} from 'react';
import cl from './ImageInput.module.css'
import ImagePreview from "./ImagePreview/ImagePreview";
import {checkForNameMatches} from "../../utils/arrays";
import PhotoAPI from "../../API/PhotoAPI";

const ImageInput = () => {
    const [images, setImages] = useState([])
    const [imagePreviewURL, setImagePreviewURL] = useState([])
    const [imageRemoteServerURL, setImageRemoteServerURL] = useState([])
    const [countSelectedImages, setCountSelectedImages] = useState(0)

    useEffect(() => {
        setCountSelectedImages(imagePreviewURL.length)
    }, [imagePreviewURL])

    function handlerOnChange(event) {
        const fileList = checkForNameMatches([...event.target.files], images)
        setImages([...images, ...fileList])
        let urlArray = []
        for (let i = 0; i < fileList.length; i++) {
            urlArray = ([...urlArray, {'name': fileList[i].name, 'url': URL.createObjectURL(fileList[i])}])
        }
        setImagePreviewURL([...imagePreviewURL, ...urlArray])
    }

    function removeImageFromPreview(imgUrlObject) {
        setImagePreviewURL(imagePreviewURL.filter(url => url.url !== imgUrlObject.url))
        setImages(images.filter(img => img.name !== imgUrlObject.name))
    }

    async function save() {
        const formData = new FormData();
        let array = []
        for (const img of images) {
            formData.set("image", img)
            const imgUrl = await PhotoAPI.savePhoto(formData)
            array = [...array, imgUrl]
        }
        setImageRemoteServerURL([...imageRemoteServerURL, ...array])
    }

    // function printURLs() {
    //     console.log(imageRemoteServerURL.length)
    //     imageRemoteServerURL.forEach(i => console.log(i))
    // }

    return (
        <div className={cl.main}>
            <input id="input" type="file" multiple onChange={handlerOnChange} className={cl.input}/>
            <div className={cl.header}>
                <label htmlFor="input" className={cl.inputButton}>Выбрать файлы</label>
                <div className={cl.inputInfo}>Выбрано {countSelectedImages} файлов</div>
            </div>
            <div className={cl.previewWindow}>
                {imagePreviewURL &&
                    imagePreviewURL.map(imgURL =>
                        <ImagePreview
                            key={imgURL.name}
                            imgURL={imgURL}
                            remove={removeImageFromPreview}
                        />
                    )
                }
            </div>
            <div className={cl.inputButton} onClick={save}>Сохранить</div>
            {/*<div className={cl.inputButton} onClick={printURLs}>Показать</div>*/}
        </div>
    );
};

export default ImageInput;