export const isOwnedByCurrentUser = (restaurant, currentUser) => {
        return (restaurant.userId && currentUser) ? restaurant.userId === currentUser.id : false;
}