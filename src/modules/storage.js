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

    const loadSample = () => {
        localStorage.setItem('Categories', "[\"All\",\"General\",\"Exercise\",\"Study\"]");
        localStorage.setItem('All', "[]");
        localStorage.setItem('Exercise', "[{\"isDone\":true,\"content\":\"Leg day\",\"date\":\"2022-01-22\",\"categoryName\":\"Exercise\"},{\"isDone\":false,\"content\":\"Cardio\",\"date\":\"2022-01-23\",\"categoryName\":\"Exercise\"},{\"isDone\":false,\"content\":\"Pushups\",\"date\":\"2022-01-24\",\"categoryName\":\"Exercise\"}]");
        localStorage.setItem('General', "[{\"isDone\":false,\"content\":\"Wash dishes\",\"date\":\"2022-01-23\",\"categoryName\":\"General\"},{\"isDone\":false,\"content\":\"Take out the laundry\",\"date\":\"2022-01-23\",\"categoryName\":\"General\"}]");
        localStorage.setItem('Study', "[{\"isDone\":false,\"content\":\"Learn React framework\",\"date\":\"2022-01-27\",\"categoryName\":\"Study\"},{\"isDone\":true,\"content\":\"Juggle with Webpack\",\"date\":\"2022-01-23\",\"categoryName\":\"Study\"}]");
    }

    return {
        saveCategories,
        saveItems,
        getCategories,
        getItems,
        loadSample,
    }
})();

export default Storage;