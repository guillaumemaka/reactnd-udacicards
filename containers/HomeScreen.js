import React, { Component } from 'react'
import { globalStyles } from '../utils/helpers'
import { Container, Content, Text, View } from 'native-base'
import DecksList from '../components/DecksList'
import { getDecks } from '../utils/helpers'
import { connect } from 'react-redux'
import * as actions from '../actions'

class HomeScreen extends Component {
  state = { decks: {} }

  componentDidMount() {
    this.props.getDecks()
  }

  onRowPress = deck => {
    const { navigation } = this.props
    navigation.navigate('Details', { title: deck.title })
    console.log({ deck })
  }

  render() {
    const { decks } = this.props
    return (
      <Container>
        <Content>
          {decks ? (
            <DecksList decks={decks} onRowPress={this.onRowPress} />
          ) : (
            <Text>No decks.</Text>
          )}
        </Content>
      </Container>
    )
  }
}

function mapStateToProps({ decks }) {
  return { decks }
}

export default connect(mapStateToProps, actions)(HomeScreen)
