import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { generateID } from '../../utilities/Utilities';
import { Passcodes } from './PasscodeCollection';

Meteor.methods({
  'Passcodes.define': function (data) {
    check(data, Object);
    const entity = Passcodes._collection.findOne({ code: data.code });
    if (entity) {
      console.error('Passcode already exists');
      throw new Meteor.Error('Passcode already exists');
    }
    try {
      const ID = data._id === undefined ? generateID() : data._id;
      return Passcodes._collection.insert({
        ...data,
        ...{ _id: ID },
      });

    } catch (error) {
      throw new Meteor.Error('create-failed', 'Failed to create new Passcode:', error);
    }
  },
  'Passcodes.update': function (data) {
    check(data, Object);
    const doc = Passcodes._collection.findOne({ _id: data._id });
    if (!doc) {
      console.error('Passcode not found');
      throw new Meteor.Error('Passcode not found');
    }
    try {
      Passcodes._collection.update(data._id, { $set: data });
    } catch (error) {
      throw new Meteor.Error('update-failed', 'Failed to update Passcode:', error);
    }
  },
  'Passcodes.remove': function (data) {
    check(data, String);
    const doc = Passcodes._collection.findOne({ _id: data });
    if (!doc) {
      console.error('Passcode not found');
      throw new Meteor.Error('Passcode not found');
    }
    try {
      Passcodes._collection.remove(data);
    } catch (error) {
      throw new Meteor.Error('remove-failed', 'Failed to remove Passcode:', error);
    }
  },
  'Passcodes.checkPasscode': function (code) {
    check(code, String);
    const doc = Passcodes._collection.findOne({ code });
    if (!doc || doc.expired) {
      console.error('Passcode not found or has expired');
      throw new Meteor.Error('Passcode not found or has expired');
    }
    return true;
  },
});
