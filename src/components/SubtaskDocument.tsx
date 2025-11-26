import React, { useContext, useState } from 'react';
import { SubtaskNode } from '../interface/todo';
import { TodoContext } from '../App';

interface SubtaskDocumentProps {
    node: SubtaskNode;
}

export const SubtaskDocument: React.FC<SubtaskDocumentProps> = ({ 
    node, 
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
            console.log('editValue', editValue);
            handlers.onEditSubtask(node.id, editValue.trim());
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditValue(node.title);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleConfirm();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <div 
            className="subtask-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <input 
                type="checkbox" 
                checked={node.completed}
                className="subtask-checkbox"
                onChange={() => handlers.onToggleSubtask(node.id)}
                disabled={isEditing}
            />
            
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="subtask-edit-input"
                        autoFocus
                    />
                    <div className="subtask-edit-actions">
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
                <>
                    <span className={`subtask-title ${node.completed ? 'completed' : ''}`}>
                        {node.title}
                    </span>
                    {(isHovered || isEditing) && (
                        <div className="subtask-actions">
                            <button className="btn btn-edit btn-tiny" onClick={handleEditClick}>
                                ✏️
                            </button>
                            <button className="btn btn-delete btn-tiny" onClick={() => handlers.onDeleteSubtask(node.id)}>
                                ✕
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};