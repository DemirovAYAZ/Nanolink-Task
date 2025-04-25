import './App.css'
import Intro from './components/Intro/Intro'
import Tabs from './components/Tabs/Tabs'

function App() {

  //Note! When you reduce the width of the desktop screen, you can scroll the tabs with the arrows

  return (
    <div className='container'>
      <Intro />
      <Tabs/>
    </div>
  )
}

export default App
