import PubSub from "./modules/pubsub";
import UI from "./modules/UI";
import Category from "./modules/category"

const CategoryController = (() => {

    // Category

    const categories = [];

    const getCategory = (categoryName) => {
        return categories.find(cat => cat.getName() === categoryName);
    }
    
    const addCategory = (categoryName) => {
        console.log(categoryName);
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
        let items = [];
        if (categoryName === categories[0].getName()) {
            categories.map(cat => cat.getItems().map(item => items.push(item)));
        }
        else items = getCategory(categoryName).getItems();
        PubSub.publish('categoryItemsLoaded', items);
    }

    const addItem = ({categoryName, itemContent}) => {
        const item = getCategory(categoryName).addItem(itemContent, categoryName); // Add to Home
        PubSub.publish('itemAdded', item);
    }

    const removeItem = ({categoryName, itemContent}) => {
        getCategory(categoryName).removeItem(itemContent);
    }

    const toggleDone = ({categoryName, itemContent}) => {
        getCategory(categoryName).toggleDone(itemContent);
    }

    const init = () => {
        PubSub.subscribe('addCategory', addCategory);
        PubSub.subscribe('removeCategory', removeCategory);

        PubSub.subscribe('categoryActive', getItems);
        PubSub.subscribe('addItem', addItem);
        PubSub.subscribe('removeItem', removeItem);
        PubSub.subscribe('toggleDone', toggleDone);
    }

    return {
        init,
    };
})();

CategoryController.init();
UI.init();








