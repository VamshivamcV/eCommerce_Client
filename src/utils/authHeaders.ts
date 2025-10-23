export const getAuthHeaders = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) return {};

    const token = JSON.parse(userInfo).token;

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};