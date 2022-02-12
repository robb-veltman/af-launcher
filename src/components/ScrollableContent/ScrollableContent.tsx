import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Scrollbars } from 'react-custom-scrollbars'

const useStyles = makeStyles(theme => ({
  trackVertical: {
    width: 2,
    height: '100%',
    background: `linear-gradient(
      0deg,
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,0) 2%,
      ${theme.palette.primary.main} 3%,
      ${theme.palette.primary.main} 97%,
      rgba(0,0,0,0) 98%,
      rgba(0,0,0,0) 100%
    )`,
    margin: '0px 10px 0px auto',
    position: 'relative',
    padding: '15px 0 16px 0',
    '&::after': {
      content: `' '`,
      position: 'absolute',
      width: '4px',
      height: '4px',
      left: '-3px',
      top: '1.5px',
      transform: 'rotate(45deg)',
      border: `2px solid ${theme.palette.primary.light}`,
      backgroundColor: theme.palette.primary.main,
    },
    '&::before': {
      content: `' '`,
      position: 'absolute',
      width: '4px',
      height: '4px',
      left: '-3px',
      bottom: '1.5px',
      transform: 'rotate(45deg)',
      border: `2px solid ${theme.palette.primary.light}`,
      backgroundColor: theme.palette.primary.main,
    },
  },
  thumbVertical: {
    width: 10,
    backgroundColor: theme.palette.primary.light,
    border: `1px solid ${theme.palette.primary.main}`,
    position: 'relative',
    marginLeft: '-4px',
    '&::before': {
      content: `' '`,
      position: 'absolute',
      width: 5,
      height: 5,
      top: '-4px',
      left: '1px',
      backgroundColor: theme.palette.primary.light,
      transform: 'rotate(45deg)',
      borderLeft: `1px solid ${theme.palette.primary.main}`,
      borderTop: `1px solid ${theme.palette.primary.main}`,
    },
    '&::after': {
      content: `' '`,
      position: 'absolute',
      width: 5,
      height: 5,
      bottom: '-4px',
      left: '1px',
      backgroundColor: theme.palette.primary.light,
      transform: 'rotate(45deg)',
      borderRight: `1px solid ${theme.palette.primary.main}`,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
  },
}))

interface ScrollableContentProps {
  height: string
  padding?: string | number,
}
export const ScrollableContent: React.FC<ScrollableContentProps> = ({
  height,
  padding = '0',
  children,
}) => {
  const cl = useStyles()
  return (
    <Scrollbars
      style={{ height, padding }}
      hideTracksWhenNotNeeded
      renderTrackVertical={() => <div className={cl.trackVertical} />}
      renderThumbVertical={() => <div className={cl.thumbVertical} />}
    >
      {children}
    </Scrollbars>
  )
}