var sha1 = require('sha1');
var moment = require('moment')
const APPSECRET = "f98fcde8f6133fa8ea536c9e57e0ade5";

const ParamValueMap = {
    'appKey': '84f68acf4d9f54b61b6b91b7fc2fe65a',
    'v' : '1.0',
    'entityId': '00138102',
    'currDate': ()=> moment().format('YYYYMMDD'),
    'timestamp': ()=> new Date().getTime()
}

const MethodParamMap = new Map([
    ['dfire.shop.day.memu.data', ['appKey','timestamp', 'v', 'method', 'entityId', 'currDate'] ],
    ['dfire.shop.order.list', ['appKey','timestamp', 'v', 'method', 'entityId', 'currDate'] ],
    ['dfire.shop.order.instance.list', ['appKey','timestamp', 'v', 'method', 'entityId', 'currDate', 'orderIds'] ]
])

function genSign(method, param){
    var paramList = MethodParamMap.get(method);
    var sortParamList = paramList.sort();
    var paramSortStr = APPSECRET;

    sortParamList.map((item)=>{
        if(Array.isArray(param[item])){
            paramSortStr +=  (item +  JSON.stringify(param[item]))
        } else {
            paramSortStr +=  (item + param[item])
        }
    })

    paramSortStr += APPSECRET

    return  sha1(paramSortStr).toUpperCase();
}

function genParam(method, extraParam) {
    var param = {
        method: method,
        ...extraParam
    }
    var paramList = MethodParamMap.get(method);
    
    paramList.map((paramName)=> {
        if(ParamValueMap[paramName] !== undefined) {
            if(typeof ParamValueMap[paramName] === 'string' ) {
                param[paramName] = ParamValueMap[paramName];
            } else if ( paramName !=='method'){            
                param[paramName] = ParamValueMap[paramName]();
            }
        }
    })   
    
    param.sign = genSign(method, param);

    return param;
}
module.exports  =  genParam;