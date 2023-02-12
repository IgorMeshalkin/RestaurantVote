import MealAPI from "../API/MealAPI";
import RestaurantsAPI from "../API/RestaurantsAPI";
import PhotoAPI from "../API/PhotoAPI";

export const validateRestaurantForm = (name,
                                       price,
                                       street,
                                       houseNumber,
                                       phoneNumber,
                                       lunchStart,
                                       lunchFinish,
                                       menu) => {
    let result = [];
    if (!name) {
        result.push("Поле \"Название\" не может быть пустым")
    }
    if (!price) {
        result.push("Поле \"Цена\" не может быть пустым")
    }
    if (!street) {
        result.push("Поле \"Улица\" не может быть пустым")
    }
    if (!houseNumber) {
        result.push("Поле \"Номер дома\" не может быть пустым")
    }
    if (!phoneNumber || phoneNumber.trim() === '+7') {
        result.push("Поле \"Номер телефона\" не может быть пустым")
    }

    const compareTimeResult = compareTime(lunchStart, lunchFinish)
    if (compareTimeResult) {
        result.push(compareTimeResult);
    }

    const checkMenuResult = checkMenu(menu)
    if (checkMenuResult) {
        checkMenuResult.forEach(er => {
            result.push(er);
        })
    }

    return result;
}

const compareTime = (startTime, endTime) => {
    const startArray = startTime.split(':')
    const endArray = endTime.split(':')

    if (parseInt(startArray[0]) > parseInt(endArray[0])) {
        return "Начало обеда не может быть позже чем окончание обеда\n"
    } else if ((parseInt(startArray[0]) === parseInt(endArray[0]))
        && (parseInt(startArray[1]) > parseInt(endArray[1]))) {
        return "Начало обеда не может быть позже чем окончание обеда\n"
    } else if ((parseInt(startArray[0]) === parseInt(endArray[0]))
        && (parseInt(startArray[1]) === parseInt(endArray[1]))) {
        return "Обед не может начинаться и заканчиваться в одно время\n"
    } else {
        return undefined;
    }
}

const checkMenu = (menu) => {
    let result = [];

    if (menu.length === 0) {
        result.push("В меню должен быть хотя бы один пункт")
    }

    menu.forEach(meal => {
        if (!meal.name && !meal.weight) {
            result.push("В пункте меню №" + (menu.indexOf(meal) + 1) + " не заполнены оба поля")
        } else if (!meal.name && meal.weight) {
            result.push("В пункте меню №" + (menu.indexOf(meal) + 1) + " не заполнено поле \"Название\"")
        } else if (meal.name && !meal.weight) {
            result.push("В пункте меню №" + (menu.indexOf(meal) + 1) + " не заполнено поле \"Вес\"")
        }
    })
    return result;
}

export const saveRestaurantFields = (restaurant, name, cuisine, price, address, phoneNumber, lunchTime) => {
    if (!restaurant.id) {
        RestaurantsAPI.create({
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            lunchTime: lunchTime,
            cuisine: cuisine,
            price: price
        }).then(r => console.log(r))
    } else {
        if (restaurant.name !== name
            || restaurant.cuisine !== cuisine
            || restaurant.price !== price
            || restaurant.address !== address
            || restaurant.phoneNumber !== phoneNumber
            || restaurant.lunchTime !== lunchTime) {
            RestaurantsAPI.update({
                ...restaurant,
                name: name,
                cuisine: cuisine,
                price: price,
                address: address,
                phoneNumber: phoneNumber,
                lunchTime: lunchTime
            }).then(r => console.log(r))
        }
    }
}

export const saveMenu = async (restaurant, fromFormMenu) => {
    for (const fromFormMeal of fromFormMenu) {
        let isNew = true;
        restaurant.menu.forEach(originalMeal => {
            if (originalMeal.id === fromFormMeal.id) {
                isNew = false;
                if (originalMeal.name !== fromFormMeal.name || originalMeal.weight !== fromFormMeal.weight) {
                    MealAPI.update(fromFormMeal).then(resp => console.log(resp))
                }
            }
        })
        if (isNew) {
            await MealAPI.create(fromFormMeal, restaurant.id)
        }
    }
    restaurant.menu.forEach(meal => {
        let isDeleted = true;
        fromFormMenu.forEach(fromFormMealInner => {
            if (meal.id === fromFormMealInner.id) {
                isDeleted = false;
            }
        })
        if (isDeleted) {
            MealAPI.delete(meal.id).then(resp => console.log(resp))
        }
    })
}

export const savePhotos = async (restaurant, newPhotoFiles, previewPhotos) => {
    const formData = new FormData();
    for (const img of newPhotoFiles) {
        formData.set("image", img)
        PhotoAPI.getURL(formData).then(async resp => {
            await PhotoAPI.create({url: resp}, restaurant.id)
        })
    }

    restaurant.photos.forEach(originalPhoto => {
        let isDeleted = true;
        previewPhotos.forEach(previewPhoto => {
            if (previewPhoto.id === originalPhoto.id) {
                isDeleted = false;
            }
        })
        if (isDeleted) {
            PhotoAPI.delete(originalPhoto.id)
        }
    })
}
