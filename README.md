# RXInput

## Getting started
`$ npm install react-native-rxinput --save`

## use
```js
import RXTextInput, {RXNumberUtil} from 'react-native-rxinput'

// render
<RXTextInput
  type={'float'}
  enable={false}
  maxLength={5}
  onChangeText={(text) => {
    //...
  }

  //...TextInput.props
/>


```

---

根据 `React-Native` 的 [TextInput](http://facebook.github.io/react-native/docs/textinput) 控制和过滤掉文本。


### Props
- ...TextInput.props
- type
- enable
- valueSize

---

<br>

### Reference

<br>

#### `type`
|      类型     |             说明            |      默认      |
| :----------- | :-------------------------: | ------------: | 
| text         | 空(默认键盘)                  |    true       | 
| number       | 数字键盘                      |               | 
| int          | 数字键盘 - 整型                |               | 
| float        | 数字键盘 - 浮点型(最多保留2位小数) |              |
|              |                             |               |
| phone        | 手机                         |               | 
| bankCard     | 银行卡                       |               | 
| VIN          | 车架号                       |               |
| idCardNo     | 身份证                       |               |
| email        | 邮箱                         |               |
| captcha      | 验证码                       |               |
| graphCaptcha | 校验图形验证码                 |               |
| password     | 输入的文本加密                 |               |

---

#### `enable`
如果为false，文本框是不可编辑的。默认值为true。(等同于 `editable`)

---

#### `valueSize`
输入的文本字体大小。
