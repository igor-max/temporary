
// unique memory stopOnFalse once (还差 memory 没实现)
class Observe {
  constructor(options) {
    this.list = [];
    this.options = options.split(' ');
    this.fired = false;
  } 

  add(...args) {
    args.forEach(it => {
      if (!this.options.includes('unique') || !this.list.includes(it)) {
        this.list.push(it)
      }
    });
  }

  remove(...args) {
    let index;
    args.forEach(it => {
      while ((index = this.list.findIndex(v => v === it)) > -1) {
        this.splice(index, 1);
      }
    });
  }

  fire(val) {
    if(!this.fired) {
      for(let i = 0; i < this.list; i++) {
        const result = this.list[i](val);
        if(this.options.includes('stopOnFalse') && result === false) {
          break;
        }
      }
      this.fired = true;
    }
  }
}

