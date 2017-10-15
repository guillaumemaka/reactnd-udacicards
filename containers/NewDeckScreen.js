import React, { Component } from 'react'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { Alert, Platform, Keyboard } from 'react-native'
import {
  Button,
  Form,
  Item,
  Label,
  Input,
  Container,
  Content,
  Header,
  Left,
  Right,
  Title,
  Body,
  Text,
  View,
  Icon
} from 'native-base'
import { globalStyles, iconSizes } from '../utils/helpers'
import { connect } from 'react-redux'
import { tintColor, primary, inactiveTintColor } from '../utils/colors'
import * as actions from '../actions'

export class NewDeckScreen extends Component {
  state = { title: '', error: '' }

  renderButton() {
    const valid = !this.state.title || this.state.error === ''
    if (Platform.OS === 'android') {
      return (
        <MaterialCommunityIcons
          name="check"
          size={32}
          color={valid ? tintColor : inactiveTintColor}
        />
      )
    }

    return (
      <Ionicons
        name="ios-checkmark"
        size={52}
        color={valid ? tintColor : inactiveTintColor}
      />
    )
  }

  saveDeck = async () => {
    this.props.addDeck(this.state.title)
    this.setState({ title: '' })
    Keyboard.dismiss()
    this.props.navigation.navigate('Home')
  }

  onTitleChange = text => {
    let title = text.trim()
    const exist =
      Object.keys(this.props.decks)
        .map(s => s.toLowerCase())
        .indexOf(title.toLowerCase()) !== -1
    if (exist) {
      this.setState({ title: text, error: 'This Deck already exist!' })
    } else {
      this.setState({ title: text, error: '' })
    }
  }

  render() {
    const { error } = this.state
    if (error) {
      Alert.alert('Invalid Deck Name', error)
    }
    return (
      <Container>
        <Header style={{ backgroundColor: primary }}>
          <Left />
          <Body>
            <Title>
              <Text style={{ color: tintColor }}>Add Deck</Text>
            </Title>
          </Body>
          <Right>
            <Button
              disabled={!this.state.title || error != ''}
              onPress={this.saveDeck}
              transparent
            >
              {this.renderButton()}
            </Button>
          </Right>
        </Header>
        <Content>
          <Form style={{ marginTop: 30 }}>
            <Item error={error !== ''}>
              <Input
                placeholder="Deck Title"
                value={this.state.title}
                onChangeText={this.onTitleChange}
              />
              {error !== '' && <Icon name="close-circle" />}
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps({ decks }) {
  return { decks }
}

export default connect(mapStateToProps, actions)(NewDeckScreen)
