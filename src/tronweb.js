const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;
var _ = require('lodash');
// const TodoListContract = require('./contracts/TodoList.json');
const TodoListContract = require('./contracts/RecipeList.json');


// const fullNode = new HttpProvider('http://127.0.0.1:8090');
// const solidityNode = new HttpProvider('http://127.0.0.1:8091');
// const eventServer = 'http://127.0.0.1:8092';
const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
const eventServer = "https://api.shasta.trongrid.io";


const privateKey = "633e7d980d4ec321f9ccaf9ddbb817385d6da6d49494b24fe392574d62628f41";
// const privateKey = "1412CCB58B66370E6164047D48FFB10B6F0C42EA24A0ED5CA1E534BDBDCD06C5";
// const contractAddr = "TFyEw5qRRiZTJ5boLZJxZnv2hnhpBuvkjm";
// const contractAddr = "TN1JsYKjaU93EDQKfr5aSBnEbu6WVyhA7T";
const contractAddr = "TApP82Wbkjc2dMUCkK8avaAy93vdiSzPfU";
// const contractAddr = "TDVSKQnyRGVFGHe7ti9fpDKd8WfVwTX4A1";
// const contractAddr = "4184073dde4655232eac57bd1cb4e59dbaf02d021c";

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

export const instanceContract = () => {
    return new Promise(res => {
        res(tronWeb.contract(TodoListContract.abi, contractAddr))
    })
}

export const mapReponseToJSON = (contractResponse, parameters, type) => {
    switch (type) {
        case 'arrayOfObject':
            {
                const result = [];
                contractResponse.forEach((paramValues, paramIndex) => {
                    const paramName = parameters[paramIndex];

                    paramValues.forEach((paramValue, itemIndex) => {
                        const item = _.merge({}, _.get(result, [itemIndex], {}));
                        item[paramName] = tronWeb.toBigNumber(paramValue._hex).toNumber();
                        result[itemIndex] = item;
                    })
                });

                return result;
            }
        default:
            return contractResponse;
    }
}