import style from '../config/view.json' with { type: 'json' }; 
export default class CalculatorView {
    getHtml(res, isError) {
        const textColor = isError ? style.textColorError : style.textColorResult;
        return `<label style="font-size:${style.fontSize}; display:block; text-align:${style.textAlign}; color:${textColor}">${res}</label>`
    }
}