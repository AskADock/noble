import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class AskADocPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ASK_A_DOC}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed() {
    // From https://testcafe.io/documentation/402803/recipes/best-practices/create-helpers
    // Note that this file imports t (the test controller) from the testcafe module. You don’t need to pass t to helper functions because TestCafe can resolve the current test context and provide the correct test controller instance.
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that the question submission works. */
  async submitQuestion(category, passcode, question) {
    await t.typeText(`#${COMPONENT_IDS.ASK_A_DOC_FORM_CATEGORY}`, category);
    await t.typeText(`#${COMPONENT_IDS.ASK_A_DOC_FORM_PASSCODE}`, passcode);
    await t.typeText(`#${COMPONENT_IDS.ASK_A_DOC_FORM_QUESTION}`, question);
    await t.click(`#${COMPONENT_IDS.ASK_A_DOC_FORM_SUBMIT}`);
    await t.click(`#${COMPONENT_IDS.ASK_A_DOC_FORM_CONFIRM}`);
  }
}

export const askADocPage = new AskADocPage();
