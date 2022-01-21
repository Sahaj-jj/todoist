import PubSub from "./pubsub";

const Item = (isDone, content) => {
    return {
        isDone,
        content,
    };
}

const Category = (categoryName) => {
    let name = categoryName;
    let items = [];

    const _getItem = (itemContent) =>  items.find(item => item.content === itemContent);
    const getName = () => name;

    const addItem = (itemContent) => {
        const item = Item(false, itemContent);
        items.push(item);
        return item;
    }

    const removeItem = (itemContent) => {
        const item = _getItem(itemContent);
        const index = items.indexOf(item);
        items.splice(index, 1);
    }

    const toggleDone = (itemContent) => {
        const item = _getItem(itemContent);
        item.isDone = !item.isDone;
    }

    const getItems = () => items;

    return {
        getName,
        addItem,
        removeItem,
        toggleDone,
        getItems,
    };
}

export default Category;