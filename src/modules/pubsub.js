/*
Events :

addItem
itemAdded

addCategory
removeCategory
updateCategories

*/


const _Event = (eventName) => {
    let name = eventName;
    let handlers = [];

    const getName = () => name;
    const addHandler = (handler) => {
        handlers.push(handler);
    }   
    const invokeHandlers = (eventArgs) => {
        handlers.forEach(fn => {
            fn(eventArgs);
        })
    }
     return { getName, addHandler, invokeHandlers,};
}

const PubSub = (() => {
    const _events = [];

    const checkEvent  = (eventName) => {
        let event = _events.find(event => event.getName() === eventName);
        if (!event) {
            event = _Event(eventName);
            _events.push(event);
        }
        return event;
    }

    const publish = (eventName, eventArgs) => {
        const event = checkEvent(eventName);
        event.invokeHandlers(eventArgs);
    }

    const subscribe = (eventName, handler) => {
        const event = checkEvent(eventName);
        event.addHandler(handler);
    }

    return {
        publish, 
        subscribe,
    };

})();

export default PubSub;