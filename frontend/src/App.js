import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';
import Message from './components/layout/Message';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home';
import Profile from './pages/User/Profile';
import MyPets from './pages/Pet/MyPets'
import PetAdd from './pages/Pet/AddPet'
import EditPet from './pages/Pet/EditPet';
import PetDetails from './pages/Pet/PetDetails';
import MyAdoptions from './pages/Pet/MyAdoptions';

// Context
import { UserProvider } from './context/UseContext'

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Message/>
        <Container>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/user/profile' element={<Profile/>} />
            <Route path='/pet/mypets' element={<MyPets/>}/>
            <Route path='/pet/add' element={<PetAdd/>} />
            <Route path='/pet/edit/:id' element={<EditPet/>} />
            <Route path='/pets/:id' element={<PetDetails/>} />
            <Route path='/pet/myadoptions' element={<MyAdoptions/>}/>
            <Route path='/' element={<Home />} />
            
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
