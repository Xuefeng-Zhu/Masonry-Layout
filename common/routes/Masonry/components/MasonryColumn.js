import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite'

const MasonryColumn = ({ imgs, handleLoad }) => (
  <div>
    {
      imgs.map((img) =>
        <img src={img.thumbUrl}/>)
    }
  </div>
)

MasonryColumn.PropTypes = {
  imgs: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  root: {
    margin: '0 auto 1.5rem'
  },
  title: {
    fontSize: 28,
    textDecoration: 'none',
    lineHeight: '1.2',
    margin: '0 0 1.5rem',
    color: '#000',
    transition: '.3s opacity ease',
    ':hover': {
      opacity: 0.5
    }
  }
})

export default MasonryColumn
