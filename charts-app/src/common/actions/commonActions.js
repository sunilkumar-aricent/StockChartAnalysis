export const resetError = () => (
    { type: 'RESET_ERROR' }
);

export const setError = (message) => {
    const error = { message };
    return { type: 'SET_ERROR', data: error };
}