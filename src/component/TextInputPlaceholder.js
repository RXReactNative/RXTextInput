/**
 *
 * @this TextInputPlaceholder: 封装input的 placeholder
 *
 * @flow
 * -------
   涉及到 < 桥接原生的 TextInput > 的 placeholderFontSize 、 placeholderStyle
   请使用 封装的<TextInputPlaceholder>
 *
 */
'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  // Text,
  TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';
import TextInputValue from './TextInputValue'

class TextInputPlaceholder extends Component {
  static propTypes = {
    ...TextInputValue.propTypes,
    placeholderFontSize: PropTypes.number,
    placeholderStyle: PropTypes.any,
  }

  static defaultProps = {
    ...TextInputValue.defaultProps,
    multiline: false,
    placeholderStyle: {}
  };

  constructor(props) {
    super(props);
    const placeholderShow = !this._isHaveText(this.props.value);
    this.state = {
      placeholderFontSize: this.props.placeholderFontSize,
      placeholderShow,
      inputStyleFrame: { x: 0, y: 0, width: 0, height: 0 },
      placeholderStyleSize: { width: 0, height: 0 },
    }
  }

  componentWillReceiveProps(nextProps) {
    const { style, placeholderFontSize, value } = nextProps;
    let thisplaceholderFontSize = this.state.placeholderFontSize;
    if (thisplaceholderFontSize != placeholderFontSize) {
      if (!placeholderFontSize) {
        const fontSize = style ? style.fontSize : 0;
        thisplaceholderFontSize = fontSize | 16;
      }
      else {
        thisplaceholderFontSize = placeholderFontSize;
      }
    }
    const placeholderShow = !this._isHaveText(value);
    this.setState({ placeholderShow, placeholderFontSize: thisplaceholderFontSize })
  }

  componentWillUnmount() {
    this.blur();
  }

  focus = () => {
    this.refTextInputValue && this.refTextInputValue.focus();
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

  _textGetFocus = () => {
    if (this.isFocused()) return;
    this.focus();
  }

  _onFocus = (e) => {
    // if(this.isFocused()) return;
    const { onFocus } = this.props;
    onFocus && onFocus(e);
  }

  _onBlur = () => {
    const { value, onBlur } = this.props;
    const placeholderShow = !this._isHaveText(value);
    this.setState({ placeholderShow })
    onBlur && onBlur();
  }

  _onKeyPress = () => {
    const { value, onKeyPress } = this.props;
    const placeholderShow = !this._isHaveText(value);
    this.setState({ placeholderShow })
    onKeyPress && onKeyPress();
  }

  _onEndEditing = () => {
    const { value, onEndEditing } = this.props;
    const placeholderShow = !this._isHaveText(value);
    this.setState({ placeholderShow })
    onEndEditing && onEndEditing();
  }

  onChange = (text) => {
    const { onChange } = this.props;
    const value = this._getText(text);
    const placeholderShow = !this._isHaveText(value);
    this.setState({ placeholderShow })
    onChange && onChange(value);
  }

  onChangeText = (text) => {
    const { onChangeText } = this.props;
    const value = this._getText(text);
    const placeholderShow = !this._isHaveText(value);
    this.setState({ placeholderShow })
    onChangeText && onChangeText(value);
  }

  _isHaveText = (text) => {
    const { placeholder } = this.props;
    if (!placeholder) return true;
    if (!text) {
      if (typeof text === 'number') {
        text = text.toString();
      }
      else {
        return false;
      }
    }
    if (text === placeholder) return false;
    if (text.length < 1) return false;
    return true;
  }

  _getText = (text) => {
    return text;
  }

  // style提取 并拆包，分离后在打包
  _getStyleData = (style, inputStyle) => {
    if (!style) return { style: {}, inputStyle: {} };
    let keys = [
      'textShadowOffset',
      'textShadowColor',
      'textShadowRadius',
      'fontFamily',
      'fontSize',
      'fontWeight',
      'lineHeight',
      'textAlign',
      'color',
      'textDecorationLine',
      'includeFontPadding',
      'textAlignVertical',
      'fontVariant',
      'letterSpacing',
      'textDecorationColor',
      'textDecorationStyle',
      'textTransform',
      'writingDirection',
    ]
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (!key) continue;
      let value = style[key];
      if (value) {
        inputStyle[key] = value;
      }
    }

    var temp_style = {};
    for (let key in style) {
      if (!key) continue;
      let value = style[key];
      if (value && !inputStyle[key]) {
        temp_style[key] = value;
      }
    }
    return { style: temp_style, inputStyle };
  }

