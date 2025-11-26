import React, { useContext, useState } from 'react';
import { SectionNode } from '../interface/todo';
import { TodoContext } from '../App';

interface SectionDocumentProps {
    node: SectionNode;
    renderChildren: (children: any[]) => React.ReactNode[];
}

export const SectionDocument: React.FC<SectionDocumentProps> = ({ 
    node, 
    renderChildren 
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(node.title);
    const [isHovered, setIsHovered] = useState(false);

    const { handlers } = useContext(TodoContext);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditValue(node.title);
    };

    const handleConfirm = () => {
        if (editValue.trim()) {
            handlers.onEditSection(node.id, editValue.trim());
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditValue(node.title);
    };

    return (
        <div 
            className="section-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="section-header">
                <div className="section-title-wrapper">
                    <button className="section-toggle-btn" onClick={() => handlers.onToggleSection(node.id)}>
                        {node.collapsed ? '▶' : '▼'}
                    </button>
                    
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="section-edit-input"
                                autoFocus
                            />
                            <div className="section-edit-actions">
                                <button 
                                    className="btn btn-confirm btn-tiny" 
                                    onClick={handleConfirm}
                                >
                                    ✓
                                </button>
                                <button 
                                    className="btn btn-cancel btn-tiny" 
                                    onClick={handleCancel}
                                >
                                    ✕
                                </button>
                            </div>
                        </>
                    ) : (
                        <h3 className="section-title">
                            📂 {node.title}
                        </h3>
                    )}
                </div>
                {(isHovered || isEditing) && (
                    <div className="section-actions">
                        <button className="btn btn-secondary btn-small" onClick={() => handlers.onAddTodoToCategory(node.id)}>
                            + 할일
                        </button>
                        <button className="btn btn-add btn-small" onClick={() => handlers.onAddSubtask(node.id)}>
                            + 하위작업
                        </button>
                        <button className="btn btn-note btn-small" onClick={() => handlers.onAddNote(node.id)}>
                            📋
                        </button>
                        {!isEditing && (
                            <button className="btn btn-edit btn-small" onClick={handleEditClick}>
                                ✏️
                            </button>
                        )}
                        <button className="btn btn-delete btn-small" onClick={() => handlers.onDeleteSection(node.id)}>
                            ✕
                        </button>
                    </div>
                )}
            </div>
            {!node.collapsed && (
                <div className="section-children">
                    {renderChildren(node.children)}
                </div>
            )}
        </div>
    );
};