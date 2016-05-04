import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import { Messenger } from '../../../ui/components/messenger.js';
import { Messages } from '../../../models/messages.js';

describe('Messenger Component', () => {

  it('should add inputted messages to the queue', () => {

    let messenger = new Messenger();

    spyOn(Meteor, 'call').and.callFake((fName, ...args) => {
      expect(fName).toBe('Messages.add');
      expect(args[0]).toEqual('Hello, world!');
    });

    messenger.inputMessage = message => {

      if (typeof message === 'undefined') {
        return 'Hello, world!';

      } else {
        expect(message).toEqual('');
      }
    };

    messenger.addMessage();
  });

  it('should retrieve a list of recent messages', () => {

    let messenger = new Messenger();

    spyOn(Messages, 'find').and.returnValue({
      fetch: () => [
        { text: 'Hello world!' },
        { text: 'This is a message' },
      ],
    });

    let messages = messenger.messages();

    expect(messages.length).toEqual(2);
    expect(messages[0].text).toEqual('Hello world!');
    expect(messages[1].text).toEqual('This is a message');
  });

  describe('UI', () => {

    let element;

    beforeAll(() => {
      element = document.body.appendChild(document.createElement('div'));
      Blaze.render(Template.messengerView, element);
    });

    it('should include an input for entering new messages', () => {
      expect($('#message_input').length).toEqual(1);
    });

    it('should include an area to display list of messages', () => {
      expect($('#message_list').length).toEqual(1);
    });

  });

});
