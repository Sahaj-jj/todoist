import PubSub from "./modules/pubsub";
import UI from "./modules/UI";
import { Category } from "./modules/category"
import Storage from "./modules/storage";

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
        Storage.saveCategories(categories.map(cat => cat.getName()));
        cat.loadItems();
    }

    const removeCategory = (categoryName) => {
        const index = categories.indexOf(getCategory(categoryName));
        categories.splice(index, 1);
        Storage.saveCategories(categories.map(cat => cat.getName()));
        localStorage.removeItem(categoryName);
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

    const addItem = (item) => {
        getCategory(item.categoryName).addItem(item.content, item.date, item.categoryName);
    }

    const removeItem = ({categoryName, itemContent}) => {
        getCategory(categoryName).removeItem(itemContent);
    }

    const toggleDone = ({categoryName, itemContent}) => {
        getCategory(categoryName).toggleDone(itemContent);
    }

    const editItem = ([itemContent, item]) => {
        getCategory(item.categoryName).editItem(itemContent, item.content, item.date);
    }

    const init = () => {
        PubSub.subscribe('addCategory', addCategory);
        PubSub.subscribe('removeCategory', removeCategory);

        PubSub.subscribe('categoryActive', getItems);
        PubSub.subscribe('addItem', addItem);
        PubSub.subscribe('editItem', editItem);
        PubSub.subscribe('removeItem', removeItem);
        PubSub.subscribe('toggleDone', toggleDone);
    }

    return {
        init,
    };
})();

CategoryController.init();
UI.init();












