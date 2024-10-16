import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const questionPublications = {
  question: 'Question',
  questionAdmin: 'QuestionAdmin',
};

class QuestionCollection extends BaseCollection {
  constructor() {
    super('Question', new SimpleSchema({
      category: {
        type: String,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        optional: true,
      },
      answered: {
        type: Boolean,
        defaultValue: false,
      },
    }));
  }

  /**
   * Defines a new Question item.
   * @param category the category of the question.
   * @param question the question.
   * @param answer the answer.
   * @param answered whether the question has been answered.
   * @return {String} the docID of the new document.
   */
  define({ category, question = '', answer = '', answered = false }) {
    const docID = this._collection.insert({
      category,
      question,
      answer,
      answered,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param category the new category (optional).
   * @param question the new question (optional).
   * @param answer the new answer (optional).
   * @param answered the new answered status (optional).
   */
  update(docID, { category, question, answer, answered }) {
    const updateData = {};
    if (category) updateData.category = category;
    if (question) updateData.question = question;
    if (answer !== undefined) updateData.answer = answer;
    if (answered !== undefined) updateData.answered = answered;

    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } question The document ID or object.
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
      // get the QuestionCollection instance.
      const instance = this;
      /** This subscription publishes documents when users are logged in */
      Meteor.publish(questionPublications.question, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.USER)) {
          return instance._collection.find({ answered: false });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(questionPublications.questionAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
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
   * @param docID The docID of a Question
   * @returns {{category: *, question: *, answer: *, answered: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const category = doc.category;
    const question = doc.question;
    const answer = doc.answer;
    const answered = doc.answered;
    return { category, question, answer, answered };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Questions = new QuestionCollection();
