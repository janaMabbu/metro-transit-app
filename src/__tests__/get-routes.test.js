import Immutable from 'immutable'
import mockStore from '__tests__/mock-store'
import { getGlobalState, getNextActionByType } from '__tests__/global-state'
import mockFetch from '__tests__/mock-fetch'
import { getMetroRoutes, getSelectedRoute, isGetRoutesSuccessful, getRoutes, getRoutesSuccessHandler, getRoutesFailureHandler, SET_METRO_ROUTES, SET_GET_ROUTES_SUCCESSFUL } from 'ducks/get-routes'


describe('getRoutes-ducks: testing handlers', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  test('testing the getRoutesSuccessHandler', () => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    store.dispatch(getRoutesSuccessHandler({response:'test'}))
    const actions = store.getActions()
    let action = getNextActionByType(actions, SET_METRO_ROUTES)
    expect(action.response).toEqual({response:'test'})
    action = getNextActionByType(actions,SET_GET_ROUTES_SUCCESSFUL )
    expect(action.isSuccessful).toEqual(true)
  })
  test('testing the getRoutesFailureHandler', () => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    store.dispatch(getRoutesFailureHandler())
    const actions = store.getActions()
    const action = getNextActionByType(actions,SET_GET_ROUTES_SUCCESSFUL )
    expect(action.isSuccessful).toEqual(false)
  })
})

describe('getRoutes-ducks: triggering getRoutes call ', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  test('getRoutes call success', async done => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    global.fetch = jest.fn()
    global.fetch.mockImplementation(mockFetch(200, {response:'test123'}))
    await store.dispatch(getRoutes('/routes'))
      .then(() => {
        const actions = store.getActions()
        let action = getNextActionByType(actions, SET_METRO_ROUTES)
        expect(action.response).toEqual({response:'test123'})
        action = getNextActionByType(actions, SET_GET_ROUTES_SUCCESSFUL)
        expect(action.isSuccessful).toEqual(true)
        done()
      })
  })
  test('getRoutes call failure', async done => {
    const globalState = getGlobalState()
    const store = mockStore(globalState)
    global.fetch = jest.fn()
    global.fetch.mockImplementation(mockFetch())
    await store.dispatch(getRoutes('/routes'))
      .then(() => {
        const actions = store.getActions()
        const action = getNextActionByType(actions, SET_GET_ROUTES_SUCCESSFUL)
        expect(action.isSuccessful).toEqual(false)
        done()
      })
  })
})

describe('getRoutes-ducks: testing selectors ', () => {
  beforeEach(() => {
    jest.resetModules()
  })
test('getRoutes selectors success scenarios', ()=> {
  const state = Immutable.fromJS({metroRoutes:{
      serverData: [1,2,3],
      isGetRoutesSuccessful: true,
      selectedRoute:607
    }})
    expect(getMetroRoutes(state)).toEqual(Immutable.fromJS([1,2,3]))
    expect(isGetRoutesSuccessful(state)).toEqual(true)
    expect(getSelectedRoute(state)).toEqual(607)
  })
  test('getRoutes selectors fallbacks', () => {
  const state = Immutable.fromJS({metroRoutes:{}})
    expect(isGetRoutesSuccessful(state)).toEqual(true)
    expect(getSelectedRoute(state)).toEqual('')
  })
})

