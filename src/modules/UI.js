import { format, compareAsc, parseISO } from 'date-fns'
import PubSub from "./pubsub";
import Storage from './storage';

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
    const $categoryInputContainer = document.querySelector('.left-container .input-container');
    let $input, $okBtn, $cancelBtn;
    [$input, $okBtn, $cancelBtn] = $categoryInputContainer.children;
    const $activeCategory = document.getElementById('active-category');
    let $currentActive = null;

    const newCategory = (categoryName) => {
        const $cat = createHtmlElement('div', [categoryName, 'category']);
        $cat.appendChild(createHtmlElement('div', ['text'], categoryName));
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

    const addCategoryDOM = (categoryName) => {
        const $newCategory = newCategory(categoryName);
        $categoryContainer.appendChild($newCategory);
        addCategoryListener($newCategory);
        PubSub.publish('addCategory', categoryName);
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
        $categoryInputContainer.style.display = 'flex';
        $addCategoryBtn.style.display = 'none';
        $input.value = '';
        $input.focus();
    }
    const loadInput = () => {
        addCategoryDOM($input.value);
        resetInput();
    }
    const resetInput = () => {
        $categoryInputContainer.style.display = 'none';
        $addCategoryBtn.style.display = 'block';
    }

    /*
    Items UI
    */
    
    const $itemContainer = document.querySelector('.item-container');
    const $addItemBtn = document.querySelector('.add-item');

    const newItemDOM = (item, isEdit = false) => {
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
        $item.appendChild(createHtmlElement('p', ['empty']));
        $item.appendChild(createHtmlElement('div', ['date'], format(parseISO(item.date), 'dd MMM yy')));
        $item.appendChild(createHtmlElement('div', ['edit', 'btn', 'fa', 'fa-pencil']));
        $item.appendChild(createHtmlElement('div', ['delete', 'btn', 'fa', 'fa-trash-o']));

        addItemListener($item, item);

        if (isEdit) return $item;
        $itemContainer.appendChild($item);
    }

    const showItems = (items) => {
        while($itemContainer.childElementCount > 0) 
            $itemContainer.lastChild.remove();  // Clear contents

        items.map(item => newItemDOM(item));
    }

    const addItemListener = ($item, item) => {
        const itemElements = Array.from($item.children);
        const itemContent = item.content;
        const itemDate = item.date;
        const $deleteBtn = itemElements.find(el => el.classList.contains('delete'));
        const $checkBox = itemElements.find(el => el.type == 'checkbox');
        const $editBtn = itemElements.find(el => el.classList.contains('edit'));
        
        $deleteBtn.addEventListener('click', () => removeItemDOM($item, itemContent));
        $checkBox.addEventListener('click', () => toggleDoneDOM($checkBox, itemContent));
        $editBtn.addEventListener('click', () => inputItem({isEdit: true, $item, itemContent, itemDate}));
    }

    const addItemDOM = (newContent, newDate, isDone = false) => {
        const item = {
            isDone: isDone,
            categoryName: getCategoryName($currentActive),
            content: newContent,
            date: newDate,
        };
        newItemDOM(item);
        PubSub.publish('addItem', item);
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

    const editItemDOM = ($item, itemContent, newContent, newDate) => {
        const item = {
            isDone: $item.classList.contains('done'),
            categoryName: getCategoryName($item),
            content: newContent,
            date: newDate,
        };
        $item.replaceWith(newItemDOM(item, true));
        PubSub.publish('editItem', [itemContent, item]);
    }

    const inputItem = ({isEdit, $item, itemContent, itemDate}) => {
        $addItemBtn.style.display = 'none';
        const $textInput = createHtmlElement('input', ['text-input']);
        $textInput.type = 'text';

        const $dateInput = createHtmlElement('input', ['date-input']);
        $dateInput.type = 'date';

        const $okBtn = createHtmlElement('div', ['ok', 'button', 'fa', 'fa-check-circle']);
        const $cancelBtn = createHtmlElement('div', ['cancel', 'button', 'fa', 'fa-times-circle']);
        const $inputContainer = createHtmlElement('div', ['item-input-container']);
        
        $inputContainer.appendChild($textInput);
        $inputContainer.appendChild($dateInput);
        $inputContainer.appendChild($okBtn);
        $inputContainer.appendChild($cancelBtn);

        const reset = () => {
            $inputContainer.remove();
            $textInput.value = '';
            $addItemBtn.style.display = 'block';
        }

        if (isEdit){
            $itemContainer.insertBefore($inputContainer, $item);
            $item.style.display = 'none';
            $textInput.value = itemContent;
            $dateInput.defaultValue = itemDate;
            $okBtn.addEventListener('click', () => {
                editItemDOM($item, itemContent, $textInput.value, $dateInput.value);
                reset();
            });
        }
        else {
            $textInput.placeholder = 'Add task';
            $dateInput.defaultValue = format(new Date(), 'yyyy-MM-dd');
            $itemContainer.appendChild($inputContainer);
            $okBtn.addEventListener('click', () => {
                addItemDOM($textInput.value, $dateInput.value);
                reset();
            });
            
        }
        $textInput.focus();
        $cancelBtn.addEventListener('click', () => {
            reset();
            if (isEdit) $item.style.display = 'flex';
        });

    }

    const init = () => {
        // Categories
        $addCategoryBtn.addEventListener('click', inputCategory);
        $okBtn.addEventListener('click', loadInput);
        $cancelBtn.addEventListener('click', resetInput);

        // Items
        $addItemBtn.addEventListener('click', inputItem)
        PubSub.subscribe('categoryItemsLoaded', showItems);

        localStorage.clear();
        if (localStorage.length == 0) Storage.loadSample();
        const categoryNames = Storage.getCategories();
        categoryNames.forEach(cat => {
            addCategoryDOM(cat);
        });

        setActive($categoryContainer.firstElementChild);        
    }

    return {
        init,
    };
})();

export default UI;



