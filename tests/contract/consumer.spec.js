const { eachLike, like } = require('@pact-foundation/pact').Matchers;
const { default: TodoClient } = require('../../src/api/todo-client');
const pact = require('../../pact');

const axios = require('axios').default;
axios.defaults.adapter = require('axios/lib/adapters/http'); 

const { provider } = pact;

let client = TodoClient.instance;

describe('Todo Service', () => {
  describe('When a request to list all todos', () => {
    beforeAll(() =>
      provider.setup().then( async (opts) => {
        console.log('options here', opts);
        client = new TodoClient(opts.port);
        await provider.addInteraction({
          uponReceiving: 'a request to list all todos',
          withRequest: {
            method: 'GET',
            path: '/todos',
          },
          willRespondWith: {
            status: 200,
            body: eachLike(
              {
                id: 1,
                text: 'Learn TDD'
              }
            ),
          },
        });
      })
    );

    test('should return the correct data', async () => {
      const data = await client.getTodos();
      expect(data[0].text).toBe('Learn TDD');
      expect(data[0].id).toBe(1);
    });

   
    afterEach(() => provider.verify());
    afterAll(() => provider.finalize());
  });
});
