import { camelize } from 'underscore.string'
import {
    curry,
    head,
    isEmpty,
    keys,
    tail,
    map,
    values,
    zipObj
} from 'ramda'

export const mapKeys = curry((fn, obj) => zipObj(map(fn, keys(obj)), values(obj)))

export const objKeysToCamel = mapKeys(camelize)

export const paramsToObject = (params = []) => (
  params.reduce((acc = {}, param = '') => {
    const split = param.split('=')
    if (split.length === 2) {
      return { ...acc, ...{ [split[0]]: split[1] } }
    }

    return acc
  }, { })
)

export const replaceParams = (str, obj = {}) => {
  const helper = (acc, keys) => {
    if (isEmpty(keys)) return acc

    const next = head(keys)
    const val = obj[next]
    return helper(acc.replace(new RegExp(`\{${next}\}`, 'ig'), val), tail(keys))
  }

  const keys = Object.keys(obj)
  return helper(str, keys)
}
