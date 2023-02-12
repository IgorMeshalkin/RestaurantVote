import React, {useEffect, useRef} from 'react';
import cl from '../RestaurantPhotosBlock.module.css'

const RegularPhoto = ({photo, setBigPhoto, replacePhotoForViewer}) => {
    const imageRef = useRef()

    useEffect(() => {
        const ref = imageRef.current;
        const setTrue = (event) => setBigPhoto(photo);
        ref.addEventListener('mouseover', setTrue);
        return () => {
            ref.removeEventListener('mouseover', setTrue);
        }
    }, [])

    return (
            <img
                src={photo.url}
                className={cl.regularPhoto}
                alt='Фото не найдено'
                ref={imageRef}
                onClick={() => replacePhotoForViewer(photo)}
            />
    );
};

export default RegularPhoto;