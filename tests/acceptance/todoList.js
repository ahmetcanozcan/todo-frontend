import { Selector, fixture, test } from 'testcafe';

const mockServer = require('../../mock-server');

const url = 'http://localhost:8080/';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

fixture`Todo list`.page`${url}`
  .before(async () => {
    await wait(1000);
    await mockServer.start();
  })
  .after(async () => {
    await mockServer.stop();
  });

test('should add a todo', async (t) => {
  const testInput = 'buy some milk';

  // wait for page to load
  await t.wait(2000);

  await t
    .typeText('input', testInput)
    .wait(500)
    .click('button')
    .wait(2000);

  await t.expect(Selector('li').withText(testInput).exists).ok();
});
