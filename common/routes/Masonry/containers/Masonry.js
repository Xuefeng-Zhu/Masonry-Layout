import { provideHooks } from 'redial'
import React, { PropTypes } from 'react'
import { fetchImageList, imageLoaded } from '../actions'
import { connect } from 'react-redux'
import MasonryColumn from '../components/MasonryColumn'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'
import { selectMasonry } from '../reducer'

const redial = {
  fetch: ({ dispatch }) => dispatch(fetchImageList())
}

const mapStateToProps = state => ({
  masonry: selectMasonry(state)
})

const mapDispatchToProps = {
  imageLoaded
}

const Masonry = ({ masonry, imageLoaded }) => (
  <div>
    <Helmet title='Masonry'/>
    {masonry.isLoading &&
      <div>
        <h2 className={css(styles.title)}>Loading....</h2>
      </div>
    }

    {!masonry.isLoading &&
      masonry.columns.map((column) => 
        <MasonryColumn imgs={column.imgs} handleOnLoad={imageLoaded}/>)} 
  </div>
)

Masonry.PropTypes = {
  masonry: PropTypes.object.isRequired,
  imageLoadedL: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  }
})

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(Masonry))
