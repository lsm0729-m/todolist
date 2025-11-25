import React, { useState } from 'react'; 
import { exampleTodoData as todoData } from "../interface/data";
import { CategoryNode, ItemNode, NoteNode, RootNode, SectionNode, SubtaskNode } from '../interface/todo';
import { BaseDocumentRenderer, TodoHandlers } from '../interface/Rander';
import { RootDocument, CategoryDocument, SectionDocument, ItemDocument, SubtaskDocument, NoteDocument } from './components';
import './App.css';
import { updateNodeInTree, deleteNodeInTree, addNodeToTree } from './treeUtils';
class ReactTodoRenderer extends BaseDocumentRenderer<React.ReactNode> {

    constructor(private handlers: TodoHandlers) {
        super();
    }

    RenderRoot(node: RootNode): React.ReactNode {
        return (
            <RootDocument
                node={node}

                onAddCategory={this.handlers.onAddCategory} 
                renderChildren={(children) => children.map((child) => this.render(child))}
            />
        );
    }

    RenderCategory(node: CategoryNode): React.ReactNode {
        return (
            <CategoryDocument
                key={node.id}
                node={node}


                onAddTodo={() => this.handlers.onAddTodoToCategory(node.id)} 
                onAddSection={() => this.handlers.onAddSection(node.id)}

                // [] 어떻게 수정하게 할건지 고민해서 구현  
                onSettings={(newTitle: string, newColor: string) => this.handlers.onUpdateCategorySettings(node.id, newTitle, newColor)} 

                onDelete={() => this.handlers.onDeleteCategory(node.id)}
                renderChildren={(children) => children.map((child) => this.render(child))}
            />
        );
    }

    RenderSection(node: SectionNode): React.ReactNode {
        return (
            <SectionDocument
                key={node.id}
                node={node}

                // [] 상위위 하위 연동 추가 구현 (우선순위 하위)
                onToggleCollapse={() => this.handlers.onToggleSection(node.id)}

                onAddTodo={() => this.handlers.onAddTodoItem(node.id)}
                onAddSubtask={() => this.handlers.onAddSubtask(node.id)}
                onAddNote={() => this.handlers.onAddNote(node.id)}

                onDelete={() => this.handlers.onDeleteSection(node.id)}

                onEdit={(newTitle: string) => this.handlers.onEditSection(node.id, newTitle)}


                renderChildren={(children) => children.map((child) => this.render(child))}
            />
        );
    }

    RenderItem(node: ItemNode): React.ReactNode {
        return (
            <ItemDocument
                key={node.id}
                node={node}
                onToggleComplete={() => this.handlers.onToggleItem(node.id)}
                onAddSubtask={() => this.handlers.onAddSubtask(node.id)}
                onAddNote={() => this.handlers.onAddNote(node.id)}

                onEdit={(newTitle: string, newPriority: "high" | "medium" | "low") => this.handlers.onEditItem(node.id, newTitle, newPriority)}


                onDelete={() => this.handlers.onDeleteItem(node.id)}
                renderChildren={(children) => children.map((child) => this.render(child))}
            />
        );
    }

    RenderSubtask(node: SubtaskNode): React.ReactNode {
        return (
            <SubtaskDocument
                key={node.id}
                node={node}
                onToggleComplete={() => this.handlers.onToggleSubtask(node.id)}
                onEdit={(newTitle: string) => this.handlers.onEditSubtask(node.id, newTitle)}
                onDelete={() => this.handlers.onDeleteSubtask(node.id)}
            />
        );
    }

    RenderNote(node: NoteNode): React.ReactNode {
        return (
            <NoteDocument
                key={node.id}
                node={node}
                onEdit={(newContent: string) => this.handlers.onEditNote(node.id, newContent)}
                onDelete={() => this.handlers.onDeleteNote(node.id)}
            />
        );
    }
}

// 아이디 생성 함수 
const createId = () => {
    return crypto.randomUUID();
}

export const App: React.FC = () => {

    const [data, setData] = useState<RootNode>(todoData);

    const handlers: TodoHandlers = {
        // Section 관련 핸들러
        onToggleSection: (sectionId: string) => {
            setData(updateNodeInTree(data, sectionId, (node) => ({
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
            setData(addNodeToTree(data, sectionId, newTodo) as RootNode);
        },

        // Category 관련 핸들러
        onAddCategory: () => {
            const newCategory: CategoryNode = {
                type: "TodoCategory",
                id: createId(),
                title: "새 카테고리",
                color: "#6366f1",
                children: []
            };
            setData(({
                ...data,
                children: [...data.children, newCategory]
            }) );
        },

        onDeleteCategory: (categoryId: string) => {
            setData(deleteNodeInTree(data, categoryId) as RootNode);
        },

        onUpdateCategorySettings: (categoryId: string, newTitle: string, newColor: string) => {
            setData(updateNodeInTree(data, categoryId, (node) => ({
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

        // Item 관련 핸들러
        onToggleItem: (itemId: string) => {
            setData(updateNodeInTree(data, itemId, (node) => ({
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
            setData(addNodeToTree(data, itemId, newSubtask) as RootNode);
        },

        onAddSection: (categoryId: string) => {
            const newSection: SectionNode = {
                type: "TodoSection",
                id: createId(),
                title: "새 섹션",
                collapsed: false,
                children: []
            };
            setData(addNodeToTree(data, categoryId, newSection) as RootNode);
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
            setData(updateNodeInTree(data, sectionId, (node) => ({
                ...node,
                title: newTitle
            } as SectionNode)) as RootNode);
        },

        onDeleteItem: (itemId: string) => {
            setData(deleteNodeInTree(data, itemId) as RootNode);
        },

        onDeleteSection:(sectionId: string) => {
            setData(deleteNodeInTree(data, sectionId) as RootNode);
        },

        // Subtask 관련 핸들러
        onToggleSubtask: (subtaskId: string) => {
            setData(updateNodeInTree(data, subtaskId, (node) => ({
                ...node,
                completed: !(node as SubtaskNode).completed
            } as SubtaskNode)) as RootNode);
        },

        onEditSubtask: (subtaskId: string, newTitle: string) => {
            console.log('newTitle', newTitle, subtaskId);
            setData(updateNodeInTree(data, subtaskId, (node) => ({
                ...node,
                title: newTitle
            } as SubtaskNode)) as RootNode);
        },

        onDeleteSubtask: (subtaskId: string) => {
            setData(deleteNodeInTree(data, subtaskId) as RootNode);
        },

        // Note 관련 핸들러
        onEditNote: (noteId: string, newContent: string) => {
            setData(updateNodeInTree(data, noteId, (node) => ({
                ...node,
                content: newContent
            } as NoteNode)) as RootNode);
        },

        onDeleteNote: (noteId: string) => {
            setData(deleteNodeInTree(data, noteId) as RootNode);
        }
    };

    const renderer = new ReactTodoRenderer(handlers);
    return <div>{renderer.RenderRoot(data)}</div>;
};