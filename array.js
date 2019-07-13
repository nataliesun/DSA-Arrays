const memory = require('./memory')

class Array {
  constructor() {
    this.length = 0; //[]
    this.ptr = memory.allocate(this.length); //0
  }
  //push(3)
  push(value) {
    //
    this._resize(this.length + 1) //1
    memory.set(this.ptr + this.length, value)
    this.length++
  }
  //resize(1)
  _resize(size) {
    //oldPtr = 0
    const oldPtr = this.ptr
    //1
    this.ptr = memory.allocate(size) //null ?

    if (this.ptr === null) {
      throw new Error('Out of memory')
    }

    memory.copy(this.ptr, oldPtr, this.length)
    memory.free(oldPtr)
  }

}