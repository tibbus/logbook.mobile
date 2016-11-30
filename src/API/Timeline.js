import { fetcher } from './fetch'
import { api } from './config'


export const getTimelineToken = fetcher(api + 'feeds/token', 'POST',) 

const getOldTimeline = fetcher(api + 'timeline/{carInfoId}')  


export const getTimeline = () => { 

    var promise  = new Promise((resolve, reject) => { 

      const body = {actorId:1, actorType:"user" } 
      const request = { body } 

      getTimelineToken(request, {}) 
      .then(data => { 

        console.log(data) 
        console.log(client) 
        resolve(data)   

      }) 

      .catch(e => { 
        console.log(e) 

        // TODO Handle timeline init failure 

      }) 
    }) 

    //fetcher to get token 
    //One token available, use fetch to call getstream? 
    return promise; 
} 
