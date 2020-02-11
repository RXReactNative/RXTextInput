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
      <View style={styles.container}>
        <Text style={styles.tip}>{"react-native-rxinput"}</Text>
        <View style={styles.contentView}>
          <RXInput
            maxLength={20}
            style={{fontSize: 14, color: 'red'}}
            placeholder={'输入详细地址'}
            returnKeyType={'done'}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20, 
    marginLeft: 40, 
    marginRight: 40, 
    marginBottom: 0,
    padding: 0,
    backgroundColor: 'white',
  },
  tip: {
    marginTop: 20,
    fontSize: 24, 
    color: 'blue',
    lineHeight: 30,
  },
  contentView: {
    flex: 1,
    paddingVertical: 20,
  }
})