import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import { LoadingProvider } from "./utils/LoadingContext";
import Landing from "./components/Landing/Landing";
import Layout from "./Layout";
import Post from "./components/Posts/Post";
import Payment from "./components/Payment/Payment";
import Feed from "./components/Feed/Feed";
import Explore from "./components/Explore/Explore";
import Community from "./components/Community/Community";
import NgoSignUp from "./components/Ngo/NgoSignUp";
import NgoSignIn from "./components/Ngo/NgoSignIn";
import VolunteerProfile from "./components/Profile/VolunteerProfile";
import NgoProfile from "./components/Profile/NgoProfile";
import Task from "./components/Task/Task";

const AppContent = () => {
  function Success() {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-green-500">
          Payment Successful!
        </h1>
      </div>
    );
  }

  function Failure() {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Payment Failed!</h1>
      </div>
    );
  }

  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ngo/sign-up" element={<NgoSignUp />} />
        <Route path="/ngo/sign-in" element={<NgoSignIn />} />

        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/payment-success" element={<Success />} />
        <Route path="/payment-failure" element={<Failure />} />

        <Route
          path="/dashboard"
          element={
            localStorage.getItem("access_token") ? (
              <Layout />
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route
            index
            element={
              localStorage.getItem("user_id") ? <Explore /> : <NgoProfile />
            }
          />
          <Route
            path="explore"
            element={
              localStorage.getItem("access_token") ? (
                <Explore />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="volunteer-profile"
            element={
              localStorage.getItem("access_token") ? (
                <VolunteerProfile />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="ngo-profile"
            element={
              localStorage.getItem("access_token") ? (
                <NgoProfile />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="post"
            element={
              localStorage.getItem("access_token") ? (
                <Post />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="feed"
            element={
              localStorage.getItem("access_token") ? (
                <Feed />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="community"
            element={
              localStorage.getItem("access_token") ? (
                <Community />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="assigin-task"
            element={
              localStorage.getItem("access_token") ? (
                <Task />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </BrowserRouter>
  );
}

export default App;
