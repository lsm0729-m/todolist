import React, { useState } from 'react';
import TodoList from './Todolist';
import { MainTodo, SubTodo } from './Todo';
import { 
    getAddChildTodo, 
    getDeleteTodo, 
    getToggleTodo, 
    getEditTodo, 
    getToggleExpand,
    updateParentCompleted, 
} from './TodoHelpers';

export default function App() {
    // useState 초기값으로 localStorage에서 바로 불러오기 (최초 1번만 실행됨)
    const [todos, setTodos] = useState<MainTodo[]>(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            const parsed = JSON.parse(savedTodos);
            // date를 Date 객체로 변환
            return parsed.map((todo: any) => ({
                ...todo,
                date: new Date(todo.date)
            }));
        }
        return [];  // 저장된 데이터 없으면 빈 배열
    });

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
            children: [],
            date: new Date()
        };


        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));
        setInputText('');
    }



    function addChildTodo(parentId: string, childText: string) {
        const updatedTodos = getAddChildTodo(todos, parentId, childText);

        const finalTodos = updatedTodos.map(function(todo) {
            return updateParentCompleted(todo);
        });
        setTodos(finalTodos);
        localStorage.setItem("todos", JSON.stringify(finalTodos));
    }


    function deleteTodo(id: string) {
        const updatedTodos = getDeleteTodo(todos, id);

        const finalTodos = updatedTodos.map(function(todo) {
            return updateParentCompleted(todo);
        });
        setTodos(finalTodos);
        localStorage.setItem("todos", JSON.stringify(finalTodos));
    }


    function toggleTodo(id: string) {
        const updatedTodos = getToggleTodo(todos, id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }


    function editTodo(id: string, newText: string) {
        const updatedTodos = getEditTodo(todos, id, newText);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    function toggleExpand(id: string) {
        const updatedTodos = getToggleExpand(todos, id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
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
                    // date를 Date 객체로 변환
                    const todosWithDate = jsonData.map((todo: any) => ({
                        ...todo,
                        date: new Date(todo.date)
                    }));
                    setTodos(todosWithDate);
                    localStorage.setItem("todos", JSON.stringify(todosWithDate));
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
    onImport,
    onExport
}: { 
    onImport: () => void;
    onExport: () => void;
}) {
    return (
        <div>

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
