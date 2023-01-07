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