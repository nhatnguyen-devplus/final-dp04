import {
    getAllSlackChannelsSuccess,
    getAllSlackChannelsFailure,
} from './actions'

import { GET_ALL_SLACK_CHANNELS } from './constant'
import { getAllSlackChannels } from './services'
import { call, put, takeEvery } from 'redux-saga/effects'

function* getAllSlackChannelsSaga (){
    try{
        const res = yield call(getAllSlackChannels)
        yield put(getAllSlackChannelsSuccess(res.data))
    } catch (error){
        yield put(getAllSlackChannelsFailure(error))
    }
}

function* slackSaga(){
    yield takeEvery(GET_ALL_SLACK_CHANNELS, getAllSlackChannelsSaga)
}

export default slackSaga
