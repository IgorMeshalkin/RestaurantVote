import React, {useEffect, useRef, useState} from 'react';
import './Loader.css'
import pizza0 from '../../images/loader/pizza0.png'
import pizza1 from '../../images/loader/pizza1.png'
import pizza2 from '../../images/loader/pizza2.png'
import pizza3 from '../../images/loader/pizza3.png'
import pizza4 from '../../images/loader/pizza4.png'
import pizza5 from '../../images/loader/pizza5.png'

const PizzaLoader = () => {
    const [imageStatus, setImageStatus] = useState({
        zero: true,
        first: false,
        second: false,
        third: false,
        fourth: false,
        fifth: false
    })
    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            action()
            const newCurrentImage = currentImage === 5 ? 0 : currentImage + 1
            setCurrentImage(newCurrentImage)
        }, 800);

        return () => clearTimeout(timeoutId)
    }, [imageStatus])

    function action() {
        switch (currentImage) {
            case 0:
                setImageStatus({...imageStatus, zero: false, first: true})
                break;
            case 1:
                setImageStatus({...imageStatus, first: false, second: true})
                break;
            case 2:
                setImageStatus({...imageStatus, second: false, third: true})
                break;
            case 3:
                setImageStatus({...imageStatus, third: false, fourth: true})
                break;
            case 4:
                setImageStatus({...imageStatus, fourth: false, fifth: true})
                break;
            case 5:
                setImageStatus({...imageStatus, fifth: false, zero: true})
                break;
        }
    }

    function PizzaImg0() {
        return (
            <img src={pizza0} className={imageStatus.zero ? "pizza active" : "pizza"}/>
        );
    }

    function PizzaImg1() {
        return (
            <img src={pizza1} className={imageStatus.first ? "pizza active" : "pizza"}/>
        );
    }

    function PizzaImg2() {
        return (
            <img src={pizza2} className={imageStatus.second ? "pizza active" : "pizza"}/>
        );
    }

    function PizzaImg3() {
        return (
            <img src={pizza3} className={imageStatus.third ? "pizza active" : "pizza"}/>
        );
    }

    function PizzaImg4() {
        return (
            <img src={pizza4} className={imageStatus.fourth ? "pizza active" : "pizza"}/>
        );
    }

    function PizzaImg5() {
        return (
            <img src={pizza5} className={imageStatus.fifth ? "pizza active" : "pizza"}/>
        );
    }

    return (
        <div>
            <PizzaImg0/>
            <PizzaImg1/>
            <PizzaImg2/>
            <PizzaImg3/>
            <PizzaImg4/>
            <PizzaImg5/>
        </div>
    );
};

export default PizzaLoader;