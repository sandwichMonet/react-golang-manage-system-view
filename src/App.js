import { BrowserRouter } from 'react-router-dom'

import { history } from './utils'

// 引入路由
import MyRoutes from './routes'
function App() {
  return (
    <BrowserRouter history={history}>
      <div className="App">
        <MyRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App
