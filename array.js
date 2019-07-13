const Memory = require('./memory')

let memory = new Memory()

class Array {
  constructor() {
    this.length = 0; //[]
    this._capacity = 0;
    this.ptr = memory.allocate(this.length); //0
  }
  //push(3)
  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error')
    }
    return memory.get(this.ptr + index)
  }

  pop() {
    if (this.length == 0) {
      throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }
}

function main() {

  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

  // Add an item to the array
  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);


  // Print the 1st item in the array arr.
  console.log(arr.get(0))

  // Empty the array and add just 1 item: arr.push("tauhida");
  arr.pop()
  arr.pop()
  arr.pop()
  arr.pop()
  arr.pop()
  arr.pop()
  arr.push("tauhida")

  // Print this 1 item that you just added. What is the result ? Can you explain your result ?
  // It is NaN, because the memory is instantiated as Float64Array which has to be numerical.

  //   What is the purpose of the _resize() function in your Array class?
  // The purpose is to increase the memory allocated to my Array class so that you don't overwrite memory already allocated to other purposes.

  console.log(arr);
}

main()

Array.SIZE_RATIO = 3;

