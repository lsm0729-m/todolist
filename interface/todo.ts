export interface BaseNode {
  type: string;
  id: string;
}

// 루트 는 무조건 카테고리만 하위로 가지도록
export interface RootNode {
  type: "TodoRoot";
  children: CategoryNode[];
}

// 카테고리는 Item, Section 만 하위로 가지도록
export interface CategoryNode extends BaseNode {
  type: "TodoCategory";
  title: string;
  color: string;
  children: (ItemNode | SectionNode)[];
}

// Item은 Subtask, Note 만 하위로 가지도록
export interface ItemNode extends BaseNode {
  type: "TodoItem";
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  dueDate?: string;
  children: (SubtaskNode | NoteNode)[];
}


// Section은 Item, Note, Subtask 만 하위로 가지도록
export interface SectionNode extends BaseNode {
  type: "TodoSection";
  title: string;
  collapsed: boolean;
  children: (ItemNode | NoteNode | SubtaskNode)[];
}


export interface SubtaskNode extends BaseNode {
  type: "TodoSubtask";
  title: string;
  completed: boolean;
}

export interface NoteNode extends BaseNode {
    type: "TodoNote";
    content: string;
}


export type DocumentNode = 
  | RootNode 
  | CategoryNode 
  | SectionNode 
  | ItemNode 
  | SubtaskNode 
  | NoteNode;
