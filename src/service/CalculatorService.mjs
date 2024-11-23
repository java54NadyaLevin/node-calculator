import CalculatorView from "../view/CalculatorView.mjs";

const view = new CalculatorView();
export default class CalculatorService {
    constructor(emitter, operations) {
        initializeListeners(emitter, operations);
    }
};
function initializeListeners(emitter, operations) {
    operations.forEach((value, key) => {
        emitter.addListener(key, (operands, response) => {
            const res = value(operands[0], operands[1]);
            response.end(view.getHtml(res, false))
        }
        )
    })
}
