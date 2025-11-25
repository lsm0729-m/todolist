# Todo List 핸들러 함수 구현 가이드

## 📋 핸들러 함수 목록 (9개)

### 1. handleToggleComplete(nodeId)
할일/하위작업의 체크 상태 토글 (`completed: true ↔ false`)

### 2. handleToggleCollapse(nodeId)
섹션 접기/펼치기 (`collapsed: true ↔ false`)

### 3. handleDelete(nodeId)
트리에서 노드 삭제 (자식 포함)

### 4. handleEdit(nodeId, updates)
노드 속성 수정 (제목, 우선순위, 마감일 등)

### 5. handleAddCategory()
루트에 새 카테고리 추가

### 6. handleAddTodo(parentId)
카테고리/섹션에 새 할일 추가

### 7. handleAddSubtask(parentId)
할일에 새 하위작업 추가

### 8. handleAddNote(parentId)
할일에 새 메모 추가

### 9. handleSettings(categoryId)
카테고리 설정 변경 (제목, 색상)

---

## 🎯 구현 우선순위

**Phase 1:** handleToggleComplete, handleToggleCollapse, handleDelete  
**Phase 2:** handleAddTodo, handleAddSubtask, handleEdit  
**Phase 3:** handleAddCategory, handleAddNote, handleSettings

---

## 💡 주의사항

- 불변성 유지 (새 객체 생성)
- 고유 ID 생성 (`crypto.randomUUID()`)
- 삭제 전 확인 메시지
- LocalStorage 또는 API에 저장