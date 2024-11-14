import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class FAQList {
  constructor() {
    this.pageId = `#${COMPONENT_IDS.FAQ_LIST}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that the search function works */
  async search() {
    await t.typeText(`#${COMPONENT_IDS.FAQ_LIST_SEARCH_BAR}`, 'DD2992');
    await t.expect(Selector(`#${COMPONENT_IDS.FAQ_LIST_SEARCH_BAR}`).value).eql('DD2992');
  }

  /** Asserts that the FAQ question and answer appears. */
  async questionAnswerCard() {
    await t.click(`#${COMPONENT_IDS.FAQ_LIST_CARD_ACCORDION}`);
    await t.expect(Selector(`#${COMPONENT_IDS.FAQ_LIST_QUESTION}`).exists).ok();
    await t.expect(Selector(`#${COMPONENT_IDS.FAQ_LIST_ANSWER}`).exists).ok();
  }
}

export const faqList = new FAQList();
