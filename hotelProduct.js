var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "react", "axios"], function (require, exports, react_1, axios_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    react_1 = __importStar(react_1);
    axios_1 = __importDefault(axios_1);
    var Product = function (props) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var pageBasic = ((_a = props.extra) === null || _a === void 0 ? void 0 : _a.pageBasic) || ((_d = (_c = (_b = props.extra) === null || _b === void 0 ? void 0 : _b.hooksHandle) === null || _c === void 0 ? void 0 : _c.useRootStore()) === null || _d === void 0 ? void 0 : _d.pageBasicStore) || {}; // 使用全局共享参数
        var initData = (_e = props.extra) === null || _e === void 0 ? void 0 : _e.ssrData; // ssr初始数据
        var containerStyle = props.containerStyle, titleStyle = props.titleStyle, imgStyle = props.imgStyle;
        var _j = react_1.useState(1), pageNo = _j[0], setPageNo = _j[1];
        var _k = react_1.useState(initData === null || initData === void 0 ? void 0 : initData.productList), productList = _k[0], setProductList = _k[1];
        var fetchProductData = function (searchPageNo, needRefresh) {
            if (needRefresh === void 0) { needRefresh = false; }
            var _a;
            var vid = (_a = pageBasic === null || pageBasic === void 0 ? void 0 : pageBasic.cParams) === null || _a === void 0 ? void 0 : _a.vid;
            if (!vid)
                return;
            axios_1.default.get(props.fetchUrl + "?pageNo=" + searchPageNo + "&vid=" + vid).then(function (res) {
                var newProductList = ((needRefresh ? [] : productList) || []).concat(res.data.data.data);
                setProductList(newProductList);
            });
        };
        if (props.isDev) { // 开发环境
            react_1.useEffect(function () {
                fetchProductData(1);
            }, []);
        }
        else { // 真实用户端
            (_g = (_f = props.extra) === null || _f === void 0 ? void 0 : _f.hooksHandle) === null || _g === void 0 ? void 0 : _g.requestInitialData(props, initData, Product, { productList: setProductList });
        }
        react_1.useEffect(function () {
            fetchProductData(pageNo);
        }, [pageNo]);
        react_1.useEffect(function () {
            fetchProductData(pageNo, true);
        }, [(_h = pageBasic === null || pageBasic === void 0 ? void 0 : pageBasic.cParams) === null || _h === void 0 ? void 0 : _h.vid]);
        return (react_1.default.createElement("div", { className: 'tango-comp-product', style: containerStyle },
            (productList || []).map(function (product, idx) { return (react_1.default.createElement("div", { key: "" + product.result.spuName + idx, style: { width: '50%', display: 'inline-block' } },
                react_1.default.createElement("img", { alt: '\u56FE\u7247', width: "170", height: '70', src: product.result.imgUrl, style: imgStyle }),
                react_1.default.createElement("p", { style: titleStyle }, product.result.spuName))); }),
            react_1.default.createElement("button", { type: 'button', onClick: function () { return setPageNo(pageNo + 1); } }, "\u67E5\u770B\u66F4\u591A")));
    };
    Product.getInitialProps = function (cmpProps /* , rootStore , cmpKey */) { return __awaiter(void 0, void 0, void 0, function () {
        var data, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = [];
                    return [4 /*yield*/, axios_1.default.get(cmpProps.fetchUrl)];
                case 1:
                    res = _a.sent();
                    data = res.data.data.data;
                    return [2 /*return*/, {
                            productList: data
                        }];
            }
        });
    }); };
    Product.defaultProps = {
        imgStyle: { width: '100%' },
        containerStyle: { padding: '1rem' },
        titleStyle: { width: '100%' },
        fetchUrl: 'http://yapi.corp.qunar.com/mock/650/getChannels'
    };
    Product.configPanel = [
        {
            type: 'styleMaster',
            label: '图片样式',
            corresKey: 'imgStyle'
        },
        {
            type: 'styleMaster',
            label: 'title样式',
            corresKey: 'titleStyle'
        },
        {
            type: 'styleMaster',
            label: '容器样式',
            corresKey: 'containerStyle'
        },
        {
            type: 'textInput',
            label: '接口地址',
            corresKey: 'fetchUrl'
        }
    ];
    exports.default = Product;
});
//# sourceMappingURL=HotelProduct.js.map
