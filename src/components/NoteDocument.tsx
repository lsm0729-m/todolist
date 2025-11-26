import React, { useContext, useState } from 'react';
import { NoteNode } from '../interface/todo';
import { TodoContext } from '../App';

interface NoteDocumentProps {
    node: NoteNode;
}

export const NoteDocument: React.FC<NoteDocumentProps> = ({ 
    node, 
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(node.content);
    const [isHovered, setIsHovered] = useState(false);

    const { handlers } = useContext(TodoContext);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditValue(node.content);
    };

    const handleConfirm = () => {
        if (editValue.trim()) {
            handlers.onEditNote(node.id, editValue.trim());
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditValue(node.content);
    };

    return (
        <div 
            className="note-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
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
                    {(isHovered || isEditing) && (
                        <div className="note-actions">
                            <button className="btn btn-warning btn-tiny" onClick={handleEditClick}>
                                ✏️
                            </button>
                            <button className="btn btn-delete btn-tiny" onClick={() => handlers.onDeleteNote(node.id)}>
                                ✕
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};