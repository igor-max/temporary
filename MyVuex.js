
let Vue;

const install = _Vue => {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      const options = this.$options;
      if(options.store) {
        this.$store = options.store;
      } else if(options.parent && options.parent.$store) {
        this.$store = options.parent.$store;
      }
    }
  })
};

class Store {
  constructor(options = {}) {
    const { state = {}, getters = {}, mutations = {}, actions } = options;

    this.vm = new Vue({
      data: {
        state
      }
    });

    // init getters
    this.getters = {};
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state);
        }
      })
    });

    // init mutations
    this.mutations = mutations;

    // init actions
    this.actions = actions;
  }

  commit(name) {
    this.mutations[name](this.state);
  }

  dispatch(name) {
    // 传入的参数
    this.actions[name](this);  
  }

  get state() {
    return this.vm.state;
  }
}

export default {
  install,
  Store
};