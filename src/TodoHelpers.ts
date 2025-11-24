import { MainTodo, SubTodo, Todo } from './Todo';


export function getAddChildTodo<T extends MainTodo | SubTodo>(todoArray: T[], parentId: string, childText: string): T[] {
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
            return { ...todo, children: [...todo.children, newChild] } as T;
        }
        if (todo.children && todo.children.length > 0) {
            return { ...todo, children: getAddChildTodo(todo.children, parentId, childText) } as T;
        }
        return todo;
    }) as T[];
}


export function getDeleteTodo<T extends MainTodo | SubTodo>(todoArray: T[], targetId: string): T[] {

    return todoArray.filter(function(todo) {
        return todo.id !== targetId;
    }).map(function(todo) {
        if (todo.children && todo.children.length > 0) {
            return { ...todo, children: getDeleteTodo(todo.children, targetId) } as T;
        }
        return todo;
    }) as T[];
}


function setAllChildrenCompleted<T extends MainTodo | SubTodo>(todo: T, completed: boolean): T {
    return {
        ...todo,
        completed: completed,
        children: todo.children.map((child) => {
            return setAllChildrenCompleted(child, completed);
        })
    } as T;
}


export function updateParentCompleted<T extends MainTodo | SubTodo>(todo: T): T {
    const updatedChildren = todo.children.map(function(child) { // 자식들의 completed 상태를 업뎃
        return updateParentCompleted(child);
    });
    
    if (updatedChildren.length === 0) {
        return { ...todo, children: updatedChildren } as T;
    }
    
    const allChildrenCompleted = updatedChildren.every(function(child) { // 모든 자식이 완료이면 true 하나라도 아니면 false
        return child.completed === true;
    });
    
    return {
        ...todo,
        completed: allChildrenCompleted,
        children: updatedChildren
    } as T;
}

export function getToggleTodo<T extends MainTodo | SubTodo>(todoArray: T[], targetId: string): T[] {
    const toggledArray = todoArray.map(function(todo) {
        if (todo.id === targetId) {
            const newCompletedState = !todo.completed;
            // 모든 자식도 같은 상태로 설정
            return setAllChildrenCompleted(todo, newCompletedState);
        }
        if (todo.children && todo.children.length > 0) {
            return { ...todo, children: getToggleTodo(todo.children, targetId) } as T;
        }
        return todo;
    }) as T[];
    
    // 부모들의 completed 상태를 자식들에 맞춰 업데이트
    return toggledArray.map(function(todo) {
        return updateParentCompleted(todo);
    }) as T[];
}


export function getEditTodo<T extends MainTodo | SubTodo>(todoArray: T[], targetId: string, newText: string): T[] {
    return todoArray.map(function(todo) {
        if (todo.id === targetId) {
            return { ...todo, text: newText } as T;
        }
        if (todo.children && todo.children.length > 0) {
            return { ...todo, children: getEditTodo(todo.children, targetId, newText) } as T;
        }
        return todo;
    }) as T[];
}


export function getToggleExpand<T extends MainTodo | SubTodo>(todoArray: T[], targetId: string): T[] {
    return todoArray.map(function(todo) {
        if (todo.id === targetId) {
            return { ...todo, isExpanded: !todo.isExpanded } as T;
        }
        if (todo.children && todo.children.length > 0) {
            return { ...todo, children: getToggleExpand(todo.children, targetId) } as T;
        }
        return todo;
    }) as T[];
}


