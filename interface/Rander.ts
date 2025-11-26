import type { BaseNode, CategoryNode, DocumentNode, ItemNode, NoteNode, RootNode, SectionNode, SubtaskNode } from "./todo";

// 1. 공통 Visitor 인터페이스 (제네릭 사용)
interface DocumentRenderer<T> {
  RenderRoot(node: RootNode): T;
  RenderCategory(node: CategoryNode): T;
  RenderSection(node: SectionNode): T;
  RenderItem(node: ItemNode): T;
  RenderSubtask(node: SubtaskNode): T;
  RenderNote(node: NoteNode): T;
}



// 2. 기본 Renderer 추상 클래스
export abstract class BaseDocumentRenderer<T> implements DocumentRenderer<T> {
  abstract RenderRoot(node: RootNode): T;
  abstract RenderCategory(node: CategoryNode): T;
  abstract RenderSection(node: SectionNode): T;
  abstract RenderItem(node: ItemNode): T;
  abstract RenderSubtask(node: SubtaskNode): T;
  abstract RenderNote(node: NoteNode): T;

  // 공통 유틸리티 메서드
  public render(node: DocumentNode): T {
    const methodName = `${node.type}` as keyof this;
    switch (methodName) {
      case "TodoRoot":
        return this.RenderRoot(node as RootNode);
      case "TodoCategory":
        return this.RenderCategory(node as CategoryNode);
      case "TodoSection":
        return this.RenderSection(node as SectionNode);
      case "TodoItem":
        return this.RenderItem(node as ItemNode);
      case "TodoSubtask":
        return this.RenderSubtask(node as SubtaskNode);
      case "TodoNote":
        return this.RenderNote(node as NoteNode);
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }

  protected renderChildren(children: DocumentNode[]): T[] {
    return children.map((child: DocumentNode) => this.render(child));
  }
}

export interface TodoHandlers {
  // Section 관련
  onToggleSection: (sectionId: string) => void;
  onAddTodoItem: (sectionId: string) => void;
  onAddSection: (categoryId: string) => void;
  onDeleteSection: (sectionId: string) => void;
  onEditSection: (sectionId: string, newTitle: string) => void;
  
  // Category 관련
  onAddCategory: () => void;
  onDeleteCategory: (categoryId: string) => void;
  onUpdateCategorySettings: (categoryId: string, newTitle: string, newColor: string) => void;
  onAddTodoToCategory: (categoryId: string) => void;
  
  // Item 관련
  onToggleItem: (itemId: string) => void;
  onAddSubtask: (itemId: string) => void;
  onAddNote: (itemId: string) => void;
  onEditItem: (itemId: string, newTitle: string, newPriority: "high" | "medium" | "low") => void;
  onDeleteItem: (itemId: string) => void;
  
  // Subtask 관련
  onToggleSubtask: (subtaskId: string) => void;
  onEditSubtask: (subtaskId: string, newTitle: string) => void;
  onDeleteSubtask: (subtaskId: string) => void;
  
  
  // Note 관련
  onEditNote: (noteId: string, newContent: string) => void;
  onDeleteNote: (noteId: string) => void;

}