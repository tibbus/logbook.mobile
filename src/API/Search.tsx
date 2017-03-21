import { fetcher } from './fetch'
import { getSearchEnvironment, AZURE_SEARCH_API_VERSION, getSearchIndex, getSearchApiKey } from './config'
import { replaceParams } from '../Utils'

const apiKey = getSearchApiKey();
const searchIndex = getSearchIndex();

const getUrl = (searchType, uriParams = { 'api-version': `${AZURE_SEARCH_API_VERSION}` }) => {
    
    const env = getSearchEnvironment();
    const uri = `${searchIndex}docs/${searchType}?api-version=${AZURE_SEARCH_API_VERSION}`;
    
    if (uriParams) {
        return env + replaceParams(uri, uriParams, encodeURIComponent);
  }
  
  return env + uri;
}

export const getSearchSuggestions = (searchTerm) => {
    
    const url = getUrl('suggest');
    const requestBody = {
        'search' : searchTerm,
        'suggesterName' : 'basic'
    }

    return executeRequest(url. requestBody);
}

export const getSearchResult = (searchTerm) => {

    const url = getUrl('search');
    const requestBody = { 'search': `${searchTerm}*` };

    return executeRequest(url, requestBody);
}

const executeRequest = (url, body) => {

    const requestDetails = { method: 'POST', body: JSON.stringify(body), headers: {'api-key' : apiKey, 'Accept' : 'application/json','Content-Type' : 'application/json'}};
    return global.fetch(url, requestDetails)
    .then(response => {
        
        if(response.ok){
            return response.json();
        }
    })
    .catch(error => {
        console.log(error);
        throw new Error("Error during search api call.");
    })
}