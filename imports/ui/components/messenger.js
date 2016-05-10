import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Messages } from '../../models/messages.js';

import './messenger.html';

export class Messenger {

  constructor() {
    this.inputMessage = '';
  }

  onCreated() {
    Meteor.subscribe('messages');
  }

  messages() {
    return Messages.find().fetch();
  }

  addMessage() {
    Meteor.call('Messages.add', this.inputMessage());
    this.inputMessage('');
  }

  isOwnMessage(message) {
    return message && message.userId === Meteor.userId();
  }

  userLoggedIn() {
    return Meteor.userId();
  }
}

Template.messengerView.viewmodel(new Messenger());
