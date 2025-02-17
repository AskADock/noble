import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const faqPublications = {
  faq: 'FAQ',
  faqAdmin: 'FAQAdmin',
};

class FAQCollection extends BaseCollection {
  constructor() {
    super('FAQ', new SimpleSchema({
      category: String,
      question: String,
      answer: String,
      timestamp: Date,
    }));
  }

  /**
   * Defines a new FAQ item.
   * @param category the category of the question.
   * @param question the question.
   * @param answer the answer.
   * @param timestamp the timestamp.
   * @return {String} the docID of the new document.
   */
  define({ category, question, answer, timestamp = new Date() }) {
    const docID = this._collection.insert({
      category,
      question,
      answer,
      timestamp,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param category the new category (optional).
   * @param question the new question (optional).
   * @param answer the new answer (optional).
   * @param timestamp the new timestamp (optional).
   */
  update(docID, { category, question, answer, timestamp = new Date() }) {
    const updateData = {};
    if (category) {
      updateData.category = category;
    }
    if (question) {
      updateData.question = question;
    }
    if (answer) {
      updateData.answer = answer;
    }
    if (timestamp) {
      updateData.timestamp = timestamp;
    }

    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } faq The document ID or object.
   * @returns true
   */
  removeIt(question) {
    const doc = this.findDoc(question);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the questions not answered.
   */
  publish() {
    if (Meteor.isServer) {
      // get the FAQCollection instance.
      const instance = this;
      /** This subscription publishes documents for all users */
      Meteor.publish(faqPublications.faq, function publish() {
        return instance._collection.find();
      });
    }
  }

  /**
   * Subscription method for faqs.
   */
  subscribeFAQ() {
    if (Meteor.isClient) {
      return Meteor.subscribe(faqPublications.faq);
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
   * @param docID The docID of a FAQ
   * @returns {{category: *, question: *, answer: * }}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const category = doc.category;
    const question = doc.question;
    const answer = doc.answer;
    const timestamp = doc.timestamp;
    return { category, question, answer, timestamp };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const FAQ = new FAQCollection();
