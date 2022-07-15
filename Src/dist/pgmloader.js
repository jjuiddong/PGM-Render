"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//
// 2022-07-15, jjuiddong
// pgm file loader
//  - read *.pgm file and create ImageData
//  - reference
//      - Reading and Rendering - PGM and PBM images
//          - https://www.codeproject.com/Articles/31742/Reading-and-Rendering-PGM-and-PBM-images
//      - Pixel manipulation with canvas
//          - https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
//
const axios_1 = __importDefault(require("axios"));
class PgmLoader {
    constructor() {
    }
    //------------------------------------------------------------------------------
    // load pgm file from uri
    load(uri) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(uri, { responseType: 'blob' })
                .then(response => {
                return this.loadFromBlob(uri, response.data);
            })
                .then((result) => {
                resolve(result);
            })
                .catch(() => {
                reject(0);
            });
        });
    }
    //------------------------------------------------------------------------------
    // load pgm file from blob
    loadFromBlob(uri, blob) {
        return new Promise((resolve, reject) => {
            blob.arrayBuffer()
                .then((value) => {
                let dv = new DataView(value);
                let td = new TextDecoder();
                let offset = 0;
                // PGM header (ascii format)
                // step1: P2 or P5
                // step2: width
                // step3: height
                // step4: maximum value
                // delimiter 0x0A, 0x20
                // # comment ~ \n
                if (value.byteLength < 2) {
                    reject(0);
                    return; // too small size
                }
                let step = 0;
                let line = new Uint8Array(10);
                let isSuccess = false;
                let type = ''; // P2 or P5
                let width = 0;
                let height = 0;
                let maxVal = 0;
                while (offset < value.byteLength) {
                    const c = dv.getUint8(offset++);
                    line[0] = c;
                    line[1] = 0;
                    const str = td.decode(line);
                    // comment?
                    if (str == '#') {
                        // read until \n
                        while (offset < value.byteLength) {
                            const c = dv.getUint8(offset++);
                            if (c == 0x0A) // \n
                                break;
                        }
                    }
                    else {
                        // read until \n or blank
                        let i = 1;
                        while (offset < value.byteLength) {
                            const c = dv.getUint8(offset++);
                            if ((c == 0x0A) || (c == 0x20)) // \n or blank
                                break;
                            if (i < line.byteLength)
                                line[i++] = c;
                        }
                        if (i < line.byteLength)
                            line[i] = 0;
                        const tok = td.decode(line);
                        switch (step) {
                            case 0:
                                type = tok;
                                break;
                            case 1:
                                width = parseInt(tok);
                                break;
                            case 2:
                                height = parseInt(tok);
                                break;
                            case 3:
                                maxVal = parseInt(tok);
                                break;
                        }
                        step++;
                        if (step >= 4) {
                            isSuccess = true;
                            break; // complete read header
                        }
                    } //~else
                } //~while
                if (!isSuccess) {
                    reject(0);
                    return;
                }
                if (maxVal == 0) // exception process
                    maxVal = 255;
                let i = 0;
                let image = new ImageData(width, height);
                while (offset < value.byteLength) {
                    const v = dv.getUint8(offset++) / maxVal; // 0.0 ~ 1.0
                    image.data[i] = v * 255;
                    image.data[i + 1] = v * 255;
                    image.data[i + 2] = v * 255;
                    image.data[i + 3] = 255; // alpha
                    i += 4;
                }
                resolve(image);
            })
                .catch(() => {
                reject(0);
            });
        });
    }
}
exports.default = PgmLoader;
//# sourceMappingURL=pgmloader.js.map