import { BrowserRouter } from 'react-router-dom'

// 引入路由
import MyRoutes from './routes'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App
