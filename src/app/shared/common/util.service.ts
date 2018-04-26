/**
 * write by @pengfei.li
 */
import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class UtilService {
    constructor() {
    }

    /**
     * 构造HttpParams
     * @param {object} params {}
     * @returns {HttpParams}
     */
    public buildHttpParams(params: object): HttpParams {
        let _httpParams: HttpParams = new HttpParams();
        if (params) {
            for (let [key, value] of Object.entries(params)) {
                if (value) {
                    _httpParams = _httpParams.set(key, value.toString());
                }
            }
        }
        return _httpParams;
    }

    /**
     * 获取随机字符串
     * @returns {string}
     */
    public getRandomString(): string {
        return Math.random().toString(16).substr(2);
    }

    /**
     * 获取随机颜色
     * @returns {string}
     */
    public getRandomColor(): string {
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }

    /**
     * 日期格式化为字符串
     * @param {Date} date
     * @param {string} format
     * @returns {string}
     */
    public formatDate2String(date: Date, format = 'YYYY-MM-DD'): string {
        return moment(date).format(format);
    }

    /**
     * 文件导出
     * @param fileName 文件名称--不带扩展名
     * @param data      二进制流格式（ArrayBuffer）
     * @param fileType 文件格式（扩展名称）:默认值为Excel
     */
    public exportFile(fileName: string, data: ArrayBuffer, fileType: string = 'xlsx') {
        var a = document.createElement('a');
        var blob = new Blob([data], {type: fileType});
        a.href = URL.createObjectURL(blob);
        a.download = `${fileName}.${fileType}`;
        a.click();
    }
}
