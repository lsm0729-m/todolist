# Todo List

## 🚀 프로젝트 실행 방법

```bash
npm install
npm start
```

브라우저에서 `http://localhost:8080` 자동 실행

## ✨ 구현한 기능 목록

### 기본 기능
- ✅ Todo 추가, 수정, 삭제
- ✅ 완료 상태 토글 (체크박스)
- ✅ 계층형 구조 (무한 하위 항목 추가)
- ✅ 하위 항목 확장/축소

### 추가 도전 과제
- ✅ 부모-자식 완료 상태 동기화
- ✅ 진행률 표시
- ✅ 호버 시 액션 버튼 표시
- ✅ 데이터 저장/불러오기 (LocalStorage)
- ✅ 파일 저장/불러오기
- ✅ 필터링 (전체/미완료/완료)
- ✅ 검색 기능

## 📊 데이터 구조

```typescript
interface Todo {
  id: string;              // 고유 식별자
  text: string;            // 할 일 내용
  completed: boolean;      // 완료 여부
  isExpanded: boolean;     // 펼침/접힘 상태
  children: Todo[];        // 하위 항목 배열 (재귀 구조)
}
```

## 🔧 State (상태 관리)

- `todos` - 전체 Todo 리스트 배열
- `inputText` - 새 Todo 입력값
- `filter` - 필터 상태 (전체/미완료/완료)
- `searchText` - 검색어

## 🔄 헬퍼 함수 (재귀)

- `getAddChildTodo()` - 특정 부모에 하위 항목 추가
- `getDeleteTodo()` - 특정 Todo 삭제
- `getToggleTodo()` - 완료 상태 토글
- `getEditTodo()` - Todo 텍스트 수정
- `getToggleExpand()` - 펼침/접힘 상태 토글
- `updateParentCompleted()` - 부모-자식 완료 상태 동기화

## 🧩 컴포넌트

- `App` - 전체 상태 관리 및 데이터 저장/불러오기
- `TodoList` - Todo 배열 필터링 및 렌더링
- `TodoItem` - 개별 Todo 표시 및 재귀 렌더링
- `ExpandToggleButton` - 펼침/접힘 버튼
- `TodoCheckbox` - 완료 체크박스
- `TodoTextEditor` - Todo 텍스트 편집
- `TodoActionButtons` - 수정/삭제/하위추가 버튼
- `AddChildForm` - 하위 항목 추가 폼

## 🔍 트러블슈팅

개발 과정에서 겪었던 주요 어려움과 해결 방법:

1. **부모-자식 완료 상태 동기화** ([상세 보기](./troubleshooting/01_부모자식_완료상태_동기화.md))
   - 문제: 계산된 값이 실제 데이터에 반영되지 않음
   - 해결: 재귀 함수와 2단계 업데이트 전략 사용

2. **토글 상태 초기화 문제** ([상세 보기](./troubleshooting/02_토글상태_초기화_문제.md))
   - 문제: 상위 항목 접었다 펼치면 하위 토글 상태가 초기화됨
   - 해결: 데이터 모델에 `isExpanded` 필드 추가하여 전역 상태로 관리

3. **개발 서버 캐시 문제** ([상세 보기](./troubleshooting/03_개발서버_캐시_문제.md))
   - 문제: 코드 수정 후 이유 없는 에러 발생
   - 원인: Webpack Dev Server 캐시 문제로 예상
   - 해결: 개발 서버 재시작 (`Ctrl + C` → `npm start`)

4. **ID 중복 문제** ([상세 보기](./troubleshooting/04_ID_중복_문제.md))
   - 문제: `todos.length + 1` 방식은 삭제 후 추가 시 ID 중복 발생
   - 해결: 타임스탬프 기반 고유 ID 생성 (`Date.now()`)

5. **localStorage 자동 저장 문제** ([상세 보기](./troubleshooting/05_localStorage_자동저장_문제.md))
   - 문제: `setState` 직후 `localStorage` 저장 시 이전 값이 저장됨
   - 원인: React의 `setState`는 비동기로 동작
   - 해결: 업데이트된 값을 변수에 저장 후 사용
