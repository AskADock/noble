import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const passcodePublications = {
  passcodeAdmin: 'PasscodeAdmin',
  passcodeQuestion: 'PasscodeQuestion',
};

class PasscodeCollection extends BaseCollection {
  constructor() {
    super('Passcodes', new SimpleSchema({
      code: String,
      createdAt: {
        type: Date,
        optional: true,
        defaultValue: new Date(),
      },
      expiredAt: {
        type: Date,
        optional: true,
      },
      expired: {
        type: Boolean,
        defaultValue: false,
      },
    }));
  }

  /**
   * Defines a new Passcode item.
   * @param code the passcode.
   * @createdAt the date the passcode was created.
   * @expired whether the passcode has been expired.
   * @return {String} the docID of the new document.
   */
  define({ code, createdAt = new Date(), expiredAt, expired }) {
    // Check if the passcode already exists
    const existingPasscode = this._collection.findOne({ code });
    if (existingPasscode) {
      throw new Meteor.Error('duplicate-passcode', 'The passcode already exists.');
    }

    const docID = this._collection.insert({
      code,
      createdAt,
      expiredAt,
      expired,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param code the new passcode (optional).
   * @param createdAt the new creation date (optional).
   * @param expired the new expired status (optional).
   */
  update(docID, { code, createdAt, expiredAt, expired }) {
    const updateData = {};
    // Checks that expiredAt date is after createdAt date
    const initDate = new Date(createdAt);
    const expiredDate = new Date(expiredAt);
    console.log('test', expiredDate, initDate);
    if (expiredDate < initDate) {
      console.error('expiredAt must be after createdAt');
      throw new Meteor.Error('invalid-date', 'expiredAt must be after createdAt');
    }

    if (code) {
      updateData.code = code;
    }
    if (createdAt) {
      updateData.createdAt = createdAt;
    }
    if (expiredAt) {
      updateData.expiredAt = expiredAt;
    }
    if (expired !== undefined) {
      updateData.expired = expired;
    }

    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes the given document.
   * @param docID the id of the document to remove.
   */
  removeIt(passcode) {
    const doc = this.findDoc(passcode);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Checks if the passcode is valid with the current passcode. Throws an error if it is not.
   * @param passcode
   * @returns {boolean}
   */
  checkPasscode(passcode) {
    check(passcode, String);
    const doc = this._collection.findOne({ code: passcode });
    // Check if the passcode exists
    if (!doc) {
      throw new Meteor.Error('invalid-passcode', 'The passcode is invalid.');
    }
    // Check if the passcode is expired. If so, set expired to true
    const now = new Date();
    if (doc.expired || (doc.expiredAt && doc.expiredAt < now)) {
      this.update(doc._id, { expired: true });
      throw new Meteor.Error('expired-passcode', 'The passcode has expired.');
    }

    return true;
  }

  /**
   * Default publication method for Passcodes.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;

      Meteor.publish(passcodePublications.passcodeAdmin, function publish() {
        if (this.userId && (Roles.userIsInRole(this.userId, ROLE.USER) || Roles.userIsInRole(this.userId, ROLE.ADMIN))) {
          return instance._collection.find();
        }
        return this.ready();
      });

      Meteor.publish(passcodePublications.passcodeQuestion, function publish() {
        return instance._collection.find({ expired: false });
      });
    }
  }

  /**
   * Subscribes to Passcodes.
   */
  subscribeAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(passcodePublications.passcodeAdmin);
    }
    return null;
  }

  subscribeQuestionPasscode() {
    if (Meteor.isClient) {
      return Meteor.subscribe(passcodePublications.passcodeQuestion);
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
 * @param docID The docID of a Question
 * @returns {{code: *, createdAt: *, expired: *, expiredAt: *}}
 */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const code = doc.code;
    const createdAt = doc.createdAt;
    const expiredAt = doc.expiredAt;
    const expired = doc.expired;
    return { code, createdAt, expiredAt, expired };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Passcodes = new PasscodeCollection();
