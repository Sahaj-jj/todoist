const Storage = (() => {

    const saveCategories = (categories) => {
        localStorage.setItem('Categories', JSON.stringify(categories));
    }

    const saveItems = (categoryName, items) => {
        localStorage.setItem(categoryName, JSON.stringify(items));
    }

    const getCategories = () => {
        return JSON.parse(localStorage.getItem('Categories'));
    }

    const getItems = (categoryName) => {
        return JSON.parse(localStorage.getItem(categoryName));
    }

    return {
        saveCategories,
        saveItems,
        getCategories,
        getItems,
    }
})();

export default Storage;