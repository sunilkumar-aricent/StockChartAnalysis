export const resetError = () => (
    { type: 'RESET_ERROR' }
);

export const setError = ({ message, isHtml = false, messageType = 'error'}) => {
    const error = { message, isHtml, messageType  };
    return { type: 'SET_ERROR', data: error };
}