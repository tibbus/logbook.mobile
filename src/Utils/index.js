import { camelize } from 'underscore.string'
import {
    curry,
    keys,
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
