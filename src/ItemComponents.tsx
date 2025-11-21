import React, { useState } from 'react';

export function ExpandToggleButton({ hasChildren, isExpanded, onToggle }: { hasChildren: boolean; isExpanded: boolean; onToggle: () => void }) {
    if (hasChildren) {
        return (
            <span 
                onClick={onToggle}
                style={{ cursor: 'pointer', marginRight: '5px', userSelect: 'none' }}
            >
                {isExpanded ? '▾' : '▸'}
            </span>
        );
    }
    return <span style={{ marginRight: '8px', marginLeft: '4px' }}> {'◦'}</span>;
}


export function TodoCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
    return (
        <input 
            type="checkbox" 
            checked={checked}
            onChange={onChange}
        />
    );
}


export function TodoText({ 
    text, 
    completed, 
    childrenCount, 
    onSave,
    onDelete,
    onAddChild, 
}: { 
    text: string; 
    completed: boolean; 
    childrenCount: { total: number; completed: number }; 
    onSave: (newText: string) => void;
    onDelete: () => void;
    onAddChild: () => void;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    
    function handleSave() {
        if (editText.trim() === '') return;
        onSave(editText);
        setIsEditing(false);
    }
    
    function handleCancel() {
        setEditText(text);
        setIsEditing(false);
    }
    
    if (isEditing) {
        return (
            <>
                <input 
                    type="text"
                    value={editText}
                    onChange={(e) => { setEditText(e.target.value); }}
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                />
                <button onClick={handleSave}>저장</button>
                <button onClick={handleCancel}>취소</button>
            </>
        );
    }
    
    return (
        <span 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                {text}
                {childrenCount.total > 0 && ` (${childrenCount.completed} / ${childrenCount.total})`}
            </span>
            {isHovered && (
                <TodoActionButtons 
                    onEdit={() => setIsEditing(true)}
                    onDelete={onDelete}
                    onAddChild={onAddChild}
                />
            )}
        </span>
    );
}


export function TodoActionButtons({ 
    onEdit, 
    onDelete, 
    onAddChild 
}: { 
    onEdit: () => void; 
    onDelete: () => void; 
    onAddChild: () => void 
}) {
    return (
        <span style={{ marginLeft: '10px' }}>
            <button onClick={onEdit} style={{ marginRight: '5px' }}>수정</button>
            <button onClick={onDelete} style={{ marginRight: '5px' }}>삭제</button>
            <button onClick={onAddChild}>하위추가</button>
        </span>
    );
}


export function AddChildForm({ 
    onSubmit, 
    onCancel 
}: { 
    onSubmit: (text: string) => void; 
    onCancel: () => void 
}) {
    const [inputText, setInputText] = useState('');
    
    function handleSubmit() {
        if (inputText.trim() === '') return;
        onSubmit(inputText);
        setInputText('');
    }
    
    return (
        <div style={{ marginLeft: '42px', marginTop: '5px' }}>
            <input 
                type="text"
                value={inputText}
                onChange={(e) => { setInputText(e.target.value); }}
                placeholder="하위 할 일 입력"
            />
            <button onClick={handleSubmit}>추가</button>
            <button onClick={() => { setInputText(''); onCancel(); }}>취소</button>
        </div>
    );
}

