import PubSub from "./pubsub";

const Item = (isDone, content, categoryName) => {
    return {
        isDone,
        content,
        categoryName,
    };
}

const Category = (categoryName) => {
    let name = categoryName;
    let items = [];

    const _getItem = (itemContent) =>  items.find(item => item.content === itemContent);
    const getName = () => name;

    const addItem = (itemContent, categoryName) => {
        const item = Item(false, itemContent, categoryName);
        items.push(item);
        return item;
    }

    const removeItem = (itemContent) => {
        const item = _getItem(itemContent);
        if (item == undefined) return null;
        const index = items.indexOf(item);
        items.splice(index, 1);
        return item;
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