import { fetcher } from './fetch'
import { api } from './config'
import { getStreamApi } from './config'
import { getFeedData } from './GetStream'

export const  getTimelineToken = fetcher(api + 'feeds/token', 'POST')

const getOldTimeline = fetcher(api + 'timeline/{carInfoId}')

export const  getTimeline = (carInfoId) => {
    console.log('get timeline')
    const  promise = new Promise((resolve, reject) => {
        const  body = { actorId: carInfoId, actorType: 'car' }
        const  request = { body }

        getTimelineToken({ body }, {})
            .then(tokenResponse => {
                console.log(tokenResponse)

                //Call to timeline
                getFeedData('car', carInfoId, tokenResponse.token)
                    .then(response => {
                        console.log(response);
                        resolve(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(e => {
                console.log(e)
            })
    })

        return promise;
}
