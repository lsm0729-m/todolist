import React, { useState } from 'react';
import { CategoryNode } from '../../interface/todo';

interface CategoryDocumentProps {
    node: CategoryNode;
    onAddTodo: () => void;
    onAddSection: () => void; 
    onSettings: (newTitle: string, newColor: string) => void;
    onDelete: () => void;
    renderChildren: (children: any[]) => React.ReactNode[];
}

export const CategoryDocument: React.FC<CategoryDocumentProps> = ({ 
    node, 
    onAddTodo,
    onAddSection,  
    onSettings, 
    onDelete,
    renderChildren 
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(node.title);
    const [editColor, setEditColor] = useState(node.color);

    // 프리셋 색상 5개
    const colorPresets = [
        '#3b82f6', // 파랑
        '#10b981', // 초록
        '#f59e0b', // 주황
        '#ef4444', // 빨강
        '#8b5cf6', // 보라
    ];

    const handleSettingsClick = () => {
        setEditTitle(node.title);
        setEditColor(node.color);
        setIsEditing(true);
    };

    const handleSave = () => {
        if (editTitle.trim()) {
            onSettings(editTitle.trim(), editColor);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditTitle(node.title);
        setEditColor(node.color);
    };

    return (
        <div 
            className="category-container"
            style={{ borderColor: isEditing ? editColor : node.color }}
        >
            <div className="category-header">
                {isEditing ? (
                    // 편집 모드 - 헤더만
                    <div className="category-edit-row">
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="category-title-input"
                            placeholder="카테고리 이름"
                            autoFocus
                        />
                        <div className="category-color-selector">
                            {colorPresets.map((color) => (
                                <button
                                    key={color}
                                    className={`color-preset-btn ${editColor === color ? 'active' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setEditColor(color)}
                                    title={color}
                                />
                            ))}
                        </div>
                        <div className="category-edit-actions">
                            <button className="btn btn-confirm btn-small" onClick={handleSave}>
                                ✓
                            </button>
                            <button className="btn btn-cancel btn-small" onClick={handleCancel}>
                                ✕
                            </button>
                        </div>
                    </div>
                ) : (
                    // 일반 모드 - 헤더
                    <>
                        <div className="category-title-wrapper">
                            <div 
                                className="category-color-dot"
                                style={{ backgroundColor: node.color }}
                            />
                            <h2 
                                className="category-title"
                                style={{ color: node.color }}
                            >
                                {node.title}
                            </h2>
                        </div>
                        <div className="category-actions">
                            <button 
                                className="btn btn-secondary"
                                style={{ backgroundColor: node.color }}
                                onClick={onAddTodo}
                            >
                                + 할일 추가
                            </button>
                            <button 
                                className="btn btn-secondary btn-folder"
                                style={{ 
                                    backgroundColor: node.color,
                                    opacity: 0.9
                                }}
                                onClick={onAddSection}
                            >
                                📂
                            </button>
                            <button className="btn btn-secondary" onClick={handleSettingsClick}>
                                ⚙️
                            </button>
                            <button className="btn btn-danger" onClick={onDelete}>
                                🗑️
                            </button>
                        </div>
                    </>
                )}
            </div>
            
            {/* 하위 항목은 항상 렌더링 */}
            <div className="category-children">
                {renderChildren(node.children)}
            </div>
        </div>
    );
};