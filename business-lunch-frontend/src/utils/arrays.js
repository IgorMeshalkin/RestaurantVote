export const checkForNameMatches = (checkedArray, validatingArray) => {
    const result = checkedArray.filter(item => !isContainedHere(item, validatingArray))
    return result
}

function isContainedHere(file, array) {
    let result = false;
    array.forEach(i => {
            if (i.name === file.name) {
                result = true
                alert('Файл с именем: ' + file.name + ' уже добавлен. Добавить его повторно нельзя')
            }
        }
    )
    return result;
}

export const formatURLLinksToFileObjects = (linksArray) => {
    let result = [];
        linksArray.forEach(link => {
        result = [...result, {name: link, url: link}]
    })
    return result;
}

export const getCuisinesArray = () => {
    const result = [
        {id: 1, title: 'Любая', value: 'ALL'},
        {id: 2, title: 'Американская', value: 'AMERICAN'},
        {id: 3, title: 'Китайская', value: 'CHINESE'},
        {id: 4, title: 'Французская', value: 'FRENCH'},
        {id: 5, title: 'Индийская', value: 'INDIAN'},
        {id: 6, title: 'Итальянская', value: 'ITALIAN'},
        {id: 7, title: 'Японская', value: 'JAPANESE'},
        {id: 8, title: 'Мексиканская', value: 'MEXICAN'},
        {id: 9, title: 'Русская', value: 'RUSSIAN'},
        {id: 10, title: 'Тайская', value: 'THAI'},
        {id: 11, title: 'Турецкая', value: 'TURKISH'},
    ]
    return result
}

export const sortCuisineList = (list, selectedCuisine) => {
    const result = list.sort(item => {
        if (item.id === selectedCuisine.id) {
            return -1;
        } else {
            return 1;
        }
    })
    return result;
}

export const getCuisineByValue = (value) => {
    let result = getCuisinesArray()[1];
    if (value) {
        getCuisinesArray().forEach(cuisine => {
            if(cuisine.value === value) {
                result = cuisine;
            }
        })
    }
    return result;
}