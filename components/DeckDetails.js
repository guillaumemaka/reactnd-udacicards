import React, { Component } from 'react'
import { Text, View, Button } from 'native-base'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export class DeckDetails extends Component {
  static propTypes = {
    deck: PropTypes.object.isRequired,
    onAddPress: PropTypes.func,
    onQuizzPress: PropTypes.func
  }

  render() {
    const { deck, onAddPress, onQuizzPress } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.cardCount} note>
            {deck.questions.length} cards
          </Text>
        </View>
        <View>
          <Button bordered style={styles.buttons} block onPress={onAddPress}>
            <Text>Add Card</Text>
          </Button>
          {deck.questions.length > 0 && (
            <Button style={styles.buttons} block dark onPress={onQuizzPress}>
              <Text>Start Quizz</Text>
            </Button>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: 'center'
  },
  detailsContainer: {
    marginBottom: 30
  },
  buttons: {
    marginBottom: 10
  },
  title: {
    fontSize: 52
  },
  cardCount: {
    textAlign: 'center',
    fontSize: 28
  }
})

export default DeckDetails
