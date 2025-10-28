import './App.css';
import FormProduct from './components/FormProduct';
import FormEditProduct from './components/FormEditProduct';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//Layout
import { CssBaseline } from "@mui/material";
import ResponsiveAppBar from './layout/ResponsiveAppBar';
import CarouselBar from './layout/CarouselBar';
import MenuProductBar from './layout/MenuProductBar';

//pages
import Register from './components/pages/auth/Register';
import Login from './components/pages/auth/Login';
import Line from './components/pages/auth/Line';
import Homepage from './components/pages/Homepage';
import Contract from './components/pages/Contract';
import Product from './components/pages/Product';
import Promotion from './components/pages/Promotion';
import Cart from './components/pages/Cart';
import StatusOrder from './components/pages/StatusOrder';
import CoffeePage from './components/pages/CoffeePage';
import MilkCocoaPage from './components/pages/MilkCocoaPage'
import TeaPage from './components/pages/TeaPage'
import CreatedPage from './components/pages/CreatedPage'
import FrappePage from './components/pages/FrappePage';


//admin
import HomepageAdmin from './components/pages/admin/HomepageAdmin';
import ManageUser from './components/pages/admin/ManageUser';
import AcceptOrder from './components/pages/admin/AcceptOrder';



//user
import CollectPoints from './components/pages/user/CollectPoints';
import ProfileUser from './components/pages/ProfileUser';

//routes
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';

//function
import { currentUser } from './functions/auth';
import { useDispatch } from 'react-redux';
import { login } from './store/userSlice';
import Notfound404 from './components/pages/NotFound404';
import { CartProvider } from './functions/CartContext';


//notify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






function App() {
  // JavaScript
  const dispatch = useDispatch()



  const idToken = localStorage.getItem('token')
  console.log('token', idToken)
  currentUser(idToken).then(res => {
    console.log(res)
    dispatch(login({
      email: res.data.email,
      role: res.data.role,
      displayName: res.data.displayName || null,
      ip: res.data.ip || null,
      _id: res.data._id || null,
      orderCount: res.data.orderCount || null,
      token: idToken,
    }))
  }).catch(err => console.log(err))


  return (

    
      <BrowserRouter>
      <CartProvider>
        <>
          <CssBaseline />
          <ToastContainer />

          {/* Publish */}

          <Routes>
            <Route path='*' element={<Notfound404 text='The page you’re looking for doesn’t exist.' />} />?

            <Route path='/' element={
              <>
                <ResponsiveAppBar />
                <CarouselBar />
                <Homepage />

              </>
            } />

            <Route path='/contract' element={
              <>
                <ResponsiveAppBar />
                <Contract />
              </>
            } />

            <Route path='/product' element={
              <>
                <ResponsiveAppBar />
                <MenuProductBar />
                <Product />
              </>
            } />

            <Route path='/product/coffee' element={
              <>
                <ResponsiveAppBar />
                <MenuProductBar />
                <CoffeePage />
              </>
            } />

            <Route path='/product/milk-cocao' element={
              <>
                <ResponsiveAppBar />
                <MenuProductBar />
                <MilkCocoaPage />
              </>
            } />

            <Route path='/product/tea' element={
              <>
                <ResponsiveAppBar />
                <MenuProductBar />
                <TeaPage />
              </>
            } />

            <Route path='/product/frappe' element={
              <>
                <ResponsiveAppBar />
                <MenuProductBar />
                <FrappePage />
              </>
            } />

            <Route path='/product/created' element={
              <>
                <ResponsiveAppBar />
                <MenuProductBar />
                <CreatedPage />
              </>
            } />

            <Route path='/promotion' element={
              <>
                <ResponsiveAppBar />
                <Promotion />
              </>
            } />

            <Route path='/cart' element={
              <>
                <ResponsiveAppBar />
                <Cart />
              </>
            } />
            
            <Route path='/StatusOrder' element={
              <>
                <ResponsiveAppBar />
                <StatusOrder authtoken={idToken} />
              </>
            } />




            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/line' element={<Line />} />



            {/* User */}
            <Route path='/user/collect-points' element={
              <UserRoutes>
                <CollectPoints />
              </UserRoutes>
            } />

            <Route path='/user/profile-user' element={
              <UserRoutes>
                <ProfileUser />
              </UserRoutes>
            } />



            {/* Admin */}
            <Route path='/admin/index' element={
              <AdminRoutes>
                <HomepageAdmin />
              </AdminRoutes>
            }

            />
            <Route path='/admin/accept-order' element={
              <AdminRoutes>
                <AcceptOrder />
              </AdminRoutes>
            }

            />

            <Route path='/admin/manage' element={
              <AdminRoutes>
                <ManageUser />
              </AdminRoutes>
            }
            />

            <Route path='/admin/viewtable' element={
              <AdminRoutes>
                <FormProduct />
              </AdminRoutes>
            }
            />

            <Route path='/edit/:id' element={
              <AdminRoutes>
                <FormEditProduct />
              </AdminRoutes>
            } />



          </Routes>


        </>
        </CartProvider>
      </BrowserRouter>
    
  );
}

export default App;
