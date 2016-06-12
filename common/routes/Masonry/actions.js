import * as types from '../../constants'

export function loadImages () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    dispatch({ type: types.LOAD_MASONRY_REQUEST })
    return axios.get(`https://trays-proxy-2.herokuapp.com/https://dev.maketrays.com/api/loadBrowse`)
      .then(res => {
        dispatch({
          type: types.LOAD_MASONRY_SUCCESS,
          payload: res.data,
        })
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
