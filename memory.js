class Memory {
  constructor() {
    this.memory = new Float64Array(1024);
    this.head = 0;
  }
  //allocate(1)
  allocate(size) {
    //0 + 1 > 0
    if (this.head + size > this.memory.length) {
      return null;
    }
    //start = 0
    let start = this.head;
    //this.head = 0
    this.head += size;

    return start; //0
  }

  free(ptr) { }

  copy(toIdx, fromIdx, size) {
    if (fromIdx === toIdx) {
      return;
    }

    if (fromIdx > toIdx) {
      // Iterate forwards
      for (let i = 0; i < size; i++) {
        this.set(toIdx + i, this.get(fromIdx + i));
      }
    } else {
      // Iterate backwards
      for (let i = size - 1; i >= 0; i--) {
        this.set(toIdx + i, this.get(fromIdx + i));
      }
    }
  }

  get(ptr) {
    return this.memory[ptr];
  }

  set(ptr, value) {
    this.memory[ptr] = value;
  }
}


module.exports = Memory;