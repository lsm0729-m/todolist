import { useState } from 'react';
import { CategoryNode, ItemNode, NoteNode, RootNode, SectionNode, SubtaskNode } from '../interface/todo';
import { TodoHandlers } from '../interface/Rander';
import { updateNodeInTree, deleteNodeInTree, addNodeToTree } from '../utils/treeUtils';
import { exampleTodoData } from '../interface/data';


const createId = () => {
    return crypto.randomUUID();
};

export const useTodo = (initialData?: RootNode) => {
    const [data, setData] = useState<RootNode>(initialData || exampleTodoData);

    const handlers: TodoHandlers = {
        onToggleSection: (sectionId: string) => {
            setData(prev => updateNodeInTree(prev, sectionId, (node) => ({
                ...node,
                collapsed: !(node as SectionNode).collapsed
            })) as RootNode);
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
            setData(prev => addNodeToTree(prev, sectionId, newTodo) as RootNode);
        },

        onAddCategory: () => {
            const newCategory: CategoryNode = {
                type: "TodoCategory",
                id: createId(),
                title: "새 카테고리",
                color: "#6366f1",
                children: []
            };
            setData(prev => ({
                ...prev,
                children: [...prev.children, newCategory]
            }));
        },

        onDeleteCategory: (categoryId: string) => {
            setData(prev => deleteNodeInTree(prev, categoryId) as RootNode);
        },

        onUpdateCategorySettings: (categoryId: string, newTitle: string, newColor: string) => {
            setData(prev => updateNodeInTree(prev, categoryId, (node) => ({
                ...node,
                title: newTitle,
                color: newColor
            } as CategoryNode)) as RootNode);
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
            setData(prev => addNodeToTree(prev, categoryId, newTodo) as RootNode);
        },

        onToggleItem: (itemId: string) => {
            setData(prev => updateNodeInTree(prev, itemId, (node) => ({
                ...node,
                completed: !(node as ItemNode).completed
            })) as RootNode);
        },

        onAddSubtask: (itemId: string) => {
            const newSubtask: SubtaskNode = {
                type: "TodoSubtask",
                id: createId(),
                title: "새 서브태스크",
                completed: false
            };
            setData(prev => addNodeToTree(prev, itemId, newSubtask) as RootNode);
        },

        onAddSection: (categoryId: string) => {
            const newSection: SectionNode = {
                type: "TodoSection",
                id: createId(),
                title: "새 섹션",
                collapsed: false,
                children: []
            };
            setData(prev => addNodeToTree(prev, categoryId, newSection) as RootNode);
        },

        onAddNote: (itemId: string) => {
            const newNote: NoteNode = {
                type: "TodoNote",
                id: createId(),
                content: "새 노트"
            };
            setData(prev => addNodeToTree(prev, itemId, newNote) as RootNode);
        },

        onEditItem: (itemId: string, newTitle: string, newPriority: "high" | "medium" | "low") => {
            setData(prev => updateNodeInTree(prev, itemId, (node) => ({
                ...node,
                title: newTitle,
                priority: newPriority
            } as ItemNode)) as RootNode);
        },

        onEditSection: (sectionId: string, newTitle: string) => {
            setData(prev => updateNodeInTree(prev, sectionId, (node) => ({
                ...node,
                title: newTitle
            } as SectionNode)) as RootNode);
        },

        onDeleteItem: (itemId: string) => {
            setData(prev => deleteNodeInTree(prev, itemId) as RootNode);
        },

        onDeleteSection: (sectionId: string) => {
            setData(prev => deleteNodeInTree(prev, sectionId) as RootNode);
        },

        onToggleSubtask: (subtaskId: string) => {
            setData(prev => updateNodeInTree(prev, subtaskId, (node) => ({
                ...node,
                completed: !(node as SubtaskNode).completed
            } as SubtaskNode)) as RootNode);
        },

        onEditSubtask: (subtaskId: string, newTitle: string) => {
            console.log('newTitle', newTitle, subtaskId);
            setData(prev => updateNodeInTree(prev, subtaskId, (node) => ({
                ...node,
                title: newTitle
            } as SubtaskNode)) as RootNode);
        },

        onDeleteSubtask: (subtaskId: string) => {
            setData(prev => deleteNodeInTree(prev, subtaskId) as RootNode);
        },

        onEditNote: (noteId: string, newContent: string) => {
            setData(prev => updateNodeInTree(prev, noteId, (node) => ({
                ...node,
                content: newContent
            } as NoteNode)) as RootNode);
        },

        onDeleteNote: (noteId: string) => {
            setData(prev => deleteNodeInTree(prev, noteId) as RootNode);
        }
    };

    return {
        data,
        handlers
    };
};