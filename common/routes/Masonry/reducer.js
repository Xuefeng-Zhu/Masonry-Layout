import * as types from '../../constants'
import update from 'react/lib/update'

export default function masonry (state = {
  columns: [],
  isLoading: false,
  error: null
}, action) {
  switch (action.type) {
    case types.LOAD_MASONRY_REQUEST:
      return update(state, {
        columns: { $set: [{ height: 0, imgs:[] }, { height: 0, imgs: [] }, { height: 0, imgs: [] }]},
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
    case types.SET_LOADING_IMAGES:
      return update(state, {
        loadingNum: { $set: action.payload },
        loadingImages: { $set: state.data.slice(0, action.payload) },
        data: { $set: state.data.slice(action.payload) }
      })
    case types.POS_IMAGE:
      return update(state, {
        columns: { $set: [
          ...state.columns.slice(0, action.index),
          addImageToCol(state.columns[action.index], action.image),
          ...state.columns.slice(action.index + 1)
        ]}
      })
    case types.IMAGE_LOADED:
      return update(state, {
        loadingNum: { $set: state.loadingNum - 1}
      })
    default:
      return state
  }
}

function addImageToCol(column, image) {
  return {
    height: column.height + (image.height / (image.width / 300)),
    imgs: [...column.imgs, image]
  }
}

// Example of a co-located selector
export const selectMasonry = state => state.masonry
