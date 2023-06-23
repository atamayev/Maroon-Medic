export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
  
export const days = [...Array(31).keys()].map(i => i + 1);

const currentYear = new Date().getFullYear();

export const years = Array.from({length: 63}, (_, i) => currentYear - i - 18); // Renders an array from 18 years ago to 63 minus that year.  

export const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
