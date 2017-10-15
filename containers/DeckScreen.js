import React, { Component } from 'react'
import { Container, Content, Header, Text, View } from 'native-base'
import DeckDetails from '../components/DeckDetails'
import { getDeck } from '../utils/helpers'
import { connect } from 'react-redux'

class DeckScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })

  onAddPress = () => {
    const { navigation } = this.props
    navigation.navigate('AddCard', { title: this.props.deck.title })
  }

  onQuizzPress = () => {
    const { navigation } = this.props
    navigation.navigate('QuizzView', { title: this.props.deck.title })
  }

  render() {
    const { deck } = this.props
    return (
      <Container>
        <Content>
          {deck != null && (
            <DeckDetails
              deck={deck}
              onAddPress={this.onAddPress}
              onQuizzPress={this.onQuizzPress}
            />
          )}
        </Content>
      </Container>
    )
  }
}

function mapStateToProps({ decks }, { navigation }) {
  const { title } = navigation.state.params
  return {
    deck: decks[title]
  }
}

export default connect(mapStateToProps)(DeckScreen)
