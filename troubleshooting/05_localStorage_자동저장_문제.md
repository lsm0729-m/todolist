# localStorage 자동 저장 문제

## 문제 상황

할 일을 추가하거나 수정할 때마다 자동으로 localStorage에 저장하고 싶었습니다.

초기에는 `setTodos` 직후에 `localStorage.setItem`을 호출했지만, **변경사항이 제대로 저장되지 않는 문제**가 발생했습니다.

## 시도한 방법

### ❌ 문제가 있던 코드

```typescript
function addTodo() {
    const newTodo = { id: newId, text: inputText, ... };
    
    setTodos([...todos, newTodo]);
    localStorage.setItem("todos", JSON.stringify(todos));  // ❌ 이전 값이 저장됨
}
```

**문제점:**
- `setTodos`는 비동기로 동작
- `localStorage.setItem` 실행 시점에 `todos`는 아직 업데이트되지 않음
- 결과: 이전 상태가 저장되어 새로 추가한 항목이 빠짐

## 해결 방법

### ✅ 수정된 코드

```typescript
function addTodo() {
    const newTodo = { id: newId, text: inputText, ... };
    
    const newTodos = [...todos, newTodo];  // 먼저 새 배열 생성
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));  // ✅ 업데이트된 값 저장
}
```

**해결 방법:**
1. 업데이트될 새 배열을 먼저 변수에 저장
2. 그 변수를 `setTodos`와 `localStorage.setItem` 모두에 사용


## 추가 개선

### 자동 불러오기

```typescript
// useState 초기값 함수로 localStorage에서 자동 불러오기
const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
        return JSON.parse(savedTodos);
    }
    return [];
});
```

## 결과

- ✅ 모든 동작 후 즉시 localStorage에 자동 저장
- ✅ 새로고침 시 자동으로 데이터 복원
- ✅ 수동 저장 버튼 불필요
- ✅ 사용자 경험 개선

## 핵심 교훈

**React의 `setState`는 비동기로 동작하므로, 업데이트된 값을 즉시 사용해야 할 때는 중간 변수에 저장해서 사용해야 한다.**

