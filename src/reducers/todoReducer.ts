import { RootNode, CategoryNode, ItemNode, SectionNode, SubtaskNode, NoteNode } from '../interface/todo';
import { updateNodeInTree, deleteNodeInTree, addNodeToTree } from '../utils/treeUtils';

// 타입
export type TodoAction =
    | { type: 'TOGGLE_SECTION'; payload: string }
    | { type: 'ADD_TODO_ITEM'; payload: { sectionId: string; todo: ItemNode } }
    | { type: 'ADD_CATEGORY'; payload: CategoryNode }
    | { type: 'DELETE_CATEGORY'; payload: string }
    | { type: 'UPDATE_CATEGORY_SETTINGS'; payload: { categoryId: string; newTitle: string; newColor: string } }
    | { type: 'ADD_TODO_TO_CATEGORY'; payload: { categoryId: string; todo: ItemNode } }
    | { type: 'TOGGLE_ITEM'; payload: string }
    | { type: 'ADD_SUBTASK'; payload: { itemId: string; subtask: SubtaskNode } }
    | { type: 'ADD_SECTION'; payload: { categoryId: string; section: SectionNode } }
    | { type: 'ADD_NOTE'; payload: { itemId: string; note: NoteNode } }
    | { type: 'EDIT_ITEM'; payload: { itemId: string; newTitle: string; newPriority: "high" | "medium" | "low" } }
    | { type: 'EDIT_SECTION'; payload: { sectionId: string; newTitle: string } }
    | { type: 'DELETE_ITEM'; payload: string }
    | { type: 'DELETE_SECTION'; payload: string }
    | { type: 'TOGGLE_SUBTASK'; payload: string }
    | { type: 'EDIT_SUBTASK'; payload: { subtaskId: string; newTitle: string } }
    | { type: 'DELETE_SUBTASK'; payload: string }
    | { type: 'EDIT_NOTE'; payload: { noteId: string; newContent: string } }
    | { type: 'DELETE_NOTE'; payload: string };

export const todoReducer = (state: RootNode, action: TodoAction): RootNode => {
    switch (action.type) {
        case 'TOGGLE_SECTION':
            return updateNodeInTree(state, action.payload, (node) => ({
                ...node,
                collapsed: !(node as SectionNode).collapsed
            })) as RootNode;

        case 'ADD_TODO_ITEM':
            return addNodeToTree(state, action.payload.sectionId, action.payload.todo) as RootNode;

        case 'ADD_CATEGORY':
            return {
                ...state,
                children: [...state.children, action.payload]
            };

        case 'DELETE_CATEGORY':
            return deleteNodeInTree(state, action.payload) as RootNode;

        case 'UPDATE_CATEGORY_SETTINGS':
            return updateNodeInTree(state, action.payload.categoryId, (node) => ({
                ...node,
                title: action.payload.newTitle,
                color: action.payload.newColor
            } as CategoryNode)) as RootNode;

        case 'ADD_TODO_TO_CATEGORY':
            return addNodeToTree(state, action.payload.categoryId, action.payload.todo) as RootNode;

        case 'TOGGLE_ITEM':
            return updateNodeInTree(state, action.payload, (node) => ({
                ...node,
                completed: !(node as ItemNode).completed
            })) as RootNode;

        case 'ADD_SUBTASK':
            return addNodeToTree(state, action.payload.itemId, action.payload.subtask) as RootNode;

        case 'ADD_SECTION':
            return addNodeToTree(state, action.payload.categoryId, action.payload.section) as RootNode;

        case 'ADD_NOTE':
            return addNodeToTree(state, action.payload.itemId, action.payload.note) as RootNode;

        case 'EDIT_ITEM':
            return updateNodeInTree(state, action.payload.itemId, (node) => ({
                ...node,
                title: action.payload.newTitle,
                priority: action.payload.newPriority
            } as ItemNode)) as RootNode;

        case 'EDIT_SECTION':
            return updateNodeInTree(state, action.payload.sectionId, (node) => ({
                ...node,
                title: action.payload.newTitle
            } as SectionNode)) as RootNode;

        case 'DELETE_ITEM':
            return deleteNodeInTree(state, action.payload) as RootNode;

        case 'DELETE_SECTION':
            return deleteNodeInTree(state, action.payload) as RootNode;

        case 'TOGGLE_SUBTASK':
            return updateNodeInTree(state, action.payload, (node) => ({
                ...node,
                completed: !(node as SubtaskNode).completed
            } as SubtaskNode)) as RootNode;

        case 'EDIT_SUBTASK':
            return updateNodeInTree(state, action.payload.subtaskId, (node) => ({
                ...node,
                title: action.payload.newTitle
            } as SubtaskNode)) as RootNode;

        case 'DELETE_SUBTASK':
            return deleteNodeInTree(state, action.payload) as RootNode;

        case 'EDIT_NOTE':
            return updateNodeInTree(state, action.payload.noteId, (node) => ({
                ...node,
                content: action.payload.newContent
            } as NoteNode)) as RootNode;

        case 'DELETE_NOTE':
            return deleteNodeInTree(state, action.payload) as RootNode;

        default:
            return state;
    }
};