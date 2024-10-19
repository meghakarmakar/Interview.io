import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React, { useEffect } from 'react'
import Room from './pages/Room.jsx'
import VideoCall from './pages/VideoCall.jsx'
import Page404 from './pages/Page404.jsx'
import RequireAuth from './utils/RequireAuth.jsx'
import AuthPage from './pages/AuthPage.jsx'
import Profile from './pages/Profile.jsx'
import InterviewQA from './pages/InterviewQA.jsx'
import { Navigate } from 'react-router-dom'
import CallNavbar from './components/CallNavbar.jsx'
import { useStore } from './store/store.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InterviewQuiz from './pages/InterviewQuiz.jsx'


function App() {

  const {user, checkingAuth, getAuth} = useStore();  // checkingAuthi acts as a loading state to make an illusion of a loading effect when the user is being checked
  // // console.log("The authenticated user: ",user);

  useEffect(() => {
    getAuth();  // runs only once when the component mounts
  },[getAuth])  // runs when checkingAuth changes;

  if(checkingAuth) {
    return (
       <div className="flex justify-center items-center bg-black h-screen">
        <h1 className="text-4xl text-white">Loading...</h1>  {/* put a better Loading spinner later!!!*/}
      </div>
    )
  }
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RequireAuth />
    },
    {
      path: "/login",
      element: !user ? <AuthPage /> : <Navigate to="/" />
    },
    {
      path: "/qa",
      element: user ? <InterviewQA /> : <Navigate to="/" />
    },
    {
      path: "/quiz",
      element: user ? <InterviewQuiz /> : <Navigate to="/" />
    },
    {
      path: "/profile",
      element: user ? <Profile /> : <Navigate to="/" />
    },
    {
      path: "/createroom",
      element: <><Room /></>
    },
    {
      path: "/createroom/:id",
      element: <><CallNavbar /><VideoCall /></>
    },
    {
      path: "/*",
      element: <Page404 />
    }
   ])

  return (
    <>
    < ToastContainer 
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition: Bounce
        />
     <RouterProvider router={router} />
    </>
  )
}

export default App
