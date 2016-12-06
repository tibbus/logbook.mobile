import { fetcher } from './fetch'
import { getStreamApi } from './config'
import { getStreamEnvironment } from './config'
import { getStreamFetchLimit } from './config'
import { getStreamApiKey } from './config'
import { replaceParams } from '../Utils'
import { mapKeys, camelCase } from 'lodash'

const fetchLimit = getStreamFetchLimit();
const apiKey = getStreamApiKey();

const getUrl = (uri, uriParams = {}) => {
    const env = getStreamEnvironment()
    if (uriParams) {
        return env + replaceParams(uri, uriParams, encodeURIComponent)
  }
  return env + uri
}

const formatResponse = (mapToConvert) =>{
    const formattedData = mapToConvert.map(item => {

        const postObject = mapKeys(item.Target, (currentItem, currentKey) => {
            return camelCase(currentKey)
        });

        postObject.type = item.object;
        return postObject;
    })
    return formattedData;
}

export const getFeedData = (feedType, feedId, token) => {

    const url = getUrl(`${getStreamApi}feed/${feedType}/${feedId}/?limit=${fetchLimit}&api_key=${apiKey}`)
    
    return global.fetch(url, {
        headers: {
            'Stream-Auth-Type' : 'jwt',
            'Authorization': token
        }
    })
    .then(response => response.json())
    .then(jsonResponse => formatResponse(jsonResponse.results))
    .catch(error => {
        console.log(error);
        throw new Error("Error during get stream api call.")
    })

}