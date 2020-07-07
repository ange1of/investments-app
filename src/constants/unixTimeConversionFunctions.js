export const unixTimeConversionFunctions = {
    '5min': (time) => {
        let dateObj = new Date(time);
        return `${String(dateObj.getHours()).padStart(2, 0)}:${String(dateObj.getMinutes()).padStart(2,0)}`;
    },
    '1hour': (time) => {
        let dateObj = new Date(time);
        return `${String(dateObj.getHours()).padStart(2, 0)}:${String(dateObj.getMinutes()).padStart(2,0)}`;
    },
    '1day': (time) => {
        let dateObj = new Date(time);
        return `${String(dateObj.getHours()).padStart(2, 0)}:${String(dateObj.getMinutes()).padStart(2,0)}`;
    },
    '1month': (time) => {
        let dateObj = new Date(time);
        return `${String(dateObj.getDate()).padStart(2, 0)}/${String(dateObj.getMonth()+1).padStart(2, 0)}`;
    },
    '1year': (time) => {
        let dateObj = new Date(time);
        return `${String(dateObj.getMonth()+1).padStart(2, 0)}/${String(dateObj.getFullYear()).padStart(2, 0)}`;
    },
};