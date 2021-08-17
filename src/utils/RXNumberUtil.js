/**
 * @this RXNumberUtil : 数字格式化
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * ------------------------------------
 *
 * *
 *  RXNumberStringDecimal(RXNumberStringComma( 数字))  保留2位的 字符串
 */



/**
  *   @this  数字对象
  */
export function RXNumberObj() {
  // str->去掉逗号的结果，n->并获取小数点所在的位置
  var fsData = { numStr: '', local: 0 };
  return fsData;
}

//-----------------------------------------------------------


/**
 *   @this  字符串数字 净化(返回样式only 数字和点) 【目前大部分用于去掉逗号】
 *
 *   @return  RXNumberObj()
 */
export function RXNumberStringCleanUp(numStr, enablePoint = false) {
  const fsData = RXNumberObj();
  if (numStr === '') {
    fsData.numStr = '';
    fsData.local = 0;
    return fsData;
  }
  if (numStr === '.') {
    fsData.numStr = '.';
    fsData.local = 0;
    return fsData;
  }
  numStr = (numStr + "").replace(/[^\d\.]/g, ""); //去掉逗号
  const decimalLocal = String(numStr).indexOf(".") + 1;
  let n = 0;
  let decimalSub = -1;
  if (decimalLocal > 0) {
    decimalSub = numStr.length - decimalLocal;
    n = decimalSub > 2 ? 2 : decimalSub;
  }
  if (numStr.length === 0 && n === 0) return '';
  const tempStr = numStr;
  //parseFloat() 函数可解析一个字符串，并返回一个浮点数。
  numStr = parseFloat(numStr)
  //reverse() 方法用于颠倒数组中元素的顺序。
  numStr = numStr.toString();
  if (n > 0) {
    //不要用toFixed ,会四舍五入
    if (enablePoint) {
      numStr = tempStr.substring(0, decimalLocal + n)
    }
    else {
      numStr = numStr.substring(0, decimalLocal + n)
    }
  }
  else if (enablePoint) {
    if (decimalSub === 0) {
      numStr += '.';
    }
  }
  fsData.numStr = numStr;
  fsData.local = n;
  return fsData;
}


//-----------------------------------------------------------



/**
 * @this 字符串数字  添加逗号 （如果为小数，保留2位）
 *
 * @param s : 为要格式化的money
 * comma == 逗号
 *
 * @return string ( 1020.2 ===>  1,020.2 )
 */
export function RXNumberStringComma(numStr, enablePoint = false) {
  if (!numStr) return '';
  const text = numStr;
  const fsData = RXNumberStringCleanUp(numStr, enablePoint);
  numStr = fsData.numStr;
  if (!numStr) return '';
  const n = fsData.local;
  // console.log('start===> s'+s);
  if (numStr === '') {
    return '';
  }

  let l = numStr.split(".")[0].split("");
  if (l.length > 12) {
    l = l.splice(0, 12)
  }
  l = l.reverse()
  const r = n > 0 ? numStr.split(".")[1] : "";
  let t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) != l.length ? "," : "");
  }

  let result = t.split("").reverse().join("");
  if (n > 0) {
    if (r) {
      result = result + "." + r;
    }
  }
  else if (enablePoint) {
    let decimalLocal = String(text).indexOf(".");
    if (decimalLocal === text.length - 1) {
      result += '.'
    }
  }
  // console.log('result='+result + "; r="+r);
  result = numStr.replace(numStr, result);
  return result;
}



//-----------------------------------------------------------

/**
 * @this  最少保留 2位小数
 */
export function RXNumberCommentDecimal(numStr) {
  if (!numStr) return '0.00';
  if (numStr === '') return '0.00'
  if (numStr === '0') return '0.00'

  if (isNotANumber(numStr)) {
    //数字
    numStr = numStr.toString();
  }

  let pos_decimal = numStr.indexOf('.');
  if (pos_decimal < 0) {
    pos_decimal = numStr.length;
    numStr = '' + numStr + '.';
  }
  while (numStr.length <= pos_decimal + 2) {
    numStr = '' + numStr + '0';
  }
  return numStr;
}

/**
 *  @this 最少保留一位小数
 */
