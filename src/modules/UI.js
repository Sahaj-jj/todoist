import PubSub from "./pubsub";

const UI = (() => {
    const $categoryContainer = document.querySelector('.category-container');
    const $addCategoryBtn = document.querySelector('.add-category');
    let $currentActive = null;

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

    const addListener = (cat) => {
        const $category = $categoryContainer.lastChild;
        const $deletebtn = $category.lastChild;
        $deletebtn.addEventListener('click', () => {
            removeCategory($deletebtn.parentNode, cat.getName());
        })

        $category.addEventListener('click', () => {
            if ($currentActive) $currentActive.classList.remove('active');
            $category.classList.add('active');
            $currentActive = $category;
        })
    }

    const addCategory = (cat) => {
        $categoryContainer.appendChild(newCategory(cat.getName()));
        addListener(cat);
    }

    const removeCategory = (catElement, categoryName) => {
        catElement.remove();
        PubSub.publish('categoryRemoved', categoryName);
    }

    const activeCategory = () => {

    }

    const init = () => {
        $addCategoryBtn.addEventListener('click', () => {
            PubSub.publish('addCategory', prompt('Enter'));
        })

        PubSub.subscribe('categoryAdded', addCategory);
    }

    return {
        init,
    };
})();

export default UI;



