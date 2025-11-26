import React from 'react';
import { RootNode } from '../interface/todo';

interface RootDocumentProps {
    node: RootNode;
    onAddCategory: () => void;
    renderChildren: (children: any[]) => React.ReactNode[];
}

export const RootDocument: React.FC<RootDocumentProps> = ({ node, onAddCategory, renderChildren }) => {
    return (
        <div className="todo-root">
            <div className="todo-header">
                <h1>📋 Todo List</h1>
                <button className="btn btn-primary" onClick={onAddCategory}>
                    + 새 카테고리
                </button>
            </div>
            <div className="todo-categories">
                {renderChildren(node.children)}
            </div>
        </div>
    );
};

