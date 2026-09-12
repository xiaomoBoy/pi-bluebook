import test from 'node:test'
import assert from 'node:assert/strict'
import { pendingTasks } from './action-list.mjs'

test('unfinished tasks: earliest date first, unknown date last', () => {
  const input = [
    { id: 'later', due: '2026-09-22', done: false },
    { id: 'unknown', due: null, done: false },
    { id: 'finished', due: '2026-09-19', done: true },
    { id: 'first', due: '2026-09-20', done: false }
  ]
  assert.deepEqual(pendingTasks(input).map(x => x.id), ['first', 'later', 'unknown'])
})

test('the caller retains its original array and task values', () => {
  const input = [{ id: 'b', due: '2026-09-22', done: false }, { id: 'a', due: '2026-09-20', done: false }]
  const before = structuredClone(input)
  pendingTasks(input)
  assert.deepEqual(input, before)
})

test('equal dates retain their original order', () => {
  const input = [{ id: 'a', due: '2026-09-20', done: false }, { id: 'b', due: '2026-09-20', done: false }]
  assert.deepEqual(pendingTasks(input).map(x => x.id), ['a', 'b'])
})

test('empty input returns an empty list', () => {
  assert.deepEqual(pendingTasks([]), [])
})
