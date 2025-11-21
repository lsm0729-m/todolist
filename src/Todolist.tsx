import React from 'react';
import TodoItem from './TodoItem';
import { Todo, TodoListProps } from './Todo';

export default function TodoList({ todos, onToggle, onDelete, onAddChild, onEdit, onToggleExpand, filter, searchText }: TodoListProps) {
    
    return (
        <div >
            {todos.map( (todo:Todo) => {
                return (
                    <TodoItem 
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onAddChild={onAddChild}
                        onEdit={onEdit}
                        onToggleExpand={onToggleExpand}
                        filter={filter}
                        searchText={searchText}
                    />
                );
            })}
        </div>
    );
}