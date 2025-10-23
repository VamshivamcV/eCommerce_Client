export const localCartFromStorage = () => {
    try {
        const data = localStorage.getItem('cartItems');
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const saveCartToStorage = (cartItems: any[]) => {
    try {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch {
        //
    }
};