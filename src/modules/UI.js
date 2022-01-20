import PubSub from "./pubsub";

const UI = (() => {

    /*
    Categories UI
    */

    const $categoryContainer = document.querySelector('.category-container');
    const $addCategoryBtn = document.querySelector('.add-category');
    let $currentActive = null;

    const createHtmlElement = (type, classArray = null, content = null) => {
        const element = document.createElement(type);
        if (classArray) classArray.forEach(cls => element.classList.add(cls));
        if (content) element.textContent = content;
        return element;
    }

    const newCategory = (category) => {
        const $cat = createHtmlElement('div', ['category']);
        $cat.appendChild(createHtmlElement('div', ['text'], category.getName()));
        $cat.appendChild(createHtmlElement('div', ['delete', 'btn'], 'x'));
        return $cat;
    }

    const addCategoryListener = (cat) => {
        const $category = $categoryContainer.lastChild;
        const $deletebtn = $category.lastChild;

        $deletebtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeCategory($deletebtn.parentNode, cat.getName());
        })

        $category.addEventListener('click', () => {
            setActive($category, cat.getName());
        })
    }

    const setActive = ($category, categoryName) => {
        if ($currentActive) $currentActive.classList.remove('active');
            $category.classList.add('active');
            $currentActive = $category;
        
        PubSub.publish('categoryActive', categoryName);
    }

    const addCategory = (cat) => {
        const $newCategory = newCategory(cat);
        $categoryContainer.appendChild($newCategory);
        addCategoryListener(cat);
        setActive($newCategory, cat.getName());
    }

    const removeCategory = ($category, categoryName) => {
        $category.remove();
        PubSub.publish('removeCategory', categoryName);
    }


    /*
    Items UI
    */
    
    const $itemContainer = document.querySelector('.item-container');
    const $addItemBtn = document.querySelector('.add-item');

    const newItemDOM = (item) => {
        const $item = createHtmlElement('div', ['item']);
        const $checkBox = document.createElement('input');
        $checkBox.type = 'checkbox';
        $item.appendChild($checkBox);
        $item.appendChild(createHtmlElement('div', ['text'], item.content));
        $item.appendChild(createHtmlElement('div', ['delete', 'btn'], 'x'));
        return $item;
    }

    const showItems = (items) => {
        while($itemContainer.childElementCount > 0) 
            $itemContainer.lastChild.remove();  // Clear contents

        items.map(item => addItemDOM(item));

    }

    const addItemDOM = (item) => {
        $itemContainer.appendChild(newItemDOM(item));
        //addItemListener(item);
    }

    const removeItem = () => {

    }

    const init = () => {
        $addCategoryBtn.addEventListener('click', () => {
            PubSub.publish('addCategory', prompt('Enter'));
        })

        $addItemBtn.addEventListener('click', () => {
            const activeCategoryName = $currentActive.firstChild.textContent;
            const itemContent = prompt('Enter');
            PubSub.publish('addItem', {activeCategoryName, itemContent});
        })

        PubSub.subscribe('categoryAdded', addCategory);

        PubSub.subscribe('categoryItemsLoaded', showItems);
        PubSub.subscribe('itemAdded', addItemDOM);
    }

    return {
        init,
    };
})();

export default UI;



