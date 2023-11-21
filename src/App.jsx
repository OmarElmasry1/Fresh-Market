import React from 'react'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Register/Register';
import { AuthProvider } from './Components/Context/context';
import Profile from './Components/Profile/Profile';
import ProtectedRoute from './Components/Test/Test';
import {QueryClient, QueryClientProvider} from 'react-query';
import ProductItems from './Components/ProductItems/ProductItems';
import { CartContextProvider } from './Components/Context/cartContext';
import { Toaster } from 'react-hot-toast';
import Cart from './Components/Cart/Cart';
import Order from './Components/Orders/Order';
import AllOrders from './Components/AllOrders/AllOrders';


const router = createBrowserRouter([

  {path:'/' ,element:<Layout />, children : [
  
  {index:true, element:
    <ProtectedRoute>
        <Home />
    </ProtectedRoute>
  },
  {path:'home', element: <ProtectedRoute>
  <Home />
</ProtectedRoute>
  },
  {path:'product', element: <ProtectedRoute>
  <Products />
</ProtectedRoute>
  },
  {path:'category', element:
  <ProtectedRoute>
  <Categories />
</ProtectedRoute>
  },

  {path:'productItems/:id', element:
  <ProtectedRoute>
  <ProductItems />
</ProtectedRoute>
  },

  {path:'profile', element:
  <ProtectedRoute>
   <Profile />
  </ProtectedRoute>
  },

  {path:'brand', element:
  <ProtectedRoute>
  <Brands />
  </ProtectedRoute>
  },

  {path:'cart', element:
  <ProtectedRoute>
  <Cart />
  </ProtectedRoute>
  },

  {path:'allorders', element:
  <ProtectedRoute>
   <AllOrders />
  </ProtectedRoute>
  },

  {path:'order', element:
  <ProtectedRoute>
  <Order />
  </ProtectedRoute>
  },

  {path:'login', element:<Login />},
  
  {path:'register', element:<Register />},

  {path:'*', element:
  <ProtectedRoute>
    <NotFound />
  </ProtectedRoute>
  }

  ]}
  ]) 


export default function App() {
  
  let clientQuery = new QueryClient ();
 
  
  return <>



<QueryClientProvider  client={clientQuery}>

  <CartContextProvider>

  <AuthProvider>

<RouterProvider router = {router} />

</AuthProvider>

  </CartContextProvider>

      <Toaster />

</QueryClientProvider>

  
  </>
    

}
