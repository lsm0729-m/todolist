import React, { useContext } from 'react';
import { RootNode } from '../interface/todo';
import { TodoContext } from '../App';

interface RootDocumentProps {
    node: RootNode;
    renderChildren: (children: any[]) => React.ReactNode[];
}

export const RootDocument: React.FC<RootDocumentProps> = ({ node, renderChildren }) => {
    const { handlers } = useContext(TodoContext);
    return (
        <div className="todo-root">
            <div className="todo-header">
                <h1>📋 Todo List</h1>
                <button className="btn btn-primary" onClick={() => handlers.onAddCategory()}>
                    + 새 카테고리
                </button>
            </div>
            <div className="todo-categories">
                {renderChildren(node.children)}
            </div>
        </div>
    );
};

