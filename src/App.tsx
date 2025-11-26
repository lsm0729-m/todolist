import React, { useState } from 'react'; 
import { exampleTodoData, exampleTodoData as todoData } from "./interface/data";
import { CategoryNode, ItemNode, NoteNode, RootNode, SectionNode, SubtaskNode } from './interface/todo';
import { BaseDocumentRenderer, TodoHandlers } from './interface/Rander';
import { RootDocument, CategoryDocument, SectionDocument, ItemDocument, SubtaskDocument, NoteDocument } from './components';
import './App.css';
import { updateNodeInTree, deleteNodeInTree, addNodeToTree } from './utils/treeUtils';
import { useTodo } from './hooks/useTodo';


class ReactTodoRenderer extends BaseDocumentRenderer<React.ReactNode> {

    private handlers: TodoHandlers

    constructor(handlers: TodoHandlers) {
        super();
        this.handlers = handlers;
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


                renderChildren={() => this.renderChildren(node.children)}
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
                renderChildren={() => this.renderChildren(node.children)}
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

export const App: React.FC = () => {
    const { data, handlers } = useTodo(exampleTodoData);

    const renderer = new ReactTodoRenderer(handlers);
    return <div>{renderer.RenderRoot(data)}</div>;
};