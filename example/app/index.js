/**
 * @this rxinput
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
 * 该项目 ： 主要 - 提供思路 
 * 
 * 
 * -------------------------------------------
 * 
**/

'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native'

import RXInput from 'react-native-rxinput'

export default class RXInputDemo extends Component {
  constructor(props){
    super(props);
    this.state = ({

    })
  }

  render() {
    return(
      <ScrollView style={styles.container}>
        <Text style={styles.tip}>{"react-native-rxinput"}</Text>
        <View style={styles.contentView}>
          <RXInput
            style={styles.nomalTextInput}
            placeholder={'type=text'}
          />
          <View style={styles.line} />
          <RXInput
            style={[styles.nomalTextInput, {textAlign: 'right'}]}
            placeholder={'type=text style="textAlign: right"'}
          />
          <View style={styles.line} />
          <RXInput
            type='number'
            maxLength={20}
            style={styles.nomalTextInput}
            placeholder={'type="number" 数字键盘'}
          />
          <View style={styles.line} />
          <RXInput
            type='int'
            style={styles.borTextInput}
            placeholder={'type=int "数字键盘 - 整型"'}
            placeholderColor={'#8B8B7A'}
            placeholderFontSize={12}
          />
          <View style={styles.line} />
          <RXInput
            type='float'
            style={styles.borTextInput}
            placeholder={'type=float "数字键盘 - 浮点型(最多保留2位小数)"'}
          />
          <View style={styles.line} />
          <RXInput
            type='phone'
            style={styles.borTextInput}
            placeholder={'请输入手机号'}
          />
          <View style={styles.line} />
          <RXInput
            type='VIN'
            style={styles.borTextInput}
            placeholder={'请输入车架号, 字母在键盘消失后 自动大写'}
          />
          <View style={styles.line} />
          <RXInput
            type={'password'}
            style={styles.borTextInput}
            placeholder={'请输入密码'}
            returnKeyType={'done'}
          />
          <View style={styles.line} />
          <View style={styles.line} />
          <Text style={styles.tip}>{"下面验证需要处理"}</Text>
          <RXInput
            type={'idCardNo'}
            style={styles.borTextInput}
            placeholder={'请输入身份证号码, 字母在键盘消失后 `不能`自动大写'}
          />
          <View style={styles.line} />
          <RXInput
            type={'captcha'}
            style={styles.borTextInput}
            placeholder={'请输入验证码 `字母+数字` 不应该出现`.-`'}
          />
          <View style={styles.line} />
          <RXInput
            type={'graphCaptcha'}
            style={styles.borTextInput}
            placeholder={'请输入校验图形验证码 `字母+数字` 不应该出现`.-`'}
          />
          <View style={styles.line} />
          <RXInput
            type={'email'}
            style={styles.borTextInput}
            placeholder={'请输入email，字母需大写 `格式不对` 不应在@后.xx.xx@... 以及其他字符'}
            returnKeyType={'done'}
          />
          <View style={styles.line} />
          <RXInput
            type='bankCard'
            style={styles.borTextInput}
            placeholder={'请输入银行卡号, `自动加空格，位数`'}
          />
          <View style={styles.line} />
          <RXInput
            type='amount'
            style={styles.borTextInput}
            placeholder={'请输入金额, `位数`'}
          />
          <View style={styles.line} />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    padding: 0,
    marginVertical: 0,
    marginHorizontal: 40,  
    backgroundColor: 'gray',
  },
  tip: {
    paddingVertical: 20,
    fontSize: 24, 
    color: 'blue',
    lineHeight: 30,
    textAlign: 'center',
    backgroundColor: 'orange',
  },
  contentView: {
    flex: 1,
  },
  line: {
    height: 20,
    backgroundColor: '#D8BFD8',
  },
  nomalTextInput: {
    fontSize: 14,
    color: 'red',
    height: 30,
    lineHeight: 30,
    backgroundColor: 'white',
  },
  borTextInput: {
    margin:5,
    height: 30,
    lineHeight: 30,
    borderWidth: 1,
    borderColor: '#9400D3',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
    backgroundColor: 'white'
  },

})