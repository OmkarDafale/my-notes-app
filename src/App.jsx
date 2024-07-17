import { useSelector } from 'react-redux'
import Input from './component/InputForm'
import List from './component/List'
import { Toaster } from 'react-hot-toast'
import './App.css'
import Navbar from './component/Navbar'

function App() {
  const notes = useSelector((state) => state.note.notes)
  return (
    <>
      <Navbar />
      <div className='main-container'>
        <div className='main-div'>
          <Input />
          <List notes={notes} />
        </div>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </div>
    </>
  )
}

export default App
