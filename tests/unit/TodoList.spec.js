import { shallowMount } from '@vue/test-utils';
import * as mockServer from '../../mock-server';

const axios = require('axios').default;
axios.defaults.adapter = require('axios/lib/adapters/http'); 

import TodoList from '../../src/components/TodoList.vue';

const factory = (todos = []) => {
  return shallowMount(TodoList, {
    data: () => ({ todos }),
  });
};

describe('TodoList', () => {
  beforeAll(async () => {
    await mockServer.start();
  });

  afterAll(async () => {
    await mockServer.stop();
  });

  const todos = ['Todo 1', 'Todo 2', 'Todo3'].map((todo, i) => ({
    id: i,
    text: todo,
  }));

  it('shows an input and a submit button', () => {
    const wrapper = factory();
    expect(wrapper.find('input').isVisible()).toBe(true);
    expect(wrapper.find('button').isVisible()).toBe(true);
  });

  it('shows no input if there is no todo item', () => {
    const wrapper = factory();
    expect(wrapper.find('.no-todo').isVisible()).toBe(true);
  });

  it('renders todos in a list', () => {
    const wrapper = factory(todos);
    expect(wrapper.find('.no-todo').exists()).toBe(false);
  });

  it('inserts todo into the list', async () => {
    const wrapper = factory();
    wrapper.find('input').setValue('Learn TDD');
    wrapper.find('button').trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.no-todo').exists()).toBe(false);
      expect(wrapper.find('.todo-item').text()).toBe('Learn TDD');
    });
  });
});
