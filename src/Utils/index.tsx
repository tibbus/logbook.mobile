import { camelize, decapitalize } from 'underscore.string'
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
import moment from 'moment'

export const mapKeys = curry((fn: any, obj: any) => {
  const currentObj: any = map(fn, keys(obj));

  return zipObj(currentObj, values(obj))
});

export const objKeysToCamel = mapKeys(camelize)

export const objKeysToDecap = mapKeys(decapitalize)

export const paramsToObject = (params = []) => (
  params.reduce((acc = {}, param = '') => {
    const split = param.split('=')
    if (split.length === 2) {
      return { ...acc, ...{ [split[0]]: split[1] } }
    }

    return acc
  }, {})
)

const urlToObj = (splitter: any) => (url: String) => {
  const split = url.split(splitter)

  if (split.length !== 2) {
    return false
  }
  const params = split[1].split('&')

  return objKeysToCamel(paramsToObject(params))
}

export const paramsToObj = urlToObj('?')

export const hashToObj = urlToObj('#')

export const timeAgo = (latest, previous) => {
  const latestMoment = moment(latest)
  const previousMoment = moment(previous)
  return previousMoment.from(latestMoment)
}

export const replaceParams = (str, obj = {}, modifier = param => param) => {
  const helper = (acc, keys) => {
    if (isEmpty(keys)) return acc

    const next: any = head(keys)
    const val = obj[next]
    return helper(acc.replace(new RegExp(`\{${next}\}`, 'ig'), modifier(val)), tail(keys))
  }

  const keys = Object.keys(obj)
  return helper(str, keys)
}
