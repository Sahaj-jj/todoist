import PubSub from "./pubsub";
import Storage from "./storage";

const Item = (isDone, content, date, categoryName) => {
    return {
        isDone,
        content,
        date,
        categoryName,
    };
}

const Category = (categoryName) => {
    let name = categoryName;
    let items = [];

    const loadItems = () => {
        items = Storage.getItems(categoryName);
        if (items == null) items = [];
    }

    const _getItem = (itemContent) =>  items.find(item => item.content === itemContent);
    const getName = () => name;

    const addItem = (itemContent, itemDate, categoryName) => {
        const item = Item(false, itemContent, itemDate, categoryName);
        items.push(item);
        Storage.saveItems(categoryName, items);
    }

    const removeItem = (itemContent) => {
        const item = _getItem(itemContent);
        const index = items.indexOf(item);
        items.splice(index, 1);
        Storage.saveItems(categoryName, items);
    }

    const editItem = (itemContent, newItemContent, newItemDate) => {
        const item = _getItem(itemContent);
        item.date = newItemDate;
        item.content = newItemContent;
        Storage.saveItems(categoryName, items);
    }

    const toggleDone = (itemContent) => {
        const item = _getItem(itemContent);
        item.isDone = !item.isDone;
        Storage.saveItems(categoryName, items);
    }

    const getItems = () => items;


    return {
        loadItems,
        getName,
        addItem,
        removeItem,
        editItem,
        toggleDone,
        getItems,
    };
}

export { Category, Item};