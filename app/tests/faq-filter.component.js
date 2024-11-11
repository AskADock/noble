import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class FAQFilter {
  constructor() {
    this.pageId = `#${COMPONENT_IDS.FAQ_FILTER}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Assert thet the FAQ Filter is displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that the FAQ filter dropdown works */
  async filterDropdown() {
    await t.click(`#${COMPONENT_IDS.FAQ_FILTER_DROPDOWN}`);
    await t.click(`#${COMPONENT_IDS.FAQ_FILTER_DROPDOWN_SELECT}`);
  }
}

export const faqFilter = new FAQFilter();
