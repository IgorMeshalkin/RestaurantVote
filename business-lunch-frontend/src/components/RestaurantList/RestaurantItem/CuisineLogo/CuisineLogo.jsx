import React from 'react';
import cl from './CuisineLogo.module.css'
import americanFood from "../../../../images/food/AmericanFood.png";
import chineseFood from '../../../../images/food/ChineseFood.png'
import frenchFood from '../../../../images/food/FrenchFood.png'
import indianFood from '../../../../images/food/IndianFood.png'
import italianFood from '../../../../images/food/ItalianFood.png'
import japaneseFood from '../../../../images/food/JapaneseFood.png'
import mexicanFood from '../../../../images/food/MexicanFood.png'
import russianFood from '../../../../images/food/RussianFood.png'
import thaiFood from '../../../../images/food/ThaiFood.png'
import turkishFood from '../../../../images/food/TurkishFood.png'
import americanFlag from '../../../../images/flags/AmericanFlag.png'
import chineseFlag from '../../../../images/flags/ChineseFlag.png'
import frenchFlag from '../../../../images/flags/FrenchFlag.png'
import indianFlag from '../../../../images/flags/IndianFlag.png'
import italianFlag from '../../../../images/flags/ItalianFlag.png'
import japaneseFlag from '../../../../images/flags/JapaneseFlag.png'
import mexicanFlag from '../../../../images/flags/MexicanFlag.png'
import russianFlag from '../../../../images/flags/RussianFlag.png'
import thaiFlag from '../../../../images/flags/ThaiFlag.png'
import turkishFlag from '../../../../images/flags/TurkishFlag.png'

const CuisineLogo = ({cuisine}) => {

    function FoodImage() {
        switch (cuisine) {
            case 'AMERICAN':
                return (
                    <div className={cl.photo}>
                        <img src={americanFood} className={cl.img}/>
                    </div>
                );
                break;
            case 'CHINESE':
                return (
                    <div className={cl.photo}>
                        <img src={chineseFood} className={cl.img}/>
                    </div>
                );
                break;
            case 'FRENCH':
                return (
                    <div className={cl.photo}>
                        <img src={frenchFood} className={cl.img}/>
                    </div>
                );
                break;
            case 'INDIAN':
                return (
                    <div className={cl.photo}>
                        <img src={indianFood} className={cl.img}/>
                    </div>
                );
                break;
            case 'ITALIAN':
                return (
                    <div className={cl.photo}>
                        <img src={italianFood} className={cl.img}/>
                    </div>
                );
                break;
            case 'JAPANESE':
                return (
                    <div className={cl.photo}>
                        <img src={japaneseFood} className={cl.img}/>
                    </div>
                );
                break;
            case 'MEXICAN':
                return (
                    <div className={cl.photo}>
                        <img src={mexicanFood} className={cl.img}/>
                    </div>
                );
                break;
            case 'RUSSIAN':
                return (
                    <div className={cl.photo}>
                        <img src={russianFood} className={cl.img}/>
                    </div>
                );
                break;
            case 'THAI':
                return (
                    <div className={cl.photo}>
                        <img src={thaiFood} className={cl.img}/>
                    </div>
                );
                break;
            case 'TURKISH':
                return (
                    <div className={cl.photo}>
                        <img src={turkishFood} className={cl.img}/>
                    </div>
                );
                break;
        }
    }

    function Flag() {
        switch (cuisine) {
            case 'AMERICAN':
                return (
                        <img src={americanFlag} className={cl.flag}/>
                );
                break;
            case 'CHINESE':
                return (
                    <img src={chineseFlag} className={cl.flag}/>
                );
                break;
            case 'FRENCH':
                return (
                    <img src={frenchFlag} className={cl.flag}/>
                );
                break;
            case 'INDIAN':
                return (
                    <img src={indianFlag} className={cl.flag}/>
                );
                break;
            case 'ITALIAN':
                return (
                    <img src={italianFlag} className={cl.flag}/>
                );
                break;
            case 'JAPANESE':
                return (
                    <img src={japaneseFlag} className={cl.whiteFlag}/>
                );
                break;
            case 'MEXICAN':
                return (
                    <img src={mexicanFlag} className={cl.flag}/>
                );
                break;
            case 'RUSSIAN':
                return (
                    <img src={russianFlag} className={cl.flag}/>
                );
                break;
            case 'THAI':
                return (
                    <img src={thaiFlag} className={cl.flag}/>
                );
                break;
            case 'TURKISH':
                return (
                    <img src={turkishFlag} className={cl.flag}/>
                );
                break;
        }
    }

    return (
        <div className={cl.main}>
            <FoodImage/>
            <Flag/>
            <div className={cl.inscription}>
                {cuisine}
            </div>
        </div>
    );
};

export default CuisineLogo;