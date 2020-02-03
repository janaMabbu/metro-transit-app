import Immutable from 'immutable'
import mockStore from '__tests__/mock-store'
import { getGlobalState, getNextActionByType } from '__tests__/global-state'
import mockFetch from '__tests__/mock-fetch'
import { getStops, isGetStopsSuccessful, loadStops, getStopsSuccessHandler, getStopsFailureHandler, SET_METRO_STOPS, SET_GET_STOPS_SUCCESSFUL } from 'ducks/get-stops'


describe('GetStops-ducks: testing handlers', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  test('testing the getStopsSuccessHandler', () => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    store.dispatch(getStopsSuccessHandler({response:'test'}))
    const actions = store.getActions()
    let action = getNextActionByType(actions, SET_METRO_STOPS)
    expect(action.response).toEqual({response:'test'})
    action = getNextActionByType(actions,SET_GET_STOPS_SUCCESSFUL )
    expect(action.isSuccessful).toEqual(true)
  })
  test('testing the getStopsFailureHandler', () => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    store.dispatch(getStopsFailureHandler())
    const actions = store.getActions()
    const action = getNextActionByType(actions,SET_GET_STOPS_SUCCESSFUL )
    expect(action.isSuccessful).toEqual(false)
  })
})

describe('GetStops-ducks: triggering loadStops call ', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  test('GetStops call success', async done => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    global.fetch = jest.fn()
    global.fetch.mockImplementation(mockFetch(200, {response:'test123'}))
    await store.dispatch(loadStops('/stops/2/3'))
      .then(() => {
        const actions = store.getActions()
        let action = getNextActionByType(actions, SET_METRO_STOPS)
        expect(action.response).toEqual({response:'test123'})
        action = getNextActionByType(actions, SET_GET_STOPS_SUCCESSFUL)
        expect(action.isSuccessful).toEqual(true)
        done()
      })
  })
  test('GetStops call failure', async done => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    global.fetch = jest.fn()
    global.fetch.mockImplementation(mockFetch())
    await store.dispatch(loadStops('/stops/2/3'))
      .then(() => {
        const actions = store.getActions()
        const action = getNextActionByType(actions, SET_GET_STOPS_SUCCESSFUL)
        expect(action.isSuccessful).toEqual(false)
        done()
      })
  })
})

describe('GetStops-ducks: testing selectors ', () => {
  beforeEach(() => {
    jest.resetModules()
  })
test('GetStops selectors success scenarios', ()=> {
  const state = Immutable.fromJS({metroStops:{
      serverData: [1,2,3],
      isGetStopsSuccessful: true
    }})
    expect(getStops(state)).toEqual(Immutable.fromJS([1,2,3]))
    expect(isGetStopsSuccessful(state)).toEqual(true)
  })
  test('GetStopsGetStops selectors fallbacks', () => {
  const state = Immutable.fromJS({metroRoutes:{}})
    expect(isGetStopsSuccessful(state)).toEqual(true)
  })
})

