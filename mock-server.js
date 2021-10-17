const { eachLike, like,  } = require('@pact-foundation/pact').Matchers;
const pact = require('./pact');

const { provider } = pact;

module.exports.stop = async () => {
  await provider.removeInteractions();
  await provider.finalize();
};

module.exports.start = async () => {
  const opts = await provider.setup();
  console.log('Mock server options', opts);
  await provider.addInteraction({
    uponReceiving: 'a request to list all todos',
    withRequest: {
      method: 'GET',
      path: '/todos',
    },
    willRespondWith: {
      status: 200,
      body: eachLike({
        id: 1,
        text: 'Learn TDD',
      }),
    },
  });

  await provider.addInteraction({
    uponReceiving: 'a request to add new todo',
    withRequest: {
      method: 'POST',
      path: '/todos',
      body: like({
        text: 'Learn TDD',
      }),
    },
    willRespondWith: {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: like(
        {
          id: 1,
          text: 'Learn TDD',
        }
      ),
    },
  });
};


module.exports.configureAxios = () => {
  const axios = require('axios').default;
  axios.defaults.adapter = require('axios/lib/adapters/http');
  return axios;
}