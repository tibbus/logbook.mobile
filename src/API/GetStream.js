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

const getHeaders = (token) => {
    return (
        {
            headers: {
                'Stream-Auth-Type': 'jwt',
                'Authorization': token
            }
        }
    );
}

export const getFeedData = (feedType, feedId, token) => {

    const url = getUrl(`${getStreamApi}feed/${feedType}/${feedId}/?limit=${fetchLimit}&api_key=${apiKey}`)
    
    return global.fetch(url, getHeaders(token))
    .then(response => response.json())
    .then(jsonResponse => {
        const timelineTimes = jsonResponse.results.map((timelineObject) => {
            return {
                ...timelineObject.Target,
                type: timelineObject.object
            };
        })
        return timelineTimes;
    })
    .catch(error => {
        console.log(error);
        throw new Error("Error during get stream api call.")
    })

}

export const getUserFollowing = (token, userId) => {

    const url = getUrl(`${getStreamApi}feed/user/${userId}/following/?api_key=${apiKey}`);

    return global.fetch(url, getHeaders(token))
    .then(response => response.json())
    .then(jsonResponse => {
        console.log(jsonResponse);
        const carIds = jsonResponse.results.map(item => {
             return item.target_id.split(":")[1];
        })
        return carIds;
    })
}

export const getCarFollowers = (token, carinfoId) => {

    const url = getUrl(`${getStreamApi}feed/car/${carInfoId}/followers/?api_key=${apiKey}`)

    return global.fetch(url, getHeaders(token))
    .then(response => response.json())
    .then(jsonResponse => {
        console.log(jsonResponse);
        return jsonResponse.results;
    })
}