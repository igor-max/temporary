function* test() {
  yield 1;
  yield 2;
  yield 3;
}

const result = test();
console.log(result.value)
