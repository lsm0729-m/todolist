import type { DocumentNode, RootNode } from "../interface/todo";

//CRUD 함수 정의 ~

//Create Node
export function addNodeToTree( // parentId아이디 밑에 newNode 추가
    node: DocumentNode | RootNode,
    parentId: string,
    newNode: DocumentNode
): DocumentNode | RootNode {
    if ('id' in node && node.id === parentId && 'children' in node) {
        return {
            ...node,
            children: [...node.children, newNode]
        } as DocumentNode;
    }
    
    if ('children' in node && node.children) {
        return {
            ...node,
            children: node.children.map(child => 
                addNodeToTree(child, parentId, newNode)
            ) 
        } as RootNode;
    }
    
    return node;
}

//Read Node
export function findNodeInTree( //targetId에 맞는 아이디 찾기
    node: DocumentNode | RootNode,
    targetId: string
): DocumentNode | undefined {
    if ('id' in node && node.id === targetId) {
        return node as DocumentNode;
    }
    
    if ('children' in node && node.children) {
        for (const child of node.children) {
            const found = findNodeInTree(child, targetId);
            if (found) return found;
        }
    } 
    
    return undefined;
}

// Update Node
export function updateNodeInTree( // targetId 찾아서 updateFn(문서 종류에 맞게) 사용해서 업데이트 (다양한 종류의 문서 업데이트 가능)
    node: DocumentNode | RootNode,
    targetId: string,
    updateFn: (node: DocumentNode) => DocumentNode
): DocumentNode | RootNode {
    // 현재 노드가 타겟이면 업데이트 함수 적용
    if ('id' in node && node.id === targetId) {
        return updateFn(node);
    }
    
    // children이 있으면 재귀적으로 탐색
    if ('children' in node && node.children) {
        return {
            ...node,
            children: node.children.map(child => 
                updateNodeInTree(child, targetId, updateFn)
            )
        } as RootNode;
    }
    
    return node;
}

// Delete Node
export function deleteNodeInTree( // targetId 찾아서 컴포넌트 제거
    node: DocumentNode | RootNode,
    targetId: string
): DocumentNode | RootNode {
    if ('children' in node && node.children) {
        return {
            ...node,
            children: node.children
                .filter(child => !('id' in child) || child.id !== targetId)
                .map(child => deleteNodeInTree(child, targetId))
        } as RootNode;
    }
    return node;
}