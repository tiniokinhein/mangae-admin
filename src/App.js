import React from 'react'
import { BrowserRouter as Router , Switch , Route , Redirect } from 'react-router-dom'
import DefaultLoading from './components/layout/DefaultLoading'
import { auth } from './config/firebase'
import Dashboard from './pages/Dashboard'
import CreateGCategory from './pages/grocery/CreateGCategory'
import CreateGrocery from './pages/grocery/CreateGrocery'
import EditGCategory from './pages/grocery/EditGCategory'
import EditGrocery from './pages/grocery/EditGrocery'
import GCategories from './pages/grocery/GCategories'
import Groceries from './pages/grocery/Groceries'
import Login from './pages/Login'
import EditGWeight from './pages/grocery/EditGWeight'
import CreateGWeight from './pages/grocery/CreateGWeight'
import GWeight from './pages/grocery/GWeight'


const App = () => {

  const [authenticated,setAuthenticated] = React.useState(false)
  const [loading,setLoading] = React.useState(true)

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setAuthenticated(true)
        setLoading(false)
      } else {
        setAuthenticated(false)
        setLoading(false)
      }
    })
  }, [])

  return loading ? <DefaultLoading /> : (
    <Router>

      <Switch>
        <Route 
          exact
          path="/"
          render={() => <Redirect to="/dashboard" />}
        />
        <Route 
          path="/edit-grocery/:id"
          render={() => authenticated ? <EditGrocery /> : <Redirect to="/login" />}
        />
        <Route 
          path="/g/edit-category/:id"
          render={() => authenticated ? <EditGCategory /> : <Redirect to="/login" />}
        />
        <Route 
          path="/g/edit-weight/:id"
          render={() => authenticated ? <EditGWeight /> : <Redirect to="/login" />}
        />

        <Route 
          path="/login"
          render={() => !authenticated ? <Login /> : <Redirect to="/dashboard" />}
        />
        <Route 
          path="/dashboard"
          render={() => authenticated ? <Dashboard /> : <Redirect to="/login" />}
        />
        <Route 
          path="/groceries"
          render={() => authenticated ? <Groceries /> : <Redirect to="/login" />}
        />
        <Route 
          path="/add-grocery"
          render={() => authenticated ? <CreateGrocery /> : <Redirect to="/login" />}
        />
        <Route 
          path="/g/categories"
          render={() => authenticated ? <GCategories /> : <Redirect to="/login" />}
        />
        <Route 
          path="/g/add-category"
          render={() => authenticated ? <CreateGCategory /> : <Redirect to="/login" />}
        />
        <Route 
          path="/g/weight"
          render={() => authenticated ? <GWeight /> : <Redirect to="/login" />}
        />
        <Route 
          path="/g/add-weight"
          render={() => authenticated ? <CreateGWeight /> : <Redirect to="/login" />}
        />
      </Switch>

    </Router>
  )
}

export default App
