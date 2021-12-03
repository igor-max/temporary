<template>
  <li class="todo_item">
    <div class="no_edit">
      <span
        class="dot"
        :class="{ active: todo.done }"
        @click="toggleTodoStatus(index)"
      ></span>
      <span class="text" @dblclick="changeTodo">{{ todo.text }}</span>
      <span class="remove" @click="removeTodo(todo, index)">xxx</span>
    </div>
    <input
      ref="input"
      class="edit_input"
      v-show="edit"
      type="text"
      :value='todo.text'
      @blur="editTodo($event, index)"
      @keyup.enter="editTodo($event, index)"
    />
    <!-- 这里我们用vuex修改数据,所以不用 v-model='todo.value' -->
  </li>
</template>

<script>
export default {
  props: {
    todo: Object,
    index: Number,
  },
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    removeTodo(todo, index) {
      this.$store.commit("REMOVE_TODO", index);
    },
    toggleTodoStatus(index) {
      this.$store.commit("TOGGLE_TODO_STATUS", index);
    },
    editTodo(e, index) {
      const text = e.target.value;
      this.$store.commit("EDIT_TODO", { text, index });
      this.edit = false;
    },
    changeTodo() {
      this.edit = true;
      console.log(this.$refs.input);
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
};
</script>

<style>
</style>