import React from 'react';
import cl from "./ImagePreview.module.css";
import CloseButton from "../../UI/CloseButton/CloseButton";

const ImagePreview = ({imgURL, remove}) => {
    function removeThisImage() {
        remove(imgURL)
    }

    return (
        <div className={cl.main}>
            <img src={imgURL.url} className={cl.img}/>
            <CloseButton
                onClick={removeThisImage}
                top={2}
                right={2}
            />
        </div>
    );
};

export default ImagePreview;