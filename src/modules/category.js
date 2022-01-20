import PubSub from "./pubsub";

const Item = (id, content) => {
    return {
        id,
        content,
    };
}

const Category = (categoryName) => {
    let name = categoryName;
    let items = [];

    const getName = () => name;

    const addItem = (itemContent) => {
        const item = Item(0, itemContent);
        items.push(item);
        return item;
    }

    // const removeItem = (item) => {
    //     
    // }

    const getItems = () => items;

    return {
        getName,
        addItem,
        getItems,
    };
}

export default Category;