import {
  buildAsyncState,
  buildAsyncActions,
  buildAsyncReducers,
} from '@thecodingmachine/redux-toolkit-wrapper'

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('startup/init', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Put code here that does initialization before app is displayed
    // navigateAndSimpleReset('Main')
  }),
  reducers: buildAsyncReducers({ itemKey: null }), // We do not want to modify some item by default
}
