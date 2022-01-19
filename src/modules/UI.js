import PubSub from "./pubsub";

const UI = (() => {
    const $categoryContainer = document.querySelector('.category-container');
    const $addCategoryBtn = document.querySelector('.add-category');

    const createHtmlElement = (type, classArray = null, content = null) => {
        const element = document.createElement(type);
        if (classArray) classArray.forEach(cls => element.classList.add(cls));
        if (content) element.textContent = content;
        return element;
    }

    const newCategory = (categoryName) => {
        const $cat = createHtmlElement('div', ['category']);
        $cat.appendChild(createHtmlElement('div', ['text'], categoryName));
        $cat.appendChild(createHtmlElement('div', ['delete', 'btn'], 'x'));
        return $cat;
    }

    const addEventListener = (cat) => {
        const $deletebtn = $categoryContainer.lastChild.lastChild;
        $deletebtn.addEventListener('click', () => {
            removeCategory($deletebtn.parentNode, cat.getName());
        })
    }

    // const updateCategories = (catArray) => {
    //     while($categoryContainer.childElementCount > 1)
    //         $categoryContainer.lastChild.remove();

    //     for (let i = 0; i < catArray.length; i++) {
    //         $categoryContainer.appendChild(newCategory(catArray[i].getName()));
    //     }
    // }

    const addCategory = (cat) => {
        $categoryContainer.appendChild(newCategory(cat.getName()));
    }

    const removeCategory = (catElement, categoryName) => {
        catElement.remove();
        PubSub.publish('categoryRemoved', categoryName);
    }

    const init = () => {
        $addCategoryBtn.addEventListener('click', () => {
            PubSub.publish('addCategory', prompt('Enter'));
        })

        PubSub.subscribe('categoryAdded', addCategory);
        PubSub.subscribe('categoryAdded', addEventListener);
    }

    return {
        init,
    };
})();

export default UI;



