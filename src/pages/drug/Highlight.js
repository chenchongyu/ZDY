import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import {updateHighlight} from '../../actions/highlight'
export let highlight = null

class Highlight extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    highlight = this
  }

  componentWillUnmount() {
    this.props.dispatch(updateHighlight('', ''))
  }

  getHighlightTitle() {
    return this.props.title
  }

  render() {
    const {text} = this.props
    return (
      <ScrollView style={styles.container}>
        <View style={styles.textWrap}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </ScrollView>
    );
  }
}

const {height, width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
  },
  textWrap: {
    marginTop: 5,
    backgroundColor: '#fff',
    padding: 5
  },
  text: {
    fontSize: 14,
    color: '#333'
  }
})

export default connect(store => ({
  title: store.highlight.title,
  text: store.highlight.text
}))(Highlight)
