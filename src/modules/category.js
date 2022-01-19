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
        items.push(Item(items.length, itemContent));
        PubSub.publish('itemAdded', items.slice(-1));
    }

    // const removeItem = (item) => {
    //     
    // }

    return {
        getName,
        addItem,
    };
}

export default Category;