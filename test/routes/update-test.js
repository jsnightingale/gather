const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/:itemId/update', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('PUT', () => {
    it('updates existing post', async () => {
      const item = await seedItemToDatabase();
      item.description = 'This is the new description';
      const response = await request(app)
        .post(`/items/${item._id}/update`)
        .send(item)
        .expect(302);
      assert.isOk(response, 'Item was not updated successfully in the database');
    });
  });

});
