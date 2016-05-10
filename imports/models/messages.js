import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.startup(() => Messages.remove({}));

  Meteor.publish('messages', () => Messages.find({}, {
    limit: 25,
    sort: { timestamp: -1 },
  }));
}

Meteor.methods({

  'Messages.add'(message, timestamp = moment().unix()) {

    let username = 'John Doe';
    let userId = 9999999999;

    if (!Meteor.isTest) {
      username = Meteor.users.findOne(Meteor.userId()).profile.name;
      userId = Meteor.userId();
    }

    Messages.insert({ text: message, username, userId, timestamp });
  },

});
