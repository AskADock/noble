import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

/** Create an instance of a SimplePage when all you need to do is verify that the page was displayed. */
class SimplePage {
  constructor(id) {
    this.pageId = `#${id}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed() {
    // From https://testcafe.io/documentation/402803/recipes/best-practices/create-helpers
    // Note that this file imports t (the test controller) from the testcafe module. You don’t need to pass t to helper functions because TestCafe can resolve the current test context and provide the correct test controller instance.
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const questionCompassPage = new SimplePage(PAGE_IDS.QUESTION_COMPASS);
export const privacyPolicyPage = new SimplePage(PAGE_IDS.PRIVACY_POLICY);
export const signOutPage = new SimplePage(PAGE_IDS.SIGN_OUT);

// Med Pages
export const medHomePage = new SimplePage(PAGE_IDS.MED_HOME);
export const FAQManagementPage = new SimplePage(PAGE_IDS.FAQ_MANAGEMENT);
export const questionManagementPage = new SimplePage(PAGE_IDS.QUESTION_MANAGEMENT);
export const feedbackManagementPage = new SimplePage(PAGE_IDS.FEEDBACK_MANAGEMENT);
export const categoryManagementPage = new SimplePage(PAGE_IDS.CATEGORY_MANAGEMENT);
export const flyerManagementPage = new SimplePage(PAGE_IDS.FLYER_MANAGEMENT);
export const passcodeManagementPage = new SimplePage(PAGE_IDS.PASSCODE_MANAGEMENT);

// Admin Pages
export const manageDatabasePage = new SimplePage(PAGE_IDS.MANAGE_DATABASE);
export const userManagementPage = new SimplePage(PAGE_IDS.USER_MANAGEMENT);
