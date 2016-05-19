import test from 'ava'
import { objKeysToCamel } from '../../src/Utils'

const obj = {
  'test_case': 1,
  'test-case1': 2
}

const expected = {
  testCase: 1,
  testCase1: 2
}

test('it will covert keys to camel case', t => {
  t.deepEqual(objKeysToCamel(obj), expected)
})

test('it will not mutate argument', t => {
  const copy = { ...obj }
  objKeysToCamel(obj)
  t.deepEqual(obj, copy)
})
