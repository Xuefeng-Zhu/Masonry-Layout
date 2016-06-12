import * as types from '../../constants'
import update from 'react/lib/update'

export default function masonry (state = {
  data: [],
  isLoading: false,
  error: null
}, action) {
  switch (action.type) {
    case types.LOAD_MASONRY_REQUEST:
      return update(state, {
        isLoading: { $set: true }
      })
    case types.LOAD_MASONRY_SUCCESS:
      return update(state, {
        data: { $set: action.payload },
        isLoading: { $set: false }
      })
    case types.LOAD_MASONRY_FAILURE:
      return update(state, {
        error: { $set: action.payload }
      })
    default:
      return state
  }
}

// Example of a co-located selector
export const selectMasonry = state => state.masonry
