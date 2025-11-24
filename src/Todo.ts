export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    isExpanded: boolean;
}

export interface MainTodo extends Todo {
    date: Date;
    children: SubTodo[];

}

export interface SubTodo extends Todo {
    children: SubTodo[];
}

export interface TodoItemProps {
    todo: MainTodo | SubTodo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onAddChild: (parentId: string, childText: string) => void;
    onEdit: (id: string, newText: string) => void;
    onToggleExpand: (id: string) => void;
    filter: string;
    searchText: string;
}

export interface TodoListProps {
    todos: MainTodo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onAddChild: (parentId: string, childText: string) => void;
    onEdit: (id: string, newText: string) => void;
    onToggleExpand: (id: string) => void;
    filter: string;
    searchText: string;
}