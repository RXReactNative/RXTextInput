/**
 * 配置
 * @this RXAmountInput : placeholder 和 input `底部对齐`
 *
 * @flow
 * -------
   涉及到 < 桥接原生的 TextInput > 的 placeholderFontSize 、 placeholderStyle
   请使用 封装的<RXAmountInput>

 *
 */
'use strict'

import BaseTextInputView from './component/TextInputPlaceholder'

class RXAmountInput extends BaseTextInputView {
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
    const { placeholderShow, inputStyleFrame, placeholderStyleSize } = this.state;
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

    var top = 0;
    if (p_height) {
      top = p_height - placeholderStyleSize.height - 2;
      if (top <= 0) top = 0;
    }
    return {
      left: inputStyleFrame.x,
      top: top,
      width: p_width,
    }
  }
}

module.exports = RXAmountInput;