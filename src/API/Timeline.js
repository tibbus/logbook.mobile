import { fetcher } from './fetch'
import { api } from './config'
import getStream from 'getstream';

export  const getTimelineToken  =  fetcher(api  +  'feeds/token',  'POST')

const  getOldTimeline  =  fetcher(api  +  'timeline/{carInfoId}')
const getStreamClient = getStream.connect("8r2y2gbevg9j")

export  const getTimeline  =  (carInfoId)  =>  {
    console.log('get timeline')
        var  promise   =  new  Promise((resolve,  reject)  =>  {
              const body  =  { actorId: carInfoId,  actorType: 'car'  }
              const request  =  {  body  }

                // Fetch the token
              getTimelineToken({ body },  {})
                .then(token =>  {
                //Call to timeline
                const carFeed = getStreamClient.feed('car', carInfoId.toString(), token);

                carFeed.get({ limit: 10 })
                    .then(body => {
                        console.log(body);
                        resolve(body);
                    })
                    .catch(response => {
                        console.log(response);
                    })
                        //Get the data and then resolve the data.
                        console.log(token)
                  })
                  .catch(e  =>  {
                        console.log(e)
                  })
        })

        return  promise;
} 
