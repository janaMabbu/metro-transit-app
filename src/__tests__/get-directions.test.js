import Immutable from 'immutable'
import mockStore from '__tests__/mock-store'
import { getGlobalState, getNextActionByType } from '__tests__/global-state'
import mockFetch from '__tests__/mock-fetch'
import { getDirections, isGetDirectionsSuccessful, getSelectedDirection, loadDirections, getDirectionsSuccessHandler, getDirectionsFailureHandler, SET_METRO_DIRECTIONS, SET_GET_DIRECTIONS_SUCCESSFUL } from 'ducks/get-directions'


describe('loadDirections-ducks: testing handlers', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  test('testing the getDirectionsSuccessHandler', () => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    store.dispatch(getDirectionsSuccessHandler({response:'test'}))
    const actions = store.getActions()
    let action = getNextActionByType(actions, SET_METRO_DIRECTIONS)
    expect(action.response).toEqual({response:'test'})
    action = getNextActionByType(actions,SET_GET_DIRECTIONS_SUCCESSFUL )
    expect(action.isSuccessful).toEqual(true)
  })
  test('testing the getDirectionsFailureHandler', () => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    store.dispatch(getDirectionsFailureHandler())
    const actions = store.getActions()
    const action = getNextActionByType(actions,SET_GET_DIRECTIONS_SUCCESSFUL )
    expect(action.isSuccessful).toEqual(false)
  })
})

describe('loadDirections-ducks: triggering loadDirections call ', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  test('loadDirections call success', async done => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    global.fetch = jest.fn()
    global.fetch.mockImplementation(mockFetch(200, {response:'test123'}))
    await store.dispatch(loadDirections('directions/911'))
      .then(() => {
        const actions = store.getActions()
        let action = getNextActionByType(actions, SET_METRO_DIRECTIONS)
        expect(action.response).toEqual({response:'test123'})
        action = getNextActionByType(actions, SET_GET_DIRECTIONS_SUCCESSFUL)
        expect(action.isSuccessful).toEqual(true)
        done()
      })
  })
  test('loadDirections call failure', async done => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    global.fetch = jest.fn()
    global.fetch.mockImplementation(mockFetch())
    await store.dispatch(loadDirections('/directions/911'))
      .then(() => {
        const actions = store.getActions()
        const action = getNextActionByType(actions, SET_GET_DIRECTIONS_SUCCESSFUL)
        expect(action.isSuccessful).toEqual(false)
        done()
      })
  })
})

describe('loadDirections-ducks: testing selectors ', () => {
  beforeEach(() => {
    jest.resetModules()
  })
test('getDirections selectors success scenarios', ()=> {
  const state = Immutable.fromJS({metroDirections:{
      serverData: [1,2,3],
      isGetDirectionsSuccessful: true,
      selectedDirection:4
    }})
    expect(getDirections(state)).toEqual(Immutable.fromJS([1,2,3]))
    expect(isGetDirectionsSuccessful(state)).toEqual(true)
    expect(getSelectedDirection(state)).toEqual(4)
  })
  test('getDirections selectors fallbacks', () => {
  const state = Immutable.fromJS({metroDirections:{}})
    expect(isGetDirectionsSuccessful(state)).toEqual(true)
    expect(getSelectedDirection(state)).toEqual('')
  })
})

