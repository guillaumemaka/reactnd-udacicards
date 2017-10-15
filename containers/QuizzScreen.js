import React, { Component } from 'react'
import { Button, Text, View } from 'native-base'
import { Animated, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { primary } from '../utils/colors'

export class QuizzScreen extends Component {
  state = {
    correctAnswers: 0,
    currentQuestion: 1,
    showAnswer: false
  }

  constructor(props) {
    super(props)
    this.animated = new Animated.Value(0)
  }

  toggleAnswer = () => {
    this.setState(state => ({
      showAnswer: !state.showAnswer
    }))
  }

  onCorrectPress = e => {
    const { currentQuestion } = this.state
    const { question, answer } = this.props.questions[currentQuestion - 1]

    this.setState(state => ({
      correctAnswers: state.correctAnswers + 1,
      currentQuestion: state.currentQuestion + 1,
      showAnswer: false
    }))

    console.log(this.state)
  }

  onIncorrectPress = e => {
    this.setState(state => ({
      currentQuestion: state.currentQuestion + 1,
      showAnswer: false
    }))
    console.log(this.state)
  }

  renderQuestion = () => {
    const { questions } = this.props
    const { currentQuestion, correctAnswers, showAnswer } = this.state

    return (
      <View style={{ flex: 1 }}>
        <Text style={{ padding: 20, fontWeight: 'bold' }}>
          {currentQuestion} / {questions.length}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
            alignContent: 'center'
          }}
        >
          <View>
            <Animated.Text
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              {!showAnswer
                ? questions[currentQuestion - 1].question
                : questions[currentQuestion - 1].answer}
            </Animated.Text>

            <Button
              onPress={this.toggleAnswer}
              style={{ marginTop: 10, marginBottom: 20 }}
              transparent
              danger
              block
            >
              <Text style={{ fontWeight: 'bold' }}>
                {showAnswer ? 'Question' : 'Answer'}
              </Text>
            </Button>
          </View>
          <View>
            <Button
              onPress={this.onCorrectPress}
              style={{ marginBottom: 10 }}
              success
              block
            >
              <Text>Correct</Text>
            </Button>
            <Button onPress={this.onIncorrectPress} danger block>
              <Text>Incorrect</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }

  renderResult() {
    const { correctAnswers } = this.state
    const { questions } = this.props
    const wellDone = questions.length === correctAnswers

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View>
          <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 32 }}>
            Correct Answers
          </Text>
        </View>
        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              marginTop: -20,
              fontSize: 72,
              fontWeight: 'bold',
              color: wellDone ? '#629C49' : '#CC6666'
            }}
          >
            {correctAnswers}
          </Text>
          <Text
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              color: primary,
              fontSize: 76,
              fontWeight: 'bold'
            }}
          >
            /
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 72,
              fontWeight: 'bold',
              color: '#629C49'
            }}
          >
            {questions.length}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    const { questions } = this.props
    const { currentQuestion, correctAnswers, showAnswer } = this.state

    return questions.length < currentQuestion
      ? this.renderResult()
      : this.renderQuestion()
  }
}

function mapStateToProps({ decks }, { navigation }) {
  const { title } = navigation.state.params
  const questions = decks[title].questions
  return {
    questions
  }
}

export default connect(mapStateToProps, actions)(QuizzScreen)
