import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { history } from './utils'

// 引入路由
import MyRoutes from './routes'
function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Suspense
          fallback={
            <div
              style={{
                textAlign: 'center',
                marginTop: 200
              }}
            >
              loading...
            </div>
          }
        >
          <MyRoutes />
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