export function RXNumberCommentADecimal(numStr) {
  numStr = RXNumberStringDecimal(numStr);
  const numDecimalArr = numStr.split(".")[1].split("");
  if (numDecimalArr[1] === '0') {
    numStr = numStr.substring(0, numStr.length - 1)
  }
  return numStr;
}


/**
 * @this 字符串数字 格式化小数位
 *
 * @return '12' => '12.00'
 * @return  12 => '12.00'
 */
export function RXNumberStringDecimal(numStr) {
  if (!numStr) return '0.00';
  if (numStr === '') return '0.00'
  if (numStr === '0') return '0.00'

  numStr = RXNumberCommentDecimal(numStr);

  const numInteger = numStr.split(".")[0].split("");
  const numDecimal = numStr.split(".")[1].split("");
  let numDecimalTemp = ''
  for (let i = 0; i < 2; i++) {
    numDecimalTemp = numDecimalTemp + '' + numDecimal[i]
  }

  return '' + numInteger.join('') + '.' + numDecimalTemp;
}

/**
 * @this 数字 格式化小数位
 *
 * @return '12' => 12
 * @return  12.0 => 12.00
 */
export function RXNumberDecimal(num = 0) {
  num = RXNumberStringDecimal('' + num);
  return parseFloat(num)
}

/**
 * 一般不会用到这个
 */
export function isNotANumber(inputData) {
  //isNaN(inputData)不能判断空串或一个空格
  //如果是一个空串或是一个空格，而isNaN是做为数字0进行处理的，而parseInt与parseFloat是返回一个错误消息，这个isNaN检查不严密而导致的。
  if (parseFloat(inputData).toString() === "NaN") {
    //alert("请输入数字……");注掉，放到调用时，由调用者弹出提示。
    return false;
  } else {
    return true;
  }
}

export function LESS_THAN(a = 0, b = 0) {
  return a + 0.001 <= b
}

//总结后 抽取出去
export function GREATER_THAN(a = 0, b = 0) {
  return a >= b + 0.001
}

export function RXNumberMIN(a = 0, b = 0) {
  if (LESS_THAN(a, b)) {
    return a;
  }
  return b;
}

export function RXNumberMAX(a = 0, b = 0) {
  if (GREATER_THAN(a, b)) {
    return a;
  }
  return b;
}





/**
  * 格式化正整数，保留到十位数
  *
  *   9 -> 09
  *   1 -> 01
  **/
export function RXNumberFixTwo(num) {
  if (!num) return "00";
  if (typeof num === 'string') {
    num = parseInt(num);
  }
  if (num == 0) return "00";
  if (num > 9) return num;
  return "0" + num;
}


/**
  *
  * 指定数值型小数的位数
  *   (9, 3)    ->  9.000
  *   (9, 4)    ->  9.0000
  **/
export function RXNumberReservedDecimal(val = 0, digit = 2) {
  return Number(val).toFixed(digit)
}



export function RXNumberHaveDecimal(num = 0) {
  if (num === '') return true
  if (num === '0') return true
  if (num === 0) return true;

  num = RXNumberCommentDecimal(num);

  const numInteger = num.split(".")[0].split("");
  if (numInteger > 0) return false
  const numDecimal = num.split(".")[1].split("");
  if (numDecimal > 0) return false
  return true
}

/**
 * 万
 * @param {*} num
 */
export function RXNumberTenThousand(num = 0): string {
  num = RXNumberRoundDecimal(num);
  if (num - 10000 >= 0 && RXNumberHaveDecimal(num - 10000)) {
    var new_num = num / 10000;
    return new_num + '万'
  }
  return num
}

/**
 * 千
 * @param {*} num
 */
export function RXNumberThousand(num = 0): string {
  num = RXNumberRoundDecimal(num);
  //万
  num = RXNumberTenThousand(num);

  //千
  if (isNotANumber(num) && num - 1000 >= 0 && RXNumberHaveDecimal(num - 1000)) {
    const new_num = num / 1000;
    return new_num + '千'
  }
  return num
}


export function RXNumberToString(num) {
  if (num && typeof num === 'string') {
    //如果后台给 15.6.7 ,这里会为 NaN
    num = Number(num);
  };
  if (typeof num === 'number') {
    return num.toString();
  }
  return '';
}
//-----------------------------------------------------------