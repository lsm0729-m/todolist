import { useReducer } from 'react';
import { CategoryNode, ItemNode, NoteNode, RootNode, SectionNode, SubtaskNode } from '../interface/todo';
import { TodoHandlers } from '../interface/Rander';
import { exampleTodoData } from '../interface/data';
import { todoReducer } from '../reducers/todoReducer';

const createId = () => {
    return crypto.randomUUID();
};

export const useTodo = (initialData?: RootNode) => {
    const [data, dispatch] = useReducer(todoReducer, initialData || exampleTodoData);

    const handlers: TodoHandlers = {
        onToggleSection: (sectionId: string) => {
            dispatch({ type: 'TOGGLE_SECTION', payload: sectionId });
        },
        
        onAddTodoItem: (sectionId: string) => {
            const newTodo: ItemNode = {
                type: "TodoItem",
                id: createId(),
                title: "새 할일",
                completed: false,
                priority: "medium",
                dueDate: new Date().toISOString(),
                children: []
            };
            dispatch({ type: 'ADD_TODO_ITEM', payload: { sectionId, todo: newTodo } });
        },

        onAddCategory: () => {
            const newCategory: CategoryNode = {
                type: "TodoCategory",
                id: createId(),
                title: "새 카테고리",
                color: "#6366f1",
                children: []
            };
            dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
        },

        onDeleteCategory: (categoryId: string) => {
            dispatch({ type: 'DELETE_CATEGORY', payload: categoryId });
        },

        onUpdateCategorySettings: (categoryId: string, newTitle: string, newColor: string) => {
            dispatch({ 
                type: 'UPDATE_CATEGORY_SETTINGS', 
                payload: { categoryId, newTitle, newColor } 
            });
        },

        onAddTodoToCategory: (categoryId: string) => {
            const newTodo: ItemNode = {
                type: "TodoItem",
                id: createId(),
                title: "새 할일",
                completed: false,
                priority: "medium",
                dueDate: new Date().toISOString(),
                children: []
            };
            dispatch({ type: 'ADD_TODO_TO_CATEGORY', payload: { categoryId, todo: newTodo } });
        },

        onToggleItem: (itemId: string) => {
            dispatch({ type: 'TOGGLE_ITEM', payload: itemId });
        },

        onAddSubtask: (itemId: string) => {
            const newSubtask: SubtaskNode = {
                type: "TodoSubtask",
                id: createId(),
                title: "새 서브태스크",
                completed: false
            };
            dispatch({ type: 'ADD_SUBTASK', payload: { itemId, subtask: newSubtask } });
        },

        onAddSection: (categoryId: string) => {
            const newSection: SectionNode = {
                type: "TodoSection",
                id: createId(),
                title: "새 섹션",
                collapsed: false,
                children: []
            };
            dispatch({ type: 'ADD_SECTION', payload: { categoryId, section: newSection } });
        },

        onAddNote: (itemId: string) => {
            const newNote: NoteNode = {
                type: "TodoNote",
                id: createId(),
                content: "새 노트"
            };
            dispatch({ type: 'ADD_NOTE', payload: { itemId, note: newNote } });
        },

        onEditItem: (itemId: string, newTitle: string, newPriority: "high" | "medium" | "low") => {
            dispatch({ 
                type: 'EDIT_ITEM', 
                payload: { itemId, newTitle, newPriority } 
            });
        },

        onEditSection: (sectionId: string, newTitle: string) => {
            dispatch({ 
                type: 'EDIT_SECTION', 
                payload: { sectionId, newTitle } 
            });
        },

        onDeleteItem: (itemId: string) => {
            dispatch({ type: 'DELETE_ITEM', payload: itemId });
        },

        onDeleteSection: (sectionId: string) => {
            dispatch({ type: 'DELETE_SECTION', payload: sectionId });
        },

        onToggleSubtask: (subtaskId: string) => {
            dispatch({ type: 'TOGGLE_SUBTASK', payload: subtaskId });
        },

        onEditSubtask: (subtaskId: string, newTitle: string) => {
            console.log('newTitle', newTitle, subtaskId);
            dispatch({ 
                type: 'EDIT_SUBTASK', 
                payload: { subtaskId, newTitle } 
            });
        },

        onDeleteSubtask: (subtaskId: string) => {
            dispatch({ type: 'DELETE_SUBTASK', payload: subtaskId });
        },

        onEditNote: (noteId: string, newContent: string) => {
            dispatch({ 
                type: 'EDIT_NOTE', 
                payload: { noteId, newContent } 
            });
        },

        onDeleteNote: (noteId: string) => {
            dispatch({ type: 'DELETE_NOTE', payload: noteId });
        }
    };

    return {
        data,
        handlers
    };
};