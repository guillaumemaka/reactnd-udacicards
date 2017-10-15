import React, { Component } from 'react'
import { Label, Text, View, Form, Item, Input, Button } from 'native-base'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { Platform, Keyboard } from 'react-native'
import { addCardToDeck, iconSizes } from '../utils/helpers'
import { activeTintColor, inactiveTintColor } from '../utils/colors'
import { connect } from 'react-redux'
import * as actions from '../actions'

class AddCardScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation
    const { onRightButtonPress, title, question, answer } = state.params
    const valid = question && answer
    return {
      title: `Add Card in ${title}`,
      headerRight: (
        <Button
          style={{ marginRight: 10 }}
          onPress={() => onRightButtonPress()}
          disabled={!valid}
          transparent
        >
          {Platform.OS === 'android' ? (
            <MaterialCommunityIcons
              name="check"
              size={iconSizes.android}
              color={valid ? activeTintColor : inactiveTintColor}
            />
          ) : (
            <Ionicons
              name="ios-checkmark"
              size={iconSizes.ios}
              color={valid ? activeTintColor : inactiveTintColor}
            />
          )}
        </Button>
      )
    }
  }

  state = {
    deckTitle: '',
    question: '',
    answer: ''
  }

  componentDidMount() {
    const deckTitle = this.props.navigation.state.params.title
    this.setState({ deckTitle })
    this.props.navigation.setParams({
      onRightButtonPress: this.onAddPress,
      question: this.state.question,
      answer: this.state.answer
    })
  }

  onAddPress = () => {
    console.log('onAddPress', { state: this.state })
    const { deckTitle, question, answer } = this.state

    this.props.addCardToDeck(deckTitle, { question, answer })
    Keyboard.dismiss()
    this.setState({ answer: '', question: '' })
    this.props.navigation.goBack()
  }

  onQuestionTextChange = question => {
    this.setState({ question })
    this.props.navigation.setParams({ question })
  }
  onAnswerTextChange = answer => {
    this.setState({ answer })
    this.props.navigation.setParams({ answer })
  }

  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <Form>
          <Item floatingLabel>
            <Label>Question</Label>
            <Input onChangeText={this.onQuestionTextChange} />
          </Item>
          <Item floatingLabel last>
            <Label>Answer</Label>
            <Input onChangeText={this.onAnswerTextChange} />
          </Item>
        </Form>
      </View>
    )
  }
}

export default connect(null, actions)(AddCardScreen)
