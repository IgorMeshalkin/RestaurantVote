import React, {useEffect, useRef, useState} from 'react';
import cl from './RestaurantPhotosBlock.module.css'
import RegularPhoto from "./RegularPhoto/RegularPhoto";
import PhotoViewer from "../PhotoViewer/PhotoViewer";

const RestaurantPhotosBlock = (props) => {
    const mainRef = useRef()

    const [bigPhoto, setBigPhoto] = useState()
    const [indexPhotoForViewer, setIndexPhotoForViewer] = useState()
    const [photoViewerActive, setPhotoViewerActive] = useState(false)

    useEffect(() => {
        setBigPhoto(props.photos[0])
        props.getWidth(mainRef.current.getBoundingClientRect().width)
    }, [])

    function replacePhotoForViewer(photo) {
        setIndexPhotoForViewer(props.photos.indexOf(photo))
        setPhotoViewerActive(true)
    }

    return (
        <div className={cl.main} ref={mainRef}>
            {
                bigPhoto &&
                <img
                    src={bigPhoto.url}
                    className={cl.bigPhoto} alt='Фото не найдено'
                    onClick={() => replacePhotoForViewer(bigPhoto)}
                />
            }

            {props.photos.map(photo =>
                <RegularPhoto
                    key={photo.id}
                    photo={photo}
                    setBigPhoto={setBigPhoto}
                    replacePhotoForViewer={replacePhotoForViewer}
                />
            )}

            <PhotoViewer
                active={photoViewerActive}
                setActive={setPhotoViewerActive}
                photos={props.photos}
                indexOfCurrentPhoto={indexPhotoForViewer}
                setIndexOfCurrentPhoto={setIndexPhotoForViewer}
            />
        </div>
    );
};

export default RestaurantPhotosBlock;