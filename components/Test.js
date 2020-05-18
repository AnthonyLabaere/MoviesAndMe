import React from 'react'
import { StyleSheet, View } from 'react-native'
import HelloWorld from './HelloWorld'

class Test extends React.Component {

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.subview_container}>
            <HelloWorld/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subview_container: {
    // ...Platform.select({
    //     ios: {
    //       backgroundColor: 'red',
    //       height: 100,
    //       width: 50
    //     },
    //     android: {
    //       backgroundColor: 'blue',
    //       height: 50,
    //       width: 100
    //     }
    //   })
  }
})

export default Test