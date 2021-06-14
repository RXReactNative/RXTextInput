/**
 * 配置
 * @this RXTextInput: placeholder 和 input `垂直居中`
 *
 * @flow
 * -------
   涉及到 < 桥接原生的 TextInput > 的 placeholderFontSize 、 placeholderStyle
   请使用 封装的<RXTextInput>

 *
 */
'use strict'
import BaseTextInputView from './component/TextInputPlaceholder'

class RXTextInput extends BaseTextInputView {
  static propTypes = {
    ...BaseTextInputView.propTypes,
  }

  static defaultProps = {
    ...BaseTextInputView.defaultProps,
    placeholderColor: 'gray',
  };

  constructor(props, context) {
    super(props, context);
  }

  getPlaceholderFrame() {
    const { clearButtonMode } = this.props;
    const { placeholderShow, inputStyleFrame } = this.state;
    let p_height = inputStyleFrame.height;
    var p_width = inputStyleFrame.width;
    if (p_width <= 0) {
      p_width = 0;
    }
    else {
      p_width = p_width - 2;
      if (placeholderShow && clearButtonMode && clearButtonMode !== 'never') {
        p_width -= 20;
      }
    }
    if (p_width < 0) {
      p_width = 0;
    }

    return {
      left: inputStyleFrame.x,
      top: inputStyleFrame.y,
      width: p_width,
      height: p_height
    }
  }

}

module.exports = RXTextInput;