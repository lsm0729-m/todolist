import React, { useState } from 'react';
import { ItemNode } from '../../interface/todo';

interface ItemDocumentProps {
    node: ItemNode;
    onToggleComplete: () => void;
    onAddSubtask: () => void;
    onAddNote: () => void;
    onEdit: (title: string, priority: "high" | "medium" | "low") => void;
    onDelete: () => void;
    renderChildren: (children: any[]) => React.ReactNode[];
}

export const ItemDocument: React.FC<ItemDocumentProps> = ({ 
    node, 
    onToggleComplete,
    onAddSubtask,
    onAddNote,
    onEdit,
    onDelete,
    renderChildren 
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(node.title);
    const [editPriority, setEditPriority] = useState<"high" | "medium" | "low">(node.priority);
    const [isHovered, setIsHovered] = useState(false);

    const priorityClass = `priority-${node.priority}`;
    const priorityLabel = node.priority === 'high' ? '높음' : node.priority === 'medium' ? '중간' : '낮음';

    const handleEditClick = () => {
        setEditTitle(node.title);
        setEditPriority(node.priority);
        setIsEditing(true);
    };

    const handleSave = () => {
        if (editTitle.trim()) {
            onEdit(editTitle.trim(), editPriority);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditTitle(node.title);
        setEditPriority(node.priority);
    };

    return (
        <div 
            className="item-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`item-main ${node.children.length > 0 ? 'has-children' : ''} ${isEditing ? 'editing' : ''}`}>
                {isEditing ? (
                    // 편집 모드
                    <div className="item-edit-inline">
                        <input 
                            type="checkbox" 
                            checked={node.completed}
                            className="item-checkbox"
                            onChange={onToggleComplete}
                            disabled
                        />
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="item-title-input"
                            placeholder="할일 제목"
                            autoFocus
                        />
                        <div className="item-priority-selector">
                            <button
                                type="button"
                                className={`priority-select-btn priority-high ${editPriority === 'high' ? 'active' : ''}`}
                                onClick={() => setEditPriority('high')}
                            >
                                높음
                            </button>
                            <button
                                type="button"
                                className={`priority-select-btn priority-medium ${editPriority === 'medium' ? 'active' : ''}`}
                                onClick={() => setEditPriority('medium')}
                            >
                                중간
                            </button>
                            <button
                                type="button"
                                className={`priority-select-btn priority-low ${editPriority === 'low' ? 'active' : ''}`}
                                onClick={() => setEditPriority('low')}
                            >
                                낮음
                            </button>
                        </div>
                        <div className="item-edit-actions-inline">
                            <button className="btn btn-confirm btn-tiny" onClick={handleSave}>
                                ✓
                            </button>
                            <button className="btn btn-cancel btn-tiny" onClick={handleCancel}>
                                ✕
                            </button>
                        </div>
                    </div>
                ) : (
                    // 일반 모드
                    <>
                        <div className="item-content">
                            <input 
                                type="checkbox" 
                                checked={node.completed}
                                className="item-checkbox"
                                onChange={onToggleComplete}
                            />
                            <div className="item-details">
                                <span className={`priority-badge ${priorityClass}`}>
                                    {priorityLabel}
                                </span>
                                <span className={`item-title ${node.completed ? 'completed' : ''}`}>
                                    {node.title}
                                </span>
                                {node.dueDate && (
                                    <span className="item-due-date">
                                        {node.dueDate}
                                    </span>
                                )}
                            </div>
                        </div>
                        {(isHovered || isEditing) && (
                            <div className="item-actions">
                                <button className="btn btn-add btn-small" onClick={onAddSubtask}>
                                    + 하위작업
                                </button>
                                <button className="btn btn-note btn-small" onClick={onAddNote}>
                                    📋
                                </button>
                                <button className="btn btn-edit btn-small" onClick={handleEditClick}>
                                    ⚙️
                                </button>
                                <button className="btn btn-delete btn-small" onClick={onDelete}>
                                    ✕
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
            {node.children.length > 0 && (
                <div className="item-children">
                    {renderChildren(node.children)}
                </div>
            )}
        </div>
    );
};