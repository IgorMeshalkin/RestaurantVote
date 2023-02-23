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

export const saveRestaurantFields = async (restaurant, name, cuisine, price, address, phoneNumber, lunchTime) => {
    let response;
    if (!restaurant.id) {
        response = await RestaurantsAPI.create({
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            lunchTime: lunchTime,
            cuisine: cuisine,
            price: price
        })
    } else {
        if (restaurant.name !== name
            || restaurant.cuisine !== cuisine
            || restaurant.price !== price
            || restaurant.address !== address
            || restaurant.phoneNumber !== phoneNumber
            || restaurant.lunchTime !== lunchTime) {
            response = await RestaurantsAPI.update({
                ...restaurant,
                name: name,
                cuisine: cuisine,
                price: price,
                address: address,
                phoneNumber: phoneNumber,
                lunchTime: lunchTime
            })
        }
    }
    return response;
}

export const saveMenu = async (restaurant, fromFormMenu) => {
    let result = [];
    for (const fromFormMeal of fromFormMenu) {
        let isNew = true;
        for (const originalMeal of restaurant.menu) {
            if (originalMeal.id === fromFormMeal.id) {
                isNew = false;
                if (originalMeal.name !== fromFormMeal.name || originalMeal.weight !== fromFormMeal.weight) {
                    const response = await MealAPI.update(fromFormMeal)
                    result.push(response)
                }
            }
        }
        if (isNew) {
            const response = await MealAPI.create(fromFormMeal, restaurant.id)
            result.push(response)
        }
    }
    for (const meal of restaurant.menu) {
        let isDeleted = true;
        fromFormMenu.forEach(fromFormMealInner => {
            if (meal.id === fromFormMealInner.id) {
                isDeleted = false;
            }
        })
        if (isDeleted) {
            const response = await MealAPI.delete(meal.id)
            result.push(response)
        }
    }
    return result;
}

export const savePhotos = async (restaurant, newPhotoFiles, previewPhotos) => {
    let result = [];

    const formData = new FormData();
    for (const img of newPhotoFiles) {
        formData.set("image", img)
        PhotoAPI.getURL(formData).then(async resp => {
            const response = await PhotoAPI.create({url: resp}, restaurant.id)
            result.push(response)
        })
    }

    for (const originalPhoto of restaurant.photos) {
        let isDeleted = true;
        previewPhotos.forEach(previewPhoto => {
            if (previewPhoto.id === originalPhoto.id) {
                isDeleted = false;
            }
        })
        if (isDeleted) {
            const response = await PhotoAPI.delete(originalPhoto.id)
            result.push(response)
        }
    }

    return result;
}
