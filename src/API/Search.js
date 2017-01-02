import { fetcher } from './fetch'
import { searchEnvironment, AZURE_SEARCH_API_VERSION, searchIndex, searchApiKey } from './config'
import { replaceParams } from '../Utils'

const apiKey = searchApiKey();
const searchIndex = searchIndex();

const getUrl = (uriParams = { 'api-version': AZURE_SEARCH_API_VERSION }) => {
    
    const env = searchEnvironment();
    const uri = `${searchIndex}docs`;
    
    if (uriParams) {
        return env + replaceParams(uri, uriParams, encodeURIComponent);
  }
  
  return env + uri;
}

export const getSearchResult = (searchTerm) => {

    const url = getUrl();
    const searchBody = { 'search': searchTerm+'*' };

    return global.fetch(url, {
        methods: 'post',
        headers: {
            'api-key' : apiKey,
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: searchBody    
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })
}