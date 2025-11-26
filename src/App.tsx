import React, { useContext, createContext} from 'react'; 
import { exampleTodoData, exampleTodoData as todoData } from "./interface/data";
import { CategoryNode, ItemNode, NoteNode, RootNode, SectionNode, SubtaskNode } from './interface/todo';
import { BaseDocumentRenderer, TodoHandlers } from './interface/Rander';
import { RootDocument, CategoryDocument, SectionDocument, ItemDocument, SubtaskDocument, NoteDocument } from './components';
import './App.css';
import { useTodo } from './hooks/useTodo';


class ReactTodoRenderer extends BaseDocumentRenderer<React.ReactNode> {

    private handlers: TodoHandlers

    constructor(handlers: TodoHandlers) {
        super();
        this.handlers = handlers;
    }

    RenderRoot(node: RootNode): React.ReactNode {
        return (
            <RootDocument
                node={node}
                renderChildren={(children) => children.map((child) => this.render(child))}
            />
        );
    }

    RenderCategory(node: CategoryNode): React.ReactNode {
        return (
            <CategoryDocument
                key={node.id}
                node={node}
                renderChildren={(children) => children.map((child) => this.render(child))}
            />
        );
    }

    RenderSection(node: SectionNode): React.ReactNode {
        return (
            <SectionDocument
                key={node.id}
                node={node}
                renderChildren={() => this.renderChildren(node.children)}
            />
        );
    }

    RenderItem(node: ItemNode): React.ReactNode {
        return (
            <ItemDocument
                key={node.id}
                node={node}
                renderChildren={() => this.renderChildren(node.children)}
            />
        );
    }

    RenderSubtask(node: SubtaskNode): React.ReactNode {
        return (
            <SubtaskDocument
                key={node.id}
                node={node}
            />
        );
    }

    RenderNote(node: NoteNode): React.ReactNode {
        return (
            <NoteDocument
                key={node.id}
                node={node}
            />
        );
    }
}

export const TodoContext = createContext<{ data: RootNode; handlers: TodoHandlers }>({ data: exampleTodoData, handlers: {} as TodoHandlers });

export const App: React.FC = () => {
    const { data, handlers } = useTodo(exampleTodoData);

    const renderer = new ReactTodoRenderer(handlers);
    return (
        <TodoContext.Provider value={{ data, handlers }}>
            <div>{renderer.RenderRoot(data)}</div>
        </TodoContext.Provider>
    );
};