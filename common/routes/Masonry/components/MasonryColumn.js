import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'


const MasonryColumn = ({ imgs, handleOnLoad }) => (
  <div className={css(styles.root)}>
    {
      imgs.map((img) =>
        <img className={css(styles.thumb)} src={img.thumbUrl} onLoad={handleOnLoad}/>)
    }
  </div>
)

MasonryColumn.PropTypes = {
  imgs: PropTypes.array.isRequired,
  handleOnLoad: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  root: {
    display: 'inline-block',
    width: '300px',
    'vertical-align': 'top'
  },
  thumb: {
    margin: '10px'
  }
})

export default MasonryColumn