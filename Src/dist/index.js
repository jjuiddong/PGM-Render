"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pgmloader_1 = __importDefault(require("./pgmloader"));
function main() {
    let canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const rect = document.body.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    let ctx = canvas.getContext('2d');
    let loader = new pgmloader_1.default();
    loader.load('./map.pgm')
        .then((result) => {
        const x = rect.width / 2 - result.width / 2;
        const y = rect.height / 2 - result.height / 2;
        ctx === null || ctx === void 0 ? void 0 : ctx.putImageData(result, x, y);
    })
        .catch(() => {
        console.log('error load map.pgm file');
    });
}
// start entry point
main();
//# sourceMappingURL=index.js.map