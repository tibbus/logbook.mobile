import { fetcher } from './fetch'
import { getStreamApi } from './config'
import { getStreamEnvironment } from './config'
import { getStreamFetchLimit } from './config'
import { getStreamApiKey } from './config'
import { replaceParams } from '../Utils'

const fetchLimit = getStreamFetchLimit();
const apiKey = getStreamApiKey();

getUrl = (uri, uriParams = {}) => {
    const env = getStreamEnvironment()
    if (uriParams) {
        return env + replaceParams(uri, uriParams, encodeURIComponent)
  }
  return env + uri
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
    .then(jsonResponse => {
        console.log(jsonResponse)
        return jsonResponse.results;
    })
    .catch(error => {
        console.log(error);
        throw new Error("Error during get stream api call.")
    })

}