import PubSub from "./pubsub";

const UI = (() => {

    /*
    Util
    */

    const createHtmlElement = (type, classArray = null, content = null) => {
        const element = document.createElement(type);
        if (classArray) classArray.forEach(cls => element.classList.add(cls));
        if (content) element.textContent = content;
        return element;
    }

    const getCategoryName = ($category) => {
        return $category.classList.value.split(' ')[0];
    }

    /*
    Categories UI
    */

    const $categoryContainer = document.querySelector('.category-container');
    const $addCategoryBtn = document.querySelector('.add-category');
    let $currentActive = null;

    const newCategory = (category) => {
        const $cat = createHtmlElement('div', [category.getName(), 'category']);
        $cat.appendChild(createHtmlElement('div', ['text'], category.getName()));
        if ($categoryContainer.childElementCount != 0)
            $cat.appendChild(createHtmlElement('div', ['delete', 'btn'], 'x'));
        return $cat;
    }

    const addCategoryListener = ($category) => {
        const categoryName = getCategoryName($category);
        const $deleteBtn = $category.lastChild;

        $deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeCategoryDOM($deleteBtn.parentNode);
        })

        $category.addEventListener('click', () => {
            setActive($category);
        })
    }

    const setActive = ($category) => {
        if ($currentActive) $currentActive.classList.remove('active');
            $category.classList.add('active');
            $currentActive = $category;
        
        PubSub.publish('categoryActive', getCategoryName($category));
    }

    const addCategoryDOM = (category) => {
        const $newCategory = newCategory(category);
        $categoryContainer.appendChild($newCategory);
        addCategoryListener($newCategory);
        setActive($newCategory);
    }

    const removeCategoryDOM = ($category) => {
        if ($category == $currentActive) 
            setActive($categoryContainer.firstElementChild);
        $category.remove();
        PubSub.publish('removeCategory', getCategoryName($category));
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

    const addItemListener = ($item) => {
        const itemElements = Array.from($item.children);
        const itemContent = itemElements.find(el => el.classList.contains('text')).textContent;
        const $deleteBtn = itemElements.find(el => el.classList.contains('delete'));
        
        $deleteBtn.addEventListener('click', () => {
            removeItemDOM($deleteBtn.parentNode, itemContent);
        })
    }

    const addItemDOM = (item) => {
        const $newItem = newItemDOM(item);
        $itemContainer.appendChild($newItem);
        addItemListener($newItem);
    }

    const removeItemDOM = ($item, itemContent) => {
        $item.remove();
        PubSub.publish('removeItem', {activeCategoryName: getCategoryName($currentActive), itemContent});
    }

    const init = () => {
        // Categories
        $addCategoryBtn.addEventListener('click', () => {
            PubSub.publish('addCategory', prompt('Enter'));
        })
        PubSub.subscribe('categoryAdded', addCategoryDOM);

        // Items
        $addItemBtn.addEventListener('click', () => {
            const activeCategoryName = $currentActive.firstChild.textContent;
            const itemContent = prompt('Enter');
            PubSub.publish('addItem', {activeCategoryName, itemContent});
        })
        PubSub.subscribe('categoryItemsLoaded', showItems);
        PubSub.subscribe('itemAdded', addItemDOM);
        

        //Defaults
        PubSub.publish('addCategory', 'All');
        PubSub.publish('addCategory', 'Random');
        PubSub.publish('addCategory', 'Categories');

        setActive($categoryContainer.firstElementChild);        
    }

    return {
        init,
        setActive,
    };
})();

export default UI;



