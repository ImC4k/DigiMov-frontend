import visa_icon from './card_image/visa_icon_64.png'
import unionpay_icon from './card_image/unionpay_icon_64.png'
import master_icon from './card_image/master_icon_64.png'

export const CARD_NUMBER_LIMIT = 16;
export const HOLDER_NAME_LIMIT = 30;
export const CURRENT_MONTH = 12;
export const CURRENT_YEAR = 20;

export const EMPTY = 'EMPTY';
export const INVALID = 'INVALID';
export const UNSUPPORTED_CARD = 'UNSUPPORTED_CARD';
export const VISA = 'VISA';
export const MASTER = 'MASTER';
export const UNIONPAY = 'UNIONPAY'


//export const cardType = [INVALID, UNSUPPORTED_CARD, VISA, MASTER, UNIONPAY];

export const isCreditCardExpriyValid = (month, year) =>{
    return isCardExpriyDateMonthValid(month) && isCardExpriyDateYearValid(year) && (year>CURRENT_YEAR || (year===CURRENT_YEAR && month>=CURRENT_MONTH))
}
export const isCardExpriyDateMonthValid = (month) => {
   return (month.match(/^(0[1-9]|1[0-2])/))
}

export const isCardExpriyDateYearValid = (year) => {
    return (year.match(/[0-9]{2}/))
}

export const isCreditCardCvvValid = (cvv) => {
    return (cvv.match(/[0-9]{3}/))
} 

export const isEmailValid = (email) => {
    return (email.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/))
}

export const checkCardType = (cardNumber) => {
    if (cardNumber.length !== CARD_NUMBER_LIMIT){
        return <></>
    }
    if (cardNumber.match(/^4[0-9]{12}(?:[0-9]{3})?$/)){
        return <img src={visa_icon} alt={VISA}/>
    }
    if (cardNumber.match(/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/)){
        return <img src={master_icon} alt={MASTER}/>
    }
    if (cardNumber.match(/^(62[0-9]{14,17})$/)){
        return <img src={unionpay_icon} alt={UNIONPAY}/>
    }
    return UNSUPPORTED_CARD
}