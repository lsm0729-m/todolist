export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    isExpanded: boolean;
    children: Todo[];
}

export interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onAddChild: (parentId: string, childText: string) => void;
    onEdit: (id: string, newText: string) => void;
    onToggleExpand: (id: string) => void;
    filter: string;
    searchText: string;
}

export interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onAddChild: (parentId: string, childText: string) => void;
    onEdit: (id: string, newText: string) => void;
    onToggleExpand: (id: string) => void;
    filter: string;
    searchText: string;
}