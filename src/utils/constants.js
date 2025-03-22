export const MONGO_OBJECT_ID_REGX = /^[0-9a-fA-F]{24}$/

export const  sortByValues = ["HIGHEST","LOWEST", "NEWEST", "OLDEST"]
export const filterByValues = ["TODAY", "THIS_WEEK",  "THIS_MONTH"]
export const RupeeSymbol = "₹"
export const FirstLetterCapital = (str) => str.charAt(0).toUpperCase() + str.slice(1)


//2024-Apr
export const PastMonthCollection = [
    `${new Date().getFullYear()-1}-Jan`,
    `${new Date().getFullYear()-1}-Feb`,
    `${new Date().getFullYear()-1}-Mar`,
    `${new Date().getFullYear()-1}-Apr`,
    `${new Date().getFullYear()-1}-May`,
    `${new Date().getFullYear()-1}-Jun`,
    `${new Date().getFullYear()-1}-Jul`,
    `${new Date().getFullYear()-1}-Aug`,
    `${new Date().getFullYear()-1}-Sep`,
    `${new Date().getFullYear()-1}-Oct`,
    `${new Date().getFullYear()-1}-Nov`,
    `${new Date().getFullYear()-1}-Dec`,
]
