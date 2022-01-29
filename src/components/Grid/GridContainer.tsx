import React from 'react'
import { Container, Grid, GridProps } from '@material-ui/core'

/*
  Wrapping "container" Grids with a <Container> component
  prevents the negative margin bug that is otherwise present
*/

type IProps = Omit<GridProps, 'container'> & {
  className?: string
}

export const GridContainer: React.FC<IProps> = ({
  children,
  className,
  ...rest
}) => (
  <Container maxWidth={false} className={className} {...rest}>
    <Grid container style={{ height: '100%' }}>
      {children}
    </Grid>
  </Container>
)