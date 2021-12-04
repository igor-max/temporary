<template>
  <li class="todo_item">
    <div class="no_edit">
      <span
        class="dot"
        :class="{ active: todo.done }"
        @click="toggleTodoStatus"
      ></span>
      <span class="text" @dblclick="changeTodo">{{ todo.text }}</span>
      <span class="remove" @click="removeTodo">xxx</span>
    </div>
    <input
      ref="input"
      class="edit_input"
      v-show="edit"
      type="text"
      :value='todo.text'
      @blur="editTodo"
      @keyup.enter="editTodo"
    />
    <!-- 这里我们用vuex修改数据,所以不用 v-model='todo.value' -->
  </li>
</template>

<script>
export default {
  props: {
    todo: Object,
  },
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    removeTodo() {
      this.$store.commit("REMOVE_TODO", this.todo.id);
    },
    toggleTodoStatus() {
      this.$store.commit("TOGGLE_TODO_STATUS", this.todo.id);
    },
    editTodo(e) {
      const text = e.target.value;
      this.$store.commit("EDIT_TODO", {
        id: this.todo.id,
        text
      });
      this.edit = false;
    },
    changeTodo() {
      this.edit = true;
      // 这里为什么要用 $nextTick 才能聚焦的了
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
};
</script>

<style>
</style>