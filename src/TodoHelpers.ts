import { Todo } from './Todo';


export function getAddChildTodo(todoArray: Todo[], parentId: string, childText: string): Todo[] {
    return todoArray.map(function(todo) {
        if (todo.id === parentId) {
            const newChildId = `t_${Date.now()}`;
            const newChild = {
                id: newChildId,
                text: childText,
                completed: false,
                isExpanded: true,
                children: []
            };
            return { ...todo, children: [...todo.children, newChild] };
        }
        if (todo.children && todo.children.length > 0) {
            return { ...todo, children: getAddChildTodo(todo.children, parentId, childText) };
        }
        return todo;
    });
}


export function getDeleteTodo(todoArray: Todo[], targetId: string): Todo[] {

    return todoArray.filter(function(todo) {
        return todo.id !== targetId;
    }).map(function(todo) {
        if (todo.children && todo.children.length > 0) {
            return { ...todo, children: getDeleteTodo(todo.children, targetId) };
        }
        return todo;
    });
}


function setAllChildrenCompleted(todo: Todo, completed: boolean): Todo {
    return {
        ...todo,
        completed: completed,
        children: todo.children.map((child) => {
            return setAllChildrenCompleted(child, completed);
        })
    };
}


export function updateParentCompleted(todo: Todo): Todo {
    const updatedChildren = todo.children.map(function(child) { // 자식들의 completed 상태를 업뎃
        return updateParentCompleted(child);
    });
    
    if (updatedChildren.length === 0) {
        return { ...todo, children: updatedChildren };
    }
    
    const allChildrenCompleted = updatedChildren.every(function(child) { // 모든 자식이 완료이면 true 하나라도 아니면 false
        return child.completed === true;
    });
    
    return {
        ...todo,
        completed: allChildrenCompleted,
        children: updatedChildren
    };
}

export function getToggleTodo(todoArray: Todo[], targetId: string): Todo[] {
    const toggledArray = todoArray.map(function(todo) {
        if (todo.id === targetId) {
            const newCompletedState = !todo.completed;
            // 모든 자식도 같은 상태로 설정
            return setAllChildrenCompleted(todo, newCompletedState);
        }
        if (todo.children && todo.children.length > 0) {
            return { ...todo, children: getToggleTodo(todo.children, targetId) };
        }
        return todo;
    });
    
    // 부모들의 completed 상태를 자식들에 맞춰 업데이트
    return toggledArray.map(function(todo) {
        return updateParentCompleted(todo);
    });
}


export function getEditTodo(todoArray: Todo[], targetId: string, newText: string): Todo[] {
    return todoArray.map(function(todo) {
        if (todo.id === targetId) {
            return { ...todo, text: newText };
        }
        if (todo.children && todo.children.length > 0) {
            return { ...todo, children: getEditTodo(todo.children, targetId, newText) };
        }
        return todo;
    });
}


export function getToggleExpand(todoArray: Todo[], targetId: string): Todo[] {
    return todoArray.map(function(todo) {
        if (todo.id === targetId) {
            return { ...todo, isExpanded: !todo.isExpanded };
        }
        if (todo.children && todo.children.length > 0) {
            return { ...todo, children: getToggleExpand(todo.children, targetId) };
        }
        return todo;
    });
}

