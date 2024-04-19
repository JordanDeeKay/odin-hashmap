import linkedlist from './linkedlist.js';

class hashmap {
    constructor(capacity = 10, loadfactor = 0.75) {
      this.bucket = new Array(capacity);
      this.capacity = capacity;
      this.loadfactor = loadfactor;
      this.size = 0;
    }
  
    node(key = null, value = null) {
      return { key, value };
    }
  
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      }
      return hashCode;
    }
  
    set(key, value) {
      const index = this.hash(key);
      if (!this.bucket[index]) {
        this.bucket[index] = [];
      }
      const bucket = this.bucket[index];
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
          bucket[i].value = value;
          return;
        }
      }
      bucket.push(this.node(key, value));
      this.size++;
      if (this.size > this.capacity * this.loadfactor) {
        this.grow();
      }
    }
  
    get(key) {
      const index = this.hash(key);
      if (!this.bucket[index]) {
        return null;
      }
      const bucket = this.bucket[index];
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
          return bucket[i].value;
        }
      }
      return null;
    }
    has(key) {
      const index = this.hash(key);
      if (!this.bucket[index]) {
        return false;
      }
      const bucket = this.bucket[index];
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
          return true;
        }
      }
      return false;
    }
    remove(key) {
      const index = this.hash(key);
      const bucket = this.bucket[index];
      if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
          if (bucket[i].key === key) {
            bucket.splice(i, 1);
            this.size--;
            return true;
          }
        }
      }
      return false;
    }
    length() {
      return this.size;
    }
    clear() {
      this.bucket = new Array(this.capacity);
      this.size = 0;
    }
    keys() {
      let arr = [];
      for (const bucket of this.bucket) {
        if (bucket) {
          for (const { key } of bucket) {
            arr.push(key);
          }
        }
      }
      return arr;
    }
    values() {
      let arr = [];
      for (const bucket of this.bucket) {
        if (bucket) {
          for (const { value } of bucket) {
            arr.push(value);
          }
        }
      }
      return arr;
    }
    entries() {
      let arr = [];
      for (const bucket of this.bucket) {
        if (bucket) {
          for (const { key, value } of bucket) {
            arr.push([key, value]);
          }
        }
      }
      return arr;
    }
    grow() {
      this.capacity *= 2;
      const newbucket = new Array(this.capacity);
      for (const bucket of this.bucket) {
        if (bucket) {
          for (const { key, value } of bucket) {
            const newindex = this.hash(key);
            if (!newbucket[newindex]) {
              newbucket[newindex] = [];
            }
            newbucket[newindex].push({ key, value });
          }
        }
      }
      this.bucket = newbucket;
    }
  }
  
  // Instantiate the HashMap
  const map = new hashmap();
  
  // Set some key-value pairs
  map.set("apple", "red");
  map.set("banana", "yellow");
  map.set("cherry", "red");
  map.set("date", "brown");
  
  // Print the size of the map
  console.log("Size:", map.length()); // Expected output: Size: 4
  
  // Check if a key exists
  console.log("Has 'apple'?", map.has("apple")); // Expected output: Has 'apple'? true
  console.log("Has 'grape'?", map.has("grape")); // Expected output: Has 'grape'? false
  
  // Get values by keys
  console.log("Value of 'banana':", map.get("banana")); // Expected output: Value of 'banana': yellow
  console.log("Value of 'date':", map.get("date")); // Expected output: Value of 'date': brown
  
  // Remove a key-value pair
  map.remove("cherry");
  console.log("Size after removing 'cherry':", map.length()); // Expected output: Size after removing 'cherry': 3
  
  // Get keys, values, and entries
  console.log("Keys:", map.keys()); // Expected output: Keys: [ 'apple', 'banana', 'date' ]
  console.log("Values:", map.values()); // Expected output: Values: [ 'red', 'yellow', 'brown' ]
  console.log("Entries:", map.entries()); // Expected output: Entries: [ [ 'apple', 'red' ], [ 'banana', 'yellow' ], [ 'date', 'brown' ] ]
