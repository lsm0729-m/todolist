import React, { useState } from 'react';
import TodoList from './Todolist';
import { TodoItemProps } from './Todo';
import { 
    ExpandToggleButton, 
    TodoCheckbox, 
    TodoText, 
    AddChildForm 
} from './ItemComponents';



export default function TodoItem({ todo, onToggle, onDelete, onAddChild, onEdit, onToggleExpand, filter, searchText }: TodoItemProps) {
    const [showChildInput, setShowChildInput] = useState(false);

    const total_cnt = todo.children.length;
    const completed_cnt = todo.children.filter(child => child.completed).length;
    
    const shouldShow = () => {
        if (filter === '전체') return true;
        if (filter === '미완료') return !todo.completed;
        if (filter === '완료') return todo.completed;
        return false;
    };

    return (
        <div> 
            {shouldShow() && (todo.text.includes(searchText) || searchText.trim() === '') && ( 
                <div className="todo-item">
                    <ExpandToggleButton 
                        hasChildren={todo.children.length > 0}
                        isExpanded={todo.isExpanded}
                        onToggle={() => onToggleExpand(todo.id)}
                    />
                    
                    <TodoCheckbox 
                        checked={todo.completed}
                        onChange={() => onToggle(todo.id)}
                    />
                    
                    <TodoText
                        text={todo.text}
                        completed={todo.completed}
                        childrenCount={{ total: total_cnt, completed: completed_cnt }}
                        onSave={(newText) => onEdit(todo.id, newText)}
                        onDelete={() => onDelete(todo.id)}
                        onAddChild={() => setShowChildInput(!showChildInput)}
                    />
                </div>
            )}

            {showChildInput && (
                <AddChildForm 
                    onSubmit={(text) => {
                        onAddChild(todo.id, text);
                        setShowChildInput(false);
                    }}
                    onCancel={() => setShowChildInput(false)}
                />
            )}
            
            {todo.children.length > 0 && todo.isExpanded && (
                <div className="todo-children">
                    <TodoList 
                        todos={todo.children}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onAddChild={onAddChild}
                        onEdit={onEdit}
                        onToggleExpand={onToggleExpand}
                        filter={filter}
                        searchText={searchText}
                    />
                </div>
            )}
        </div>
    );
}


