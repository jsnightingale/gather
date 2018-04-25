const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits single item',() => {
  describe('clicks on item',() => {
    it('description is displayed', () => {
      const itemToCreate = buildItemObject();
      browser.url('/items/create');
      browser.setValue('#title-input', itemToCreate.title);
      browser.setValue('#description-input', itemToCreate.description);
      browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
      browser.click('#submit-button');
      assert.include(browser.getText('body'), itemToCreate.title);
      assert.include(browser.getAttribute('body img', 'src'), itemToCreate.imageUrl);

      browser.url('/');
      browser.click('.item-card a');

      assert.include(browser.getText('body'), itemToCreate.description);
    });

  });
});