  _getStyle = (style) => {
    if (!style) return { style: {}, inputStyle: {} };
    var inputStyle = {};
    var newStyle = {};
    var newDict = { 'style': newStyle, inputStyle }
    if (Array.isArray(style) && style.length && style.length > 0) {
      for (let i = 0; i < style.length; i++) {
        let tempStyle = style[i];
        if (!tempStyle) continue;
        if (typeof tempStyle === 'number') {
          //StyleSheet ，暂不支持 拆分出 TextInput的属性
          newStyle = tempStyle;
        }
        else {
          var newDict = this._getStyleData(tempStyle, inputStyle);
          let new_temp_style = newDict.style;
          for (var key in new_temp_style) {
            newStyle[key] = new_temp_style[key];
          }

          let temp_inputStyle = newDict.inputStyle;
          for (let key in temp_inputStyle) {
            inputStyle[key] = temp_inputStyle[key];
          }
        }
      }
    }
    else {
      newDict = this._getStyleData(style, inputStyle);
      newStyle = newDict.style;
      inputStyle = newDict.inputStyle;
    }
    return { style: newStyle, inputStyle };
  }

  getPlaceholderFrame() {
    // @require 需要子类去实现
    console.warn('not implemented yet');
  }

  render() {
    const { placeholder, placeholderColor, multiline, numberOfLines, valueSize, ...other } = this.props;
    const { placeholderFontSize, placeholderShow } = this.state;
    let { style, inputStyle } = this._getStyle(this.props.style);
    const placeholder_style = this._getStyle(this.props.placeholderStyle);
    const placeholderStyle = placeholder_style.style;
    const inputPlaceholderStyle = placeholder_style.inputStyle;
    const placeholderViewStyle = this.getPlaceholderFrame();

    if (valueSize > 0) {
      inputStyle['fontSize'] = valueSize;
    }

    return (
      <View style={[{ justifyContent: 'center' }, style]}>
        <TextInputValue
          {...other}
          key={'cd_text_input_0'}
          style={[{ flex: 1 }, styles.input, inputStyle]}
          ref={(e) => this.refTextInputValue = e}
          placeholder={''}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={(e) => { this._onFocus(e) }}
          onBlur={() => { this._onBlur() }}
          onEndEditing={() => { this._onEndEditing() }}
          onKeyPress={() => { this._onKeyPress() }}
          onLayout={(event) => {
            const x = Math.ceil(event.nativeEvent.layout.x);
            const y = Math.ceil(event.nativeEvent.layout.y);
            const height = Math.ceil(event.nativeEvent.layout.height);
            const width = Math.ceil(event.nativeEvent.layout.width);
            const inputStyleFrame = { x, y, width, height };
            this.setState({ inputStyleFrame })
          }}
        />
        {
          placeholderShow ?
            <TouchableOpacity
              activeOpacity={1}
              style={[
                styles.placeholder,
                placeholderViewStyle,
                placeholderStyle
              ]}
              key={'cd_text_input_1'}
              pointerEvents={'box-only'}
              onPress={() => {
                this._textGetFocus()
              }}
            >
              <TextInput
                key={'cd_text_input_2'}
                pointerEvents={'none'}
                style={[
                  { flex: 1 }, styles.input, inputStyle,
                  { fontSize: placeholderFontSize, color: placeholderColor },
                  inputPlaceholderStyle]}
                defaultValue={placeholder}
                editable={false}
                multiline={multiline}
                numberOfLines={numberOfLines}
                onLayout={(event) => {
                  const height = Math.ceil(event.nativeEvent.layout.height);
                  const width = Math.ceil(event.nativeEvent.layout.width);
                  const placeholderStyleSize = { width, height };
                  this.setState({ placeholderStyleSize })
                }}
              />
              {/* 这两个控件用哪个都行 */}
              {/* <Text
                  pointerEvents={'none'}
                  key={'cd_text_input_2'}
                  style={[
                    {flex: 1},styles.input, inputStyle,
                    {fontSize: placeholderFontSize, color: placeholderColor},
                    inputPlaceholderStyle ]}
                  numberOfLines={numberOfLines}
                >{placeholder}</Text> */}

            </TouchableOpacity>
            : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 0,
    margin: 0,
  },
  placeholder: {
    position: 'absolute',
    justifyContent: 'center',
  },
})

module.exports = TextInputPlaceholder;