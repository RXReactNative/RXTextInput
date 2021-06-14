/**
 *
 */

import {
  RXNumberStringCleanUp,
  RXNumberStringComma
} from './RXNumberUtil';

const TextFormatUtil = {

  //去空格
  formatSpace: (string) => {
    return string.replace(/\s+/g, "");
  },

  //过滤空字符串
  normalizeValue: (value) => {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value + '';
  },

  //-------------------------------------------
  //手机号-显示格式
  phone: function (text) {
    if (!this.isString(text)) return '';
    text = this.stringNumAddSpace(text, [3, 4]);
    return text;
  },

  //银行卡-显示格式
  bankId: function (text) {
    if (!this.isString(text)) return '';
    text = this.stringNumAddSpace(text, 4);
    return text;
  },

  //金额数-显示格式
  amount: function (text) {
    if (!this.isString(text)) return '';
    text = text + '';
    text = this.stringNumAddComma(text);
    return text;
  },
  //-------------------------------------------

  //是否是字符串
  isString: function (text) {
    if (!text) return false;
    if (typeof text === 'string' && !text.length) return false;
    if (typeof string === 'number' && !parseFloat(string)) return false;
    return true;
  },

  //字符串 - 提取数字
  retainNumbers: function (text) {
    if (!this.isString(text)) return '';
    text = text + '';
    return text.replace(/[^0-9]+/g, '');
  },

  /**
   * 根据规定的格式，添加空格
   */
  stringNumAddSpace: function (text, spaces) {
    if (!text) return '';
    if (!spaces) return text;
    text = this.retainNumbers(text);

    typeSpace = 0;
    if (typeof spaces === 'number') {
      typeSpace = 1;
    }
    else if (Array.isArray(spaces) && spaces.length) {
      typeSpace = 2;
    }
    if (typeSpace === 0) return text;

    var result = '';
    if (typeSpace === 1) {
      let array = text.split("");
      let step = spaces;
      if (text.length <= step) return text;
      for (let i = 0; i <= array.length / step; i++) {
        if (text.length <= step) {
          result = result + text.substr(0, text.length);
          text = '';
          break;
        }
        result = result + text.substr(0, step);
        text = text.substr(step, text.length) + '';
        if (text.length) {
          result += ' ';
        }
      }
      result = result + text;
    }
    else {
      var spaceIndex = 0;
      while (text.length) {
        if (spaces.length <= spaceIndex) {
          let temp = text.substr(0, text.length) + '';
          result = result + temp + '';
          text = '';
          break;
        };
        let digit = spaces[spaceIndex];
        if (digit >= text.length) {
          let temp = text.substr(0, text.length) + '';
          result = result + temp + '';
          text = '';
          break;
        };
        result += text.substring(0, digit);
        text = text.substr(digit, text.length);
        if (text.length) {
          result += ' ';
        }
        spaceIndex++;
      };
    }
    return result + '';
  },


  //字符串 - 提取数字 净化(支持末尾显示小数点)
  formatAmount: function (text) {
    if (!this.isString(text)) return '';
    text = text + '';
    text = RXNumberStringCleanUp(text, true).numStr;
    return text;
  },

  /**
   * 金额  1,234.
   * 根据规定的格式，添加逗号
   */
  stringNumAddComma: function (text) {
    return RXNumberStringComma(text, true);
  },
}

export default TextFormatUtil;