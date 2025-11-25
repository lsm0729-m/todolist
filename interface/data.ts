import type { CategoryNode, ItemNode, NoteNode, RootNode, SectionNode, SubtaskNode } from "./todo"

export const exampleTodoData : RootNode = {
  "type": "TodoRoot",
  "children": [
    {
      "type": "TodoCategory",
      "id": "cat-1",
      "title": "개인",
      "color": "#3b82f6",
      "children": [
        {
          "type": "TodoItem",
          "id": "todo-1",
          "title": "장보기",
          "completed": false,
          "priority": "high",
          "dueDate": "2025-11-25",
          "children": [
            {
              "type": "TodoSubtask",
              "id": "subtask-1",
              "title": "우유 사기",
              "completed": true
            },
            {
              "type": "TodoSubtask",
              "id": "subtask-2",
              "title": "빵 사기",
              "completed": false
            }
          ]
        },
        {
          "type": "TodoItem",
          "id": "todo-2",
          "title": "운동하기",
          "completed": true,
          "priority": "medium",
          "dueDate": "2025-11-24",
          "children": []
        }
      ]
    },
    {
      "type": "TodoCategory",
      "id": "cat-2",
      "title": "업무",
      "color": "#10b981",
      "children": [
        {
          "type": "TodoItem",
          "id": "todo-3",
          "title": "dgn-agent 개발",
          "completed": false,
          "priority": "high",
          "dueDate": "2025-11-30",
          "children": [
            {
              "type": "TodoSubtask",
              "id": "subtask-3",
              "title": "Visitor 패턴 구현",
              "completed": false
            },
            {
              "type": "TodoSubtask",
              "id": "subtask-4",
              "title": "React Flow 통합",
              "completed": false
            }
          ]
        },
        {
          "type": "TodoSection",
          "id": "section-1",
          "title": "리뷰 대기",
          "collapsed": false,
          "children": [
            {
              "type": "TodoItem",
              "id": "todo-4",
              "title": "코드 리뷰하기",
              "completed": false,
              "priority": "medium",
              "children": []
            },
            {
              "type": "TodoItem",
              "id": "todo-5",
              "title": "문서 작성",
              "completed": false,
              "priority": "low",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "type": "TodoCategory",
      "id": "cat-3",
      "title": "학습",
      "color": "#f59e0b",
      "children": [
        {
          "type": "TodoItem",
          "id": "todo-6",
          "title": "함수형 프로그래밍 공부",
          "completed": false,
          "priority": "medium",
          "children": [
            {
              "type": "TodoNote",
              "id": "note-1",
              "content": "Haskell의 Monad 개념 복습 필요"
            },
            {
              "type": "TodoSubtask",
              "id": "subtask-5",
              "title": "람다 계산법 연습",
              "completed": false
            }
          ]
        }
      ]
    }
  ]
}