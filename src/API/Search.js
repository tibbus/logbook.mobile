import { fetcher } from './fetch'
import { searchEnvironment, AZURE_SEARCH_API_VERSION, searchIndex, searchApiKey } from './config'
import { replaceParams } from '../Utils'

const apiKey = searchApiKey();
const searchIndex = searchIndex();

const getUrl = (searchType, uriParams = { 'api-version': AZURE_SEARCH_API_VERSION }) => {
    
    const env = searchEnvironment();
    const uri = `${searchIndex}docs/${searchType}`;
    
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

    return global.fetch(url, {
        methods: 'post',
        headers: {
            'api-key' : apiKey,
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: body    
    })
}