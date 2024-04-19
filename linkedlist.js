function linkedList() {
    let headNode = null;

    function node() {
        let value = null;
        let nextNode = null;

        return { value, nextNode };
    }

    function append(value) {
        let newNode = node();
        newNode.value = value;

        if (this.headNode === null) {
            this.headNode = newNode;
        } else {
            let currentNode = this.headNode;

            while (currentNode.nextNode != null) {
                currentNode = currentNode.nextNode;
            }

            currentNode.nextNode = newNode;
        }
    }

    function prepend(value) {
        let newNode = node();
        newNode.value = value;

        if (this.headNode === null) {
            this.headNode = newNode;
        } else {
            newNode.nextNode = this.headNode;
            this.headNode = newNode;

        }
    }

    function size() {
        // Starting counter at 1 because while loop won't count the tail node
        let counter = 1;
        let currentNode = this.headNode;

        // Returns 0 if linked list is empty
        if (this.headNode === null) {
            return 0;
        }

        // Traverses the linked list and adds to the counter for every node until it reaches the tail node.
        // Tail node is excluded from the count since its nextNode is null. This is accounted for by starting the counter at 1
        while (currentNode.nextNode != null) {
            currentNode = currentNode.nextNode;
            counter += 1;
        }

        return counter;
    }

    function head() {
        return this.headNode;
    }

    function tail() {
        let currentNode = this.headNode;

        while (currentNode.nextNode != null) {
            currentNode = currentNode.nextNode;
        }

        return currentNode;
    }

    function at(index) {
        let currentNode = this.headNode;

        for (let i = 0; i < index; i++) {
            currentNode = currentNode.nextNode;
        }

        return currentNode;
    }

    function pop() {
        let currentNode = this.headNode;

        for (let i = 0; i < this.size() - 1; i++) {
            currentNode = currentNode.nextNode;
        }

        currentNode.nextNode = null;
    }

    function contains(value) {
        let currentNode = this.headNode;

        for (let i = 0; i < this.size(); i++) {
            if (currentNode.value === value) {
                return true;
            }
            currentNode = currentNode.nextNode;
        }

        return false;
    }

    function find(value) {
        let index = 0;
        if (this.contains(value)) {
            let currentNode = this.headNode;

            for (let i = 0; i < this.size(); i++) {
                if (currentNode.value === value) {
                    return index;
                }

                index += 1;
            }
        } else {
            return null;
        }
    }

    function toString() {
        let string = '';
        let currentNode = this.headNode;

        for (let i = 0; i < this.size(); i++) {
            string += `( ${currentNode.value} ) -> `;
            currentNode = currentNode.nextNode;
        }

        string += 'null';
        return string;
    }

    return { headNode, node, append, prepend, size, head, tail, at, pop, contains, find, toString };
}