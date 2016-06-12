if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'masonry',
    getComponents (location, cb) {
      require.ensure([
        './containers/Masonry',
        './reducer'
      ], (require) => {
        let Masonry = require('./containers/Masonry').default
        let reducer = require('./reducer').default
        injectAsyncReducer(store, 'masonry', reducer)
        cb(null, Masonry)
      })
    }
  }
}
