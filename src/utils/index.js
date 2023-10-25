const PRESSURE_UNITS = 0.750062;

// меняет первую букву приложения на заглавную
export const capitalizeFirstLetter = (str) => {
    if (!str) return '';

    return str.charAt(0).toUpperCase() + str.slice(1);
};

// конвертер давления
export const getPressureMm = (hpa) => {
    return Math.round(hpa * PRESSURE_UNITS);
};

/* конвертер времени из UNIX в UTC
альтернативный вариант: 
new Date(unixTimestamp * 1000).toLocaleTimeString('ru-RU', { timeZone: 'Atlantic/Reykjavik' }) */
export const getTime = (unixTimestamp) => {
    return new Date(unixTimestamp * 1000).toUTCString().slice(-12, -4);
};
