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
            categories.map(cat => {
                //console.log(cat.getItems());
                cat.getItems().map(item => items.push(item));
            });
        }
        else items = getCategory(categoryName).getItems();
        PubSub.publish('categoryItemsLoaded', items);
    }

    const addItem = ({activeCategoryName, itemContent}) => {
        const item = getCategory(activeCategoryName).addItem(itemContent); // Add to Home
        PubSub.publish('itemAdded', item);
    }

    const removeItem = ({activeCategoryName, itemContent}) => {
        getCategory(activeCategoryName).removeItem(itemContent);
    }

    const toggleDone = ({activeCategoryName, itemContent}) => {
        getCategory(activeCategoryName).toggleDone(itemContent);
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








