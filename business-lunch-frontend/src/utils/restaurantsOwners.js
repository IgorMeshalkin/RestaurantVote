export const isOwnedByCurrentUser = (restaurant, currentUser) => {
    let result = false
    if (currentUser) {
        currentUser.restaurants.map(rest => {
            if (restaurant.id === rest.id) {
                result = true;
            }
        })
        return result;
    }
}