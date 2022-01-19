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

    const init = () => {
        PubSub.subscribe('addCategory', addCategory);
        PubSub.subscribe('categoryRemoved', removeCategory);
    }

    return {
        init,
    };
})();

UI.init();
CategoryController.init();




