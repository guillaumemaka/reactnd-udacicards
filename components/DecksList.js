import React, { Component } from 'react'
import { Platform } from 'react-native'
import {
  Badge,
  Body,
  Container,
  Content,
  Card,
  CardItem,
  List,
  ListItem,
  Left,
  Text,
  Right
} from 'native-base'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

class DecksList extends Component {
  static propTypes = {
    decks: PropTypes.object.isRequired,
    onRowPress: PropTypes.func
  }
  renderRow = deck => {
    const { onRowPress } = this.props
    const Icon =
      Platform.OS === 'android' ? (
        <MaterialIcons size={32} name="keyboard-arrow-right" />
      ) : (
        <Ionicons size={32} name="ios-arrow-forward" />
      )

    return (
      <ListItem
        style={{ marginLeft: 0 }}
        button
        key={deck.title}
        onPress={() => onRowPress(deck)}
      >
        <Body>
          <Text style={{ fontSize: 24 }}>{deck.title}</Text>
          <Text note>{deck.questions.length} cards</Text>
        </Body>
        <Right>{Icon}</Right>
      </ListItem>
    )
  }
  render() {
    const decks = Object.keys(this.props.decks).map(
      title => this.props.decks[title]
    )
    return <List dataArray={decks} renderRow={this.renderRow} />
  }
}

export default DecksList
