import Vue from 'vue'
import Vuex from 'vuex';
import { v4 as uuidv4 } from 'uuid';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    // VUEX: 对数据本身的操作,都在VUEX中,其他的在data中
    // add todo
    ADD_TODO(state, text) {
      state.todos.push({
        text,
        done: false,
        id: uuidv4()
      });
    },
    REMOVE_TODO(state, id) {
      const index = state.todos.findIndex(v => v.id === id);
      state.todos.splice(index, 1);
    },
    REMOVE_FINISH_TODO(state) {
      state.todos = state.todos.filter(v => v.done === false);
    },
    TOGGLE_TODO_STATUS(state, id) {
      const index = state.todos.findIndex(v => v.id === id);
      state.todos[index].done = !state.todos[index].done;
    },
    TOGGLE_ALL_TODO_STATUS(state, status) {
      state.todos.forEach(todo => todo.done = status);
    },
    EDIT_TODO(state, { id, text }) {
      const index = state.todos.findIndex(v => v.id === id);
      state.todos[index].text = text;
    }
  }
})
