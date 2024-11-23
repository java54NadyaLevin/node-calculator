import http from 'node:http';
import CalculatorService from './service/CalculatorService.mjs';
import { operations } from './config/operations.mjs';
import CalculatorView from './view/CalculatorView.mjs';
const server = http.createServer();
const PORT = 3500;
server.listen(PORT, () => console.log(`server is listening on port ${server.address().port}`));
new CalculatorService(server, operations);
const view = new CalculatorView();
let html;
let urlTokens = new Array();

server.on("request", (req, res) => {
    res.setHeader('content-type', 'text/html');
    urlTokens = req.url.split('/');
    responseHandler(res);
}
)
function responseHandler(res) {
    if (!operations.get(urlTokens[1])) {
        sentResponse(`method ${urlTokens[1]} unsupported`, true, res);
    } else {
        const operands = getOperands(urlTokens);
        if (!operands) {
            sentResponse(`wrong operands`, true, res);
        } else {
            server.emit(urlTokens[1], operands, res);
        }
    }
    function sentResponse(text, isError, res) {
        html = view.getHtml(text, isError);
        res.end(html);
    }

    function getOperands(urlTokens) {
        const op1 = +urlTokens[2];
        const op2 = +urlTokens[3];
        if (!isNaN(op1) && !isNaN(op2)) {
            return [op1, op2]
        }
    }
}
