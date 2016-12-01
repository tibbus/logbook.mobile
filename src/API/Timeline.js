import { fetcher } from './fetch'
import { api } from './config'
import getStream from 'getstream';

export const getTimelineToken = fetcher(api + 'feeds/token', 'POST',) 

const getOldTimeline = fetcher(api + 'timeline/{carInfoId}')  

const getStreamClient = getStream.connect("8r2y2gbevg9j")

export const getTimeline = (carInfoId) => { 

    var promise  = new Promise(carInfoId, (resolve, reject) => { 

      const body = {actorId:carinfoId, actorType:"car" } 
      const request = { body } 

     // Fetch the token
      getTimelineToken(request, {}) 
      .then(token=> { 

        //Call to timeline
        const carFeed = getStreamClient.feed('car', carInfoId.toString(), data);

        carFeed.get({limit:10})
        .then(body => {

            console.log(body);
            resolve(body);

        })
        .catch(response => {

        })
        //Get the data and then resolve the data.
        console.log(token) 
      }) 

      .catch(e => { 
        console.log(e) 
      }) 
    

    }) 
    return promise; 
} 
