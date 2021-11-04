import Slide from '@material-ui/core/Slide'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

interface HideOnScrollProps {
  children: React.ReactElement
}

function HideOnScroll({ children }: HideOnScrollProps): JSX.Element {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default HideOnScroll
