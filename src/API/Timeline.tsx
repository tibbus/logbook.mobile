import { fetcher } from './fetch'
import { api } from './config'
import { getStreamApi } from './config'
import { getFeedData } from './GetStream'

export const getTimelineToken = fetcher(api + 'feeds/token', 'POST')

const getOldTimeline = fetcher(api + 'timeline/{carInfoId}')

export const getTimeline = (type: string, id: string) => {
    console.log('get timeline')
    const promise = new Promise((resolve, reject) => {
        const body = { actorId: id, actorType: type }
        const request = { body }

        getTimelineToken({ body }, {})
            .then((tokenResponse: any) => {
                console.log(tokenResponse)

                //Call to timeline
                getFeedData(type, id, tokenResponse.token)
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