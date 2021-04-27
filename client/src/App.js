import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// styles
import { Container } from 'react-bootstrap'
// components
import { Home, ChatRoom } from 'components'


const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/:roomId', name: 'ChatRoom', Component: ChatRoom }
]

export const App = () => (
  <Router>
    <Container>
      <Switch>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} exact>
            <Component />
          </Route>
        ))}
      </Switch>
    </Container>
  </Router>
)
