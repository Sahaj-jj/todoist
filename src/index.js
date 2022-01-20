import PubSub from "./modules/pubsub";
import UI from "./modules/UI";
import Category from "./modules/category"

// function test() {
//     const cat = Category('hi');

//     PubSub.subscribe('addItem', cat.addItem);
//     PubSub.publish('addItem', 'test');
// }

// test();


const CategoryController = (() => {

    // Category

    const categories = [];

    const getCategory = (categoryName) => {
        return categories.find(cat => cat.getName() === categoryName);
    }
    
    const addCategory = (categoryName) => {
        if (getCategory(categoryName)) {
            alert('This category already exists!');
            return;
        }
        const cat = Category(categoryName);
        categories.push(cat);
        PubSub.publish('categoryAdded', cat);
    }

    const removeCategory = (categoryName) => {
        const index = categories.indexOf(getCategory(categoryName));
        categories.splice(index, 1);
    }

    // Items

    const getItems = (categoryName) => {
        const items = getCategory(categoryName).getItems();
        PubSub.publish('showItems', items);
    }

    const addItem = (itemInfoObj) => {
        const activeCat = getCategory(itemInfoObj.activeCategoryName);
        const item = activeCat.addItem(itemInfoObj.itemContent);
        PubSub.publish('itemAdded', item);
    }

    const init = () => {
        PubSub.subscribe('addCategory', addCategory);
        PubSub.subscribe('removeCategory', removeCategory);

        PubSub.subscribe('categoryActive', getItems);
        PubSub.subscribe('addItem', addItem);
    }

    return {
        init,
    };
})();

UI.init();
CategoryController.init();

PubSub.publish('addCategory', 'All');
PubSub.publish('addCategory', 'Random');
PubSub.publish('addCategory', 'Categories');




