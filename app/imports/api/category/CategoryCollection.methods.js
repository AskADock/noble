import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { generateID } from '../../utilities/Utilities';
import { Categories } from './CategoryCollection';

Meteor.methods({
  'Categories.define': function (data) {
    check(data, Object);
    const entity = Categories._collection.findOne({ category: data.category, question: data.question });
    if (entity) {
      console.error('Categories already exists');
      throw new Meteor.Error('Categories already exists');
    }
    try {
      const ID = data._id === undefined ? generateID() : data._id;
      return Categories._collection.insert({
        ...data,
        ...{ _id: ID },
      });

    } catch (error) {
      throw new Meteor.Error('create-failed', 'Failed to create new Categories:', error);
    }
  },
  'Categories.update': function (data) {
    check(data, Object);
    const doc = Categories._collection.findOne({ _id: data._id });
    if (!doc) {
      console.error('Categories not found');
      throw new Meteor.Error('Categories not found');
    }
    try {
      Categories._collection.update(data._id, { $set: data });
    } catch (error) {
      throw new Meteor.Error('update-failed', 'Failed to update Categories:', error);
    }
  },
  'Categories.remove': function (data) {
    check(data, String);
    const doc = Categories._collection.findOne({ _id: data });
    if (!doc) {
      console.error('Categories not found');
      throw new Meteor.Error('Categories not found');
    }
    try {
      Categories._collection.remove(data);
    } catch (error) {
      throw new Meteor.Error('remove-failed', 'Failed to remove Categories:', error);
    }
  },
});
