import * as types from '../../constants'

export function fetchImageList () {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: types.LOAD_MASONRY_REQUEST })
    return axios.get(`https://trays-proxy-2.herokuapp.com/https://dev.maketrays.com/api/loadBrowse`)
      .then(res => {
        let data = res.data.filter(item => item.height)
        dispatch({
          type: types.LOAD_MASONRY_SUCCESS,
          payload: data,
        })
      })
      .then(() => {
        dispatch(setLoadingImages())
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${types.LOAD_MASONRY_SUCCESS}: `, error)
        dispatch({
          type: types.LOAD_MASONRY_FAILURE,
          payload: error,
          error: true
        })
      })
  }
}

export function imageLoaded () {
  return (dispatch, getState) => {
    dispatch({ type: types.IMAGE_LOADED })

    if (!getState().masonry.loadingNum) {
      dispatch(setLoadingImages())
    }
  }
}

function setLoadingImages () {
  return (dispatch, getState) => {
    let loadingNum = Math.min(getState().masonry.data.length, 5)
    dispatch({ type: types.SET_LOADING_IMAGES, payload: loadingNum })
    dispatch(posImages())
  }
}

function posImages() {
  return (dispatch, getState) => {
    let loadingNum = getState().masonry.loadingNum
    let loadingImages = getState().masonry.loadingImages

    for (let i = 0; i < loadingNum; i++) {
      let columns = getState().masonry.columns
      dispatch({
        type: types.POS_IMAGE,
        index: getShortestColIndex(columns),
        image: loadingImages[i]
      })
    }
  }
}

function getShortestColIndex(columns) {
  let shortestIndex = 0
  columns.forEach((column, index) => {
    if (column.height < columns[shortestIndex].height) {
      shortestIndex = index
    }
  })
  return shortestIndex
}