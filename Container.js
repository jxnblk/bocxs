
import React from 'react'
import { Box } from '../src'

const Container = props => (
  <Box {...props}
    mx='auto'
    px3
    css={cx} />
)

const cx = {
  maxWidth: 1024
}

export default Container

