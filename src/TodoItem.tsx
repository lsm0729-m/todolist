import React, { useState } from 'react';
import { MainTodo, SubTodo, TodoItemProps } from './Todo';
import { 
    ExpandToggleButton, 
    TodoCheckbox, 
    TodoText, 
    AddChildForm 
} from './ItemComponents';

// 타입 가드 함수
function isMainTodo(todo: MainTodo | SubTodo): todo is MainTodo {
    return 'date' in todo;
}

// 날짜 포맷팅 함수
function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

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

    // MainTodo인지 확인해서 날짜 표시
    const dateString = isMainTodo(todo) ? formatDate(todo.date) : undefined;

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
                        date={dateString}
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
                    {todo.children.map((child) => (
                        <TodoItem 
                            key={child.id}
                            todo={child}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onAddChild={onAddChild}
                            onEdit={onEdit}
                            onToggleExpand={onToggleExpand}
                            filter={filter}
                            searchText={searchText}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}


