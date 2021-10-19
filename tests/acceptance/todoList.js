import { Selector, fixture, test } from 'testcafe';


const url = process.env.APP_DEV_URL || 'http://localhost:8080/';


fixture`Todo list`.page`${url}`

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
