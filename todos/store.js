// import Vue from 'vue'
// import Vuex from './MyVuex/index';

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     count: 1
//   },
//   mutations: {
//     SET_COUNT(state) {
//       state.count += 2;
//     }
//   },
//   getters: {
//     getCount(state) {
//       return state.count + 'lalala';
//     }
//   },
//   actions: {
//     setCount({ commit }) {
//       commit('SET_COUNT');
//     }
//   },
//   modules: {
//     a: {
//       namespaced: true,
//       state: {
//         count: 'a'
//       },
//       mutations: {
//         SET_COUNT(state) {
//           state.count += 2;
//         }
//       },
//       getters: {
//         getCount(state) {
//           return state.count + 'lalala';
//         }
//       },
//       actions: {
//         setCount1({ commit }) {
//           commit('SET_COUNT');
//         }
//       },
//       modules: {
//         aa: {
//           namespaced: true,
//           state: {
//             count: 'aa'
//           },
//           mutations: {
//             SET_COUNT(state) {
//               state.count += 2;
//             }
//           },
//           getters: {
//             getCount(state) {
//               return state.count + 'lalala';
//             }
//           },
//           actions: {
//             setCount2({ commit }) {
//               commit('SET_COUNT');
//             }
//           },
//           modules: {
//             aaa: {
//               namespaced: true,
//               state: {
//                 count: 'aaa'
//               },
//               mutations: {
//                 SET_COUNT(state) {
//                   state.count += 2;
//                 }
//               },
//               getters: {
//                 getCount(state) {
//                   return state.count + 'lalala';
//                 }
//               },
//               actions: {
//                 setCount3({ commit }) {
//                   commit('SET_COUNT');
//                 }
//               },
//               modules: {
//                 aaaa: {
//                   namespaced: true,
//                   state: {
//                     count: 'aaaa'
//                   },
//                   mutations: {
//                     SET_COUNT(state) {
//                       state.count += 2;
//                     }
//                   },
//                   getters: {
//                     getCount(state) {
//                       return state.count + 'lalala';
//                     }
//                   },
//                   actions: {
//                     setCount4({ commit }) {
//                       commit('SET_COUNT');
//                     }
//                   },
//                 }
//               }
//             }
//           }
//         }
//       }
//     },
//     // b: {
//     //   state: {}
//     // }
//   }
// })







import Vue from 'vue'
import Vuex from 'vuex';

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
        done: false
      });
    },
    REMOVE_TODO(state, index) {
      state.todos.splice(index, 1);
    },
    REMOVE_FINISH_TODO(state) {
      state.todos = state.todos.filter(v => v.done === false);
    },
    TOGGLE_TODO_STATUS(state, index) {
      state.todos[index].done = !state.todos[index].done;
    },
    TOGGLE_ALL_TODO_STATUS(state, status) {
      state.todos.forEach(todo => todo.done = status);
    },
    EDIT_TODO(state, { index, text }) {
      state.todos[index].text = text;
    }
  },
  getters: {
    
  },
  actions: {
  
  }
})
