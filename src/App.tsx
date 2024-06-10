import './App.scss'
import { Header, Footer } from './components/index.ts'
import { Layout } from './template/index.ts'
import AllRoutes from './routes/Route.tsx'

function App() {

  return (
    <div className="App">
      <Header />
      <Layout>
        <AllRoutes />
      </Layout>
      <Footer />
    </div>
  )
}

export default App
