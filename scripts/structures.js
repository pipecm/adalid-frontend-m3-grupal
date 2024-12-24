export class Queue {
    constructor(data) {
        this.data = data;
    }

    enqueue(item) {
        this.data.push(item);
        localStorage.setItem('appointments', JSON.stringify(this.data));
    }

    dequeue() {
        let dequeuedItem = this.data.shift();
        localStorage.setItem('appointments', JSON.stringify(this.data));
        return dequeuedItem;
    }

    size() {
        return this.data.length;
    }

    getData() {
        return this.data;
    }
}