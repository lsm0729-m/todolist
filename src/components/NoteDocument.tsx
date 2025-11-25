import React, { useState } from 'react';
import { NoteNode } from '../../interface/todo';

interface NoteDocumentProps {
    node: NoteNode;
    onEdit: (newContent: string) => void;
    onDelete: () => void;
}

export const NoteDocument: React.FC<NoteDocumentProps> = ({ 
    node, 
    onEdit, 
    onDelete 
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(node.content);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditValue(node.content);
    };

    const handleConfirm = () => {
        if (editValue.trim()) {
            onEdit(editValue.trim());
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditValue(node.content);
    };

    return (
        <div className="note-container">
            <span className="note-icon">💡</span>
            
            {isEditing ? (
                <div className="note-content-wrapper editing">
                    <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="note-edit-textarea"
                        autoFocus
                        rows={3}
                    />
                    <div className="note-edit-actions">
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
                </div>
            ) : (
                <>
                    <div className="note-content-wrapper">
                        <div className="note-content">
                            {node.content}
                        </div>
                    </div>
                    <div className="note-actions">
                        <button className="btn btn-warning btn-tiny" onClick={handleEditClick}>
                            ✏️
                        </button>
                        <button className="btn btn-delete btn-tiny" onClick={onDelete}>
                            ✕
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};