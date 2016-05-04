import { Messages } from '../../../models/messages.js';

describe('Messages Model', () => {

  const timestamp = 'RANDOM TEST TIMESTAMP';

  beforeAll(() => {
    Meteor.call('Messages.add', 'Random test message', timestamp);
  });

  it('should perform CRUD operations on messages', () => {
    Messages.findOne({ timestamp });
  });

  afterAll(() => {
    Messages.remove({ timestamp });
  });

});
