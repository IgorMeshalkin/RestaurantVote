import React from 'react';
import './PhotoViewer.css'
import BigArrow from "../UI/BigArrows/BigArrow";
import BigCloseButton from "../UI/BigCloseButton/BigCloseButton";

const PhotoViewer = ({active, setActive, photos, indexOfCurrentPhoto, setIndexOfCurrentPhoto}) => {

    function replaceIndexOfPhoto(direction) {
        if (direction === "left") {
            indexOfCurrentPhoto === 0 ?
                setIndexOfCurrentPhoto(photos.length - 1) :
                setIndexOfCurrentPhoto(indexOfCurrentPhoto - 1)
        } else {
            indexOfCurrentPhoto === photos.length - 1 ?
                setIndexOfCurrentPhoto(0) :
                setIndexOfCurrentPhoto(indexOfCurrentPhoto + 1)
        }
    }

    return (
        <div className={active ? 'photoViewerBackground active' : 'photoViewerBackground'}>
            {
                photos[indexOfCurrentPhoto] &&
                <img
                    src={photos[indexOfCurrentPhoto].url}
                    className={active ? 'photoViewerImage active' : 'photoViewerImage'}
                    onClick={() => setActive(false)}
                />
            }

            <div className="photoViewerInfo" onClick={() => console.log(indexOfCurrentPhoto)}>
                {indexOfCurrentPhoto + 1} из {photos.length}
            </div>
            <div className="photoViewerCloseButtonContainer">
                <BigCloseButton
                    onClick={() => setActive(false)}
                />
            </div>
            <div className="photoViewerLeftArrowContainer">
                <BigArrow
                    direction="left"
                    onClick={replaceIndexOfPhoto}
                />
            </div>
            <div className="photoViewerRightArrowContainer">
                <BigArrow
                    direction="right"
                    onClick={replaceIndexOfPhoto}
                />
            </div>
        </div>
    );
};

export default PhotoViewer;