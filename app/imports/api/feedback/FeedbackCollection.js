import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const feedbackPublitcations = {
  feedbackAdmin: 'FeedbackAdmin',
};

class FeedbackCollection extends BaseCollection {
  constructor() {
    super('Feedback', new SimpleSchema({
      feedback: String,
    }));
  }

  /**
 * Defines a new Feedback item.
 * @param feedback the user feedback
 * @return {String} the dockID of the new document.
 */
  define({ feedback }) {
    const docID = this._collection.insert({
      feedback,
    });
    return docID;
  }

  /**
 * Update the given document
 * @param docID the id of the documnt to update
 * @param feedback the new feedback
 */
  update(docID, { feedback }) {
    const updateData = {};
    if (feedback) {
      updateData.feedback = feedback;
    }

    this._collection.update(docID, { $set: updateData });
  }

  /**
 * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
 * @param { String | Object } feedback The document ID or object.
 * @returns true
 */
  removeIt(docID) {
    const doc = this.findDoc(docID);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
 * Default publication method for entities.
 * It publishes the entire collection for admin.
 */
  publish() {
    if (Meteor.isServer) {
    // get tht FeedbackCollection instance.
      const instance = this;
      /** This subscription publishes documents for logged in users */
      Meteor.publish(feedbackPublitcations.feedbackAdmin, function publish() {
        return instance._collection.find();
      });
    }
  }

  /**
 * Subscription method for feedback.
 */
  subscribeFeedbackAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(feedbackPublitcations.feedbackAdmin);
    }
    return null;
  }

  /**
 * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
 * This is used in the define, update, and removeIt Meteor methods associated with each class.
 * @param userId The userId of the logged-in user. Can be null or undefined
 * @throws { Meteor.Error } If there is no logged-in user, or the user is not an Admin or User.
 */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
 * Returns an object representing the definition of docID in a format acceptable to the restoreOne or define function.
 * @param docID The docID of a Feedback
 * @returns {{ feedback: * }}
 */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const feedback = doc.feedback;
    return { feedback };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Feedback = new FeedbackCollection();
