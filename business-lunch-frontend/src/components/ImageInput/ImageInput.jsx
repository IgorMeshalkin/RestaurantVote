import React, {useEffect, useState} from 'react';
import cl from './ImageInput.module.css'
import ImagePreview from "./ImagePreview/ImagePreview";
import {checkForNameMatches, formatBackendPhotosToFrontendPhotoObjects} from "../../utils/arrays";

const ImageInput = ({photo,imagePreview, setImagePreview, images, setImages}) => {
    const [countSelectedImages, setCountSelectedImages] = useState(0)

    useEffect(() => {
        if (photo) {
            setImagePreview(formatBackendPhotosToFrontendPhotoObjects(photo))
        }
    }, [])

    useEffect(() => {
        setCountSelectedImages(imagePreview.length)
    }, [imagePreview])

    function handlerOnChange(event) {
        const fileList = checkForNameMatches([...event.target.files], images)
        setImages([...images, ...fileList])
        let urlArray = []
        for (let i = 0; i < fileList.length; i++) {
            urlArray = ([...urlArray, {'name': fileList[i].name, 'url': URL.createObjectURL(fileList[i])}])
        }
        setImagePreview([...imagePreview, ...urlArray])
    }

    function removeImageFromPreview(imgUrlObject) {
        setImagePreview(imagePreview.filter(url => url.url !== imgUrlObject.url))
        setImages(images.filter(img => img.name !== imgUrlObject.name))
    }

    return (
        <div className={cl.main}>
            <input id="input" type="file" multiple onChange={handlerOnChange} className={cl.input}/>
            <div className={cl.header}>
                <label htmlFor="input" className={cl.inputButton}>Выбрать файлы</label>
                <div className={cl.inputInfo}>Выбрано {countSelectedImages} файлов</div>
            </div>
            <div className={cl.previewWindow}>
                {imagePreview &&
                    imagePreview.map(imgURL =>
                        <ImagePreview
                            key={imgURL.name}
                            imgURL={imgURL}
                            remove={removeImageFromPreview}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default ImageInput;