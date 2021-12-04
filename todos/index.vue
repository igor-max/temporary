<template>
  <div class="todos">
    <h1 class="title">TODOS</h1>
    <div class="container">
      <header class="header">
        <span
          v-if="!!todos.length"
          @click="toggleAllTodoStatus"
          class="dot"
          :class="{ active: allCheck }"
        ></span>
        <input
          class="input"
          type="text"
          @keyup.enter="addTodo"
          placeholder="please input"
        />
      </header>
      <section class="main">
        <ul>
          <TodoItem
            v-for="(todo) in filterTodos"
            :key="todo.id"
            :todo="todo"
          />
        </ul>
      </section>
      <footer class="footer">
        <span class="footer_item">{{ activeTodos.length }}items</span>
        <span
          v-for="(item) in ['all', 'active', 'finish']"
          :key="item"
          class="footer_item"
          :class="{ active: item === type }"
          @click="type = item"
          >{{ item }}</span
        >
        <span
          class="footer_item clear"
          @click="removeFinishTodo"
          v-if="!!finishTodos.length"
          >clear finish</span
        >
      </footer>
    </div>
  </div>
</template>

<script>
import TodoItem from "./Todo.vue";
export default {
  name: "Todos",
  components: { TodoItem },
  data() {
    return {
      type: "all",
    };
  },
  methods: {
    addTodo(e) {
      const val = e.target.value.trim();
      if (val) {
        this.$store.commit("ADD_TODO", val);
      }
      e.target.value = "";
    },
    removeFinishTodo() {
      this.$store.commit("REMOVE_FINISH_TODO");
    },
    toggleAllTodoStatus() {
      this.$store.commit("TOGGLE_ALL_TODO_STATUS", !this.allCheck);
    },
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    // 改变数组对象中的值, computed不会运行
    filterTodos() {
      console.log(1);
      switch (this.type) {
        case "all":
          return this.todos;
        case "active":
          return this.activeTodos;
        case "finish":
          return this.finishTodos;
      }
    },
    activeTodos() {
      return this.todos.filter((v) => v.done == false);
    },
    finishTodos() {
      return this.todos.filter((v) => v.done == true);
    },
    allCheck() {
      return this.finishTodos.length === this.todos.length;
    },
  },
};
</script>

<style lang='scss' src='./index.scss'></style>