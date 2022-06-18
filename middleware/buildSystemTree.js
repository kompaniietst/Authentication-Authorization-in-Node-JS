class Node {
    constructor(id = '', name = '', type = '', path = '', createdAt = '', author = '') {
        this.id = id;
        this.name = name;
        this.type = type;
        this.path = path;
        this.createdAt = createdAt;
        this.author = author;
    }
}

class Tree {
    root = new Node();

    addNode(id, name, type, path, createdAt, author) {
        if (!this.root.children)
            this.root["children"] = [];
        let currentNode = this.root.children;

        if (path.length === 0) {
            this.root.children.push(new Node(id, name, type, path, createdAt, author));
            return;
        }

        recursion(path[0], currentNode);

        function recursion(pathElm, children) {
            children.forEach(child => {

                if (pathElm === child.id) {

                    if (path.length != path.indexOf(pathElm) + 1) {
                        let nextPathElem = path.indexOf(pathElm) + 1;
                        if (!child.children) child.children = [];

                        recursion(path[nextPathElem], child.children);
                        return;
                    }

                    if (!child.children)
                        child.children = [];
                    child.children.push(new Node(id, name, type, path));
                }
            })
        }
    }

    display() {
        console.log(this.root);
    }

    getTree() {
        return this.root;
    }
}

const buildTree = function (dataArr) {
    let newTree = new Tree();
    dataArr.forEach(elem => {
        newTree.addNode(elem.id, elem.name, elem.type, elem.path, elem.createdAt, elem.author);
    });

    return newTree.getTree();
}

module.exports = buildTree;