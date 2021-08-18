/**
 *
 * @this TextInputValue: 封装TextInput的 value
 *
 * @flow
 * ----------------------------
 *
 * @当前使用的版本
    "react": "16.8.3",
    "react-native": "0.59.10",
    "react-native-web": "^0.10.0-alpha.2",
 *
 * @采坑
 * 1、onlayout 不可用
 *
 * 2、Android上 TextInput的封装大写的转换： 只能在失去焦点后，在转大写的处理
 *   相关版本分布: （请看下面）
 * ```config
    react: 16.8.3
    react-native: 0.59.10

    AndroidStudio: 3.4
    Gradle: 5.11.0

    compileSdkVersion 28
    buildToolsVersion "28.0.3"

    defaultConfig {
        applicationId "com.valuerhpp.car"
        minSdkVersion 21
        targetSdkVersion 27
        versionCode 1
        versionName "1.0.0"
        ndk {
            abiFilters "armeabi-v7a", "x86"
        }
    }
 *````
 *
 * 3、 placeholder 和  value 交替的显示问题，以后优化。(TextInput 输入时，显示的那几秒和placeholder重叠)
 *
 * 4、TextInput multiline=true 多行，内容垂直居中。
 *    web 不支持 多行输入，再一行，在多行，并保持垂直居中：
 * ```code
    style={{
        ...Platform.select({
            ios: { height: 60 },
            web: { },
            android: { height: 60 }
        }),
    }}
    inputStyle={{justifyContent:'center',
        ...Platform.select({
            ios: { lineHeight: 23 },
            web: { },
            android: { textAlignVertical: 'center' }
        }),
    }}

    multiline={PlatformUtil.isWeb()?false:true}
 *````

    textAlignVertical (1): 支持RN -> RN_version >=0.60.0、android
                      (2): 不支持web,写了不会报错
    @引用
    textAlignVertical:
      https://github.com/necolas/react-native-web/issues/1397
 *
 *
-------------------------------------------------------------------------------
 *
 *
 */
'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';

import PropTypes from 'prop-types';
import ValidationType from '../utils/RXValidationType';
import TextFormatUtil from '../utils/TextFormatUtil'

export default class TextInputValue extends Component {
  static propTypes = {
    ...TextInput.propTypes,
    type: PropTypes.oneOf(PropTypes.oneOf(ValidationType.AllTypes(), 'text', 'number', 'int', 'float')), // 格局输入类型，选择键盘样式 例如：bankCard、phone、number etc...
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    enable: PropTypes.bool,
    valueSize: PropTypes.number,
  }

  static defaultProps = {
    ...TextInput.defaultProps,
    multiline: false,
    type: 'text',
    enable: true,
    editable: true,
  };

  constructor(props) {
    super(props);
    const value = TextFormatUtil.normalizeValue(props.value || props.defaultValue);
    this.state = {
      value: this.formatValue(props.type, value),
      valueSize: this.props.placeholderFontSize,
      maxLength: this.props.maxLength,
    }
  }

  componentWillUnmount() {
    this.blur();
  }

  componentWillReceiveProps(nextProps) {
    const { onChange, onChangeText } = this.props;
    if (nextProps.value !== this.props.value) {
      const value = this.formatValue(nextProps.type, nextProps.value);
      // console.log('value='+ value);
      this.setState({ value });
      onChange && onChange(this.formatSpace(value));
      onChangeText && onChangeText(this.formatSpace(value));
    }

    let valueSize = nextProps.valueSize;
    if (!nextProps.value || nextProps.placeholder === nextProps.value) {
      valueSize = nextProps.placeholderFontSize;
    }
    this.setState({ valueSize })
  }

  formatValue(type, value) {
    switch (type) {
      case ValidationType.TypePhone:
        return TextFormatUtil.phone(value);
      case ValidationType.TypeBankCard:
        return TextFormatUtil.bankId(value);
      case ValidationType.TypeAmount:
        return TextFormatUtil.amount(value);
      default:
        return value;
    }
  }

  formatSpace = (value) => {
    const { type } = this.props;
    switch (type) {
      case 'number':
      case ValidationType.TypeVIN:
      case ValidationType.TypeEmail:
      case ValidationType.TypePlateNo:
      // case ValidationType.TypeEngineNo:
      // case ValidationType.TypeRegistrationNo:
      case ValidationType.TypeCaptcha:
      case ValidationType.TypeIdCardNo:
        return TextFormatUtil.formatSpace(value);
      case ValidationType.TypePhone:
      case ValidationType.TypeBankCard:
        return TextFormatUtil.retainNumbers(value)
      case ValidationType.TypeAmount:
        return TextFormatUtil.formatAmount(value);
      default:
        return value;
    }
  }

  onChange = (event) => {
    const { type, onChange } = this.props;
    let value = this.formatSpace(this.filterPureNumber(event.nativeEvent.text));

    const that = this;
    if (value !== that.props.value) {
      onChange && onChange(value);
    }

    value = that.formatValue(type, value);
    let maxLength = this.props.maxLength;
    if (type === ValidationType.TypeAmount) {
      let decimalLocal = value.indexOf(".");
      if (decimalLocal > 0) {
        maxLength = decimalLocal + 3
      }
    }

    if (value != that.state.value) {
      that.setState({ maxLength, value });
    }
    else {
      that.setState({ maxLength });
    }
  }

  onChangeText = (text) => {
    const { type, onChangeText } = this.props;
    const value = this.formatSpace(this.filterPureNumber(text));
    if (value !== this.props.value) {
      onChangeText && onChangeText(value);
    }
  }

  filterPureNumber(text) {
    const { type } = this.props;
    switch (type) {
      case 'int':
        text = text.replace(/[^\d]+/, '') || '';
        if (text.length) {
          text = parseInt(text);
        }
        return text;
      case 'float':
        text = TextFormatUtil.formatAmount(text);
        return text;
      case ValidationType.TypePhone:
      case ValidationType.TypeCaptcha:
      case ValidationType.TypeGraphCaptcha:
      case 'number':
        return text.replace(/[^\d.\s]+/, '');
      case ValidationType.TypeVIN:
      case ValidationType.TypeBankCard:
      case ValidationType.TypeIdCardNo:
        text = text.replace(/[^\d|^a-zA-Z]/g, '');
        return text;
      case ValidationType.TypePlateNo:
      // case ValidationType.TypeEngineNo:
      // case ValidationType.TypeRegistrationNo:
      case ValidationType.TypeEmail:
      default:
        return text;
    }
  }

  _onBlur = () => {
    const { type, onChange } = this.props;
    if (type && (type === ValidationType.TypePlateNo
      // || type === ValidationType.TypeEngineNo
      || type === ValidationType.TypeVIN
      || type === ValidationType.TypeIdCardNo)) {
      let value = this.state.value;
      if (value) {
        value = value.toLocaleUpperCase();
        onChange && onChange(value);
        this.setState({ value });
      }
    }

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  focus = () => {
    if (this.props.enable) {
      this.refTextInputValue && this.refTextInputValue.focus();
    }
  }

  blur = () => {
    this.refTextInputValue && this.refTextInputValue.blur();
  }

  clear = () => {
    this.refTextInputValue && this.refTextInputValue.clear();
  }

  isFocused = () => {
    return this.refTextInputValue && this.refTextInputValue.isFocused();
  }

  inputEnable() {
    return this.props.enable && this.props.editable;
  }

  render() {
    let { style, type, keyboardType, placeholderFontSize, placeholder, secureTextEntry, ...other } = this.props;
    let { maxLength } = this.state;
    switch (type) {
      case ValidationType.TypeBankCard:
        if (typeof keyboardType === 'undefined') keyboardType = 'numeric';
        if (typeof maxLength === 'undefined') maxLength = 23;
        break;
      case ValidationType.TypePhone:
        if (keyboardType === undefined) keyboardType = 'phone-pad';
        if (maxLength === undefined) maxLength = 13;
        break;
      case ValidationType.TypeAmount:
        //金额8位 + 2个逗号 + 1个小数点 + 小数位2位 = 13 (会在输入的时候变为13)
        if (keyboardType === undefined) keyboardType = 'numeric';
        if (maxLength === undefined) {
          maxLength = 10; // 10位是 = 金额8位 + 2个逗号。 预留1个小数的位置
        }
        break;
      case ValidationType.TypeCaptcha:
        if (keyboardType === undefined) keyboardType = 'numeric';
        if (maxLength === undefined) maxLength = 6;
        break;
      case ValidationType.TypeGraphCaptcha:
        if (keyboardType === undefined) keyboardType = 'numeric';
        if (maxLength === undefined) maxLength = 4;
        break;
      case 'number':
      case 'int':
      case 'float':
        if (keyboardType === undefined) keyboardType = 'numeric';
        break;
      case ValidationType.TypeEmail:
        if (keyboardType === undefined) keyboardType = 'email-address';
        break;
      case ValidationType.TypePlateNo:
        if (keyboardType === undefined) keyboardType = 'email-address';
        if (maxLength === undefined) maxLength = 8;
        break;
      // case ValidationType.TypeEngineNo:
      //   if (keyboardType === undefined) keyboardType = 'email-address';
      //   if (maxLength === undefined) maxLength = 20;
      //   break;
      // case ValidationType.TypeRegistrationNo:
      //   if (keyboardType === undefined) keyboardType = 'email-address';
      //   if (maxLength === undefined) maxLength = 20;
      //   break;
      case ValidationType.TypeVIN:
        if (keyboardType === undefined) keyboardType = 'email-address';
        if (maxLength === undefined) maxLength = 17;
        break;
      case ValidationType.TypeIdCardNo:
        if (keyboardType === undefined) keyboardType = 'email-address';
        if (maxLength === undefined) maxLength = 18;
        break;
      default:
        break;
    }

    if (Platform.OS === 'web') {
      // web 平台键盘类型 `numeric`，会导致 -+ 参入其中
      if (keyboardType === 'numeric') keyboardType = 'default';
    }

    if (this.state.valueSize > 0 && Platform.OS === 'web') {
      style = [{ fontSize: this.state.valueSize }].concat(style);
    }

    let must_ps = secureTextEntry;
    if (!secureTextEntry) {
      must_ps = type === 'password';
    }

    const enable = this.inputEnable();

    // console.log('TextInputValue maxLength='+ maxLength);
    const input = <TextInput
      {...other}
      ref={(e) => { this.refTextInputValue = e; }}
      style={[styles.container, style]}
      maxLength={maxLength}
      keyboardType={keyboardType}
      editable={enable}
      placeholder={placeholder}
      value={TextFormatUtil.normalizeValue(this.state.value)}
      secureTextEntry={must_ps}
      multiline={this.props.multiline}
      onChange={this.onChange}
      onChangeText={this.onChangeText}
      allowFontScaling={false}

      onFocus={() => {
        if (this.props.onFocus) {
          this.props.onFocus();
        }
      }}

      onBlur={this._onBlur}

      onLayout={(event) => {
        if (this.props.onLayout) {
          this.props.onLayout(event);
        }
      }}
    />

    let element = input;
    if ((Platform.OS === 'android')) {
      element = React.cloneElement(input, {
        underlineColorAndroid: 'transparent'
      });
    }
    return element;
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
})