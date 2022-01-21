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

    const getCategoryName = ($element) => {
        return $element.classList.value.split(' ')[0];
    }

    /*
    Categories UI
    */

    const $categoryContainer = document.querySelector('.category-container');
    const $addCategoryBtn = document.querySelector('.add-category');
    const $categoryInput = document.querySelector('.left-container .input-container');
    let $input, $okBtn, $cancelBtn;
    [$input, $okBtn, $cancelBtn] = $categoryInput.children;
    const $activeCategory = document.getElementById('active-category');
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

        $category.addEventListener('click', () => setActive($category));
    }

    const setActive = ($category) => {
        if ($currentActive) $currentActive.classList.remove('active');
        $category.classList.add('active');
        $currentActive = $category;
        const categoryName = getCategoryName($category);
        $activeCategory.textContent = categoryName;
        PubSub.publish('categoryActive', categoryName);
    }

    const addCategoryDOM = (category) => {
        const $newCategory = newCategory(category);
        $categoryContainer.appendChild($newCategory);
        addCategoryListener($newCategory);
        setActive($newCategory);
    }

    const removeCategoryDOM = ($category) => {
        PubSub.publish('removeCategory', getCategoryName($category));
        const $firstCategory = $categoryContainer.firstElementChild;
        if ($category == $currentActive || $currentActive == $firstCategory) 
            setActive($firstCategory);
        $category.remove();
    }

    const inputCategory = () => {
        $categoryInput.style.display = 'flex';
        $addCategoryBtn.style.display = 'none';
        $input.value = '';
        $input.focus();

    }
    const loadInput = () => {
        PubSub.publish('addCategory', $input.value);
        reset();
    }
    const resetInput = () => {
        $categoryInput.style.display = 'none';
        $addCategoryBtn.style.display = 'block';
    }

    /*
    Items UI
    */
    
    const $itemContainer = document.querySelector('.item-container');
    const $addItemBtn = document.querySelector('.add-item');

    const newItemDOM = (item) => {
        const $item = createHtmlElement('div', [item.categoryName, 'item']);
        const $checkBox = document.createElement('input');
        $checkBox.type = 'checkbox';
        if (item.isDone) {
            $item.classList.add('done');
            $checkBox.checked = true;
        }
        $item.appendChild($checkBox);
        $item.appendChild(createHtmlElement('div', ['text'], item.content));

        // Logic for showing tags in first category
        if ($currentActive == $categoryContainer.firstElementChild
            && getCategoryName($item) != getCategoryName($currentActive)) {
            $item.appendChild(createHtmlElement('div', ['tag'], getCategoryName($item)));
        }
        
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
        const $checkBox = itemElements.find(el => el.type == 'checkbox');
        
        $deleteBtn.addEventListener('click', () => removeItemDOM($item, itemContent));
        $checkBox.addEventListener('click', () => toggleDoneDOM($checkBox, itemContent));
    }

    const addItemDOM = (item) => {
        const $newItem = newItemDOM(item);
        $itemContainer.appendChild($newItem);
        addItemListener($newItem);
    }

    const removeItemDOM = ($item, itemContent) => {
        $item.remove();
        PubSub.publish('removeItem', {categoryName: getCategoryName($item), itemContent});
    }

    const toggleDoneDOM = ($checkBox, itemContent) => {
        const $item = $checkBox.parentNode;
        $checkBox.checked ? $item.classList.add('done') : $item.classList.remove('done');
        PubSub.publish('toggleDone', {categoryName: getCategoryName($item),itemContent, isDone: $checkBox.checked});
    } 

    const init = () => {
        // Categories
        $addCategoryBtn.addEventListener('click', inputCategory);
        PubSub.subscribe('categoryAdded', addCategoryDOM);
        $okBtn.addEventListener('click', loadInput);
        $cancelBtn.addEventListener('click', resetInput);

        // Items
        $addItemBtn.addEventListener('click', () => {
            const categoryName = $currentActive.firstChild.textContent;
            const itemContent = prompt('Enter');
            PubSub.publish('addItem', {categoryName, itemContent});
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
    };
})();

export default UI;



