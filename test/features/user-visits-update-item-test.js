const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits single item',() => {
  describe('clicks on update',() => {
    it('fields show filled out with existing data', async () => {
      const itemToUpdate = buildItemObject();
      const description = 'This is a new description';
      browser.url('/items/create');
      browser.setValue('#title-input', itemToUpdate.title);
      browser.setValue('#description-input', itemToUpdate.description);
      browser.setValue('#imageUrl-input', itemToUpdate.imageUrl);
      browser.click('#submit-button');
      assert.include(browser.getText('body'), itemToUpdate.title);
      assert.include(browser.getAttribute('body img', 'src'), itemToUpdate.imageUrl);

      browser.url('/');
      browser.click('.item-card a');

      assert.include(browser.getText('body'), itemToUpdate.description);

      browser.click('#update-button');

      browser.setValue('#description-input', description);

      browser.click('#submit-button');

      assert.include(browser.getText('body'), description);
    });
  });
});
