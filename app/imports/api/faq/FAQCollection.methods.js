import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { generateID } from '../../utilities/Utilities';
import { FAQ } from './FAQCollection';

Meteor.methods({
  'FAQ.define': function (data) {
    check(data, Object);
    const entity = FAQ._collection.findOne({ category: data.category, question: data.question });
    if (entity) {
      console.error('FAQ already exists');
      throw new Meteor.Error('FAQ already exists');
    }
    try {
      const ID = data._id === undefined ? generateID() : data._id;
      return FAQ._collection.insert({
        ...data,
        ...{ _id: ID },
      });

    } catch (error) {
      throw new Meteor.Error('create-failed', 'Failed to create new FAQ:', error);
    }
  },
  'FAQ.update': function (data) {
    check(data, Object);
    const doc = FAQ._collection.findOne({ _id: data._id });
    if (!doc) {
      console.error('FAQ not found');
      throw new Meteor.Error('FAQ not found');
    }
    try {
      FAQ._collection.update(data._id, { $set: data });
    } catch (error) {
      throw new Meteor.Error('update-failed', 'Failed to update FAQ:', error);
    }
  },
  'FAQ.remove': function (data) {
    check(data, String);
    const doc = FAQ._collection.findOne({ _id: data });
    if (!doc) {
      console.error('FAQ not found');
      throw new Meteor.Error('FAQ not found');
    }
    try {
      FAQ._collection.remove(data);
    } catch (error) {
      throw new Meteor.Error('remove-failed', 'Failed to remove FAQ:', error);
    }
  },
});
