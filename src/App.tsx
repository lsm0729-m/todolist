import React, { useState } from 'react';
import TodoList from './Todolist';
import { Todo } from './Todo';
import { 
    getAddChildTodo, 
    getDeleteTodo, 
    getToggleTodo, 
    getEditTodo, 
    getToggleExpand,
    updateParentCompleted, 
} from './TodoHelpers';

export default function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const [searchText, setSearchText] = useState('');
    const [inputText, setInputText] = useState('');

    const [filter, setFilter] = useState('전체');


    function addTodo() {
        if (inputText.trim() === '') return;

        const newId = `t_${Date.now()}`;

        const newTodo = {
            id: newId,
            text: inputText,
            completed: false,
            isExpanded: true,
            children: []
        };

        setTodos([...todos, newTodo]);
        setInputText('');
    }



    function addChildTodo(parentId: string, childText: string) {
        const updatedTodos = getAddChildTodo(todos, parentId, childText);

        const finalTodos = updatedTodos.map(function(todo) {
            return updateParentCompleted(todo);
        });
        setTodos(finalTodos);
    }


    function deleteTodo(id: string) {
        const updatedTodos = getDeleteTodo(todos, id);

        const finalTodos = updatedTodos.map(function(todo) {
            return updateParentCompleted(todo);
        });
        setTodos(finalTodos);
    }


    function toggleTodo(id: string) {
        setTodos(getToggleTodo(todos, id));
    }


    function editTodo(id: string, newText: string) {
        setTodos(getEditTodo(todos, id, newText));
    }

    function toggleExpand(id: string) {
        setTodos(getToggleExpand(todos, id));
    }
    
    function handleSaveData() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function handleLoadData() {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }

    function handleExportData() {
        const jsonString = JSON.stringify(todos, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos_${new Date().toISOString()}.json`; //이름 날짜로 지정
        
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function handleImportData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const jsonData = JSON.parse(event.target?.result as string);
                    setTodos(jsonData);
                    alert('성공!');
                } catch (error) {
                    alert('오류가 발생');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }

    return (
        <div>
            <h1>Todo List</h1>
            
            <div className="data-controls">
                <DataControlButtons 
                    onSave={handleSaveData}
                    onLoad={handleLoadData}
                    onImport={handleImportData}
                    onExport={handleExportData}
                />
            </div>
            
            <div className="input-section">
                <input 
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="할 일을 입력하세요"
                />
                <button onClick={addTodo}>추가</button>
            </div>

            <div className="filter-section">
                <label>필터:</label>
                <FilterButtons 
                    currentFilter={filter}
                    onFilterChange={setFilter}
                />
                <input 
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="검색어 입력"
                />
            </div>
            
            <TodoList 
                todos={todos} 
                onToggle={toggleTodo} 
                onDelete={deleteTodo} 
                onAddChild={addChildTodo} 
                onEdit={editTodo}
                onToggleExpand={toggleExpand}
                filter={filter}
                searchText={searchText}
            />
        </div>
    );
}


function DataControlButtons({ 
    onSave, 
    onLoad,
    onImport,
    onExport
}: { 
    onSave: () => void; 
    onLoad: () => void;
    onImport: () => void;
    onExport: () => void;
}) {
    return (
        <div>
            <button onClick={onSave}>데이터 저장</button>
            <button onClick={onLoad}>데이터 불러오기</button>

            <button onClick={onImport}>파일 가져오기</button>
            <button onClick={onExport}>파일 내보내기</button>
        </div>
    );
}


function FilterButtons({ 
    currentFilter, 
    onFilterChange 
}: { 
    currentFilter: string; 
    onFilterChange: (filter: string) => void 
}) {
    return (
        <select 
            value={currentFilter} 
            onChange={(e) => onFilterChange(e.target.value)}
        >
            <option value="전체">전체</option>
            <option value="미완료">미완료</option>
            <option value="완료">완료</option>
        </select>
    );
}
