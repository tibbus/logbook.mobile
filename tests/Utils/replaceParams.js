import test from 'ava'
import { replaceParams } from '../../src/Utils'

test('should replace params', t => {
  const obj = {
    meow: 'test',
    woof: 'test2'
  }
  const result = 'fsdfd/test/dssdfsdftest2'
  const template = 'fsdfd/{meow}/dssdfsdf{woof}'
  t.is(replaceParams(template, obj), result)
})
