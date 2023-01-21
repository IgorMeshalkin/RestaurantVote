export const validateCredentialsForRegistration = (userName, firstPassword, secondPassword) => {
    if (userName.length === 0) {
        return 'Логин не может быть пустым'
    } else if (firstPassword.length === 0) {
        return 'Пароль не может быть пустым'
    } else if (firstPassword.length < 4) {
        return 'Пароль должен содержать не меньше 8-ми символов'
    } else if (firstPassword !== secondPassword) {
        return 'Пароли не совпадают'
    }
    return null;
}
