/**
 * @this 验证类型
 *
 * @flow
 */

'use strict';

const ValidationType = {
  TypeEmpty: 'empty',      //1-空
  TypePhone: 'phone',      //2-手机号
  TypeAmount: 'amount',    //3-金额数   1,200、1,200,230
  TypePlateNo: 'plateNo',  //4-校验车牌号
  TypeCaptcha: 'captcha',  //5-验证码
  TypeBankCard: 'bankCard',//6-银行卡
  TypeVIN: 'VIN',          //7-车架号(车辆识别号码)
  TypeIdCardNo: 'idCardNo',//8-身份证
  TypeEmail: 'email',      //9-邮箱
  TypeGraphCaptcha: 'graphCaptcha',    //10-校验图形验证码

  AllTypes: function() {
    return [
      this.TypeVIN,
      this.TypeEmail,
      this.TypeEmpty,
      this.TypePhone,
      this.TypeAmount,
      this.TypePlateNo,
      this.TypeCaptcha,
      this.TypeIdCardNo,
      this.TypeBankCard,
      this.TypeGraphCaptcha,
    ]
  },
 }
 export default ValidationType;