import React, { Component } from 'react'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { Platform, Keyboard } from 'react-native'
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
  View
} from 'native-base'
import { globalStyles, iconSizes } from '../utils/helpers'
import { connect } from 'react-redux'
import { tintColor, primary, inactiveTintColor } from '../utils/colors'
import * as actions from '../actions'

export class NewDeckScreen extends Component {
  state = { title: '' }

  renderButton() {
    if (Platform.OS === 'android') {
      return (
        <MaterialCommunityIcons
          name="check"
          size={32}
          color={this.state.title ? tintColor : inactiveTintColor}
        />
      )
    }

    return (
      <Ionicons
        name="ios-checkmark"
        size={52}
        color={this.state.title ? tintColor : inactiveTintColor}
      />
    )
  }

  saveDeck = async () => {
    this.props.addDeck(this.state.title)
    this.setState({ title: '' })
    Keyboard.dismiss()
    this.props.navigation.navigate('Home')
  }

  onTitleChange = title => {
    this.setState({ title })
  }

  render() {
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
              disabled={!this.state.title}
              onPress={this.saveDeck}
              transparent
            >
              {this.renderButton()}
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label style={{ fontSize: 20 }}>Deck Title</Label>
              <Input
                value={this.state.title}
                onChangeText={this.onTitleChange}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}

export default connect(null, actions)(NewDeckScreen)
