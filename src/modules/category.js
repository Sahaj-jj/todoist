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

    const getName = () => name;

    const addItem = (itemContent) => {
        const item = Item(false, itemContent);
        items.push(item);
        return item;
    }

    const removeItem = (itemContent) => {
        const item = items.find(item => item.content === itemContent);
        const index = items.indexOf(item);
        items.splice(index, 1);
    }

    const getItems = () => items;

    return {
        getName,
        addItem,
        removeItem,
        getItems,
    };
}

export default Category;