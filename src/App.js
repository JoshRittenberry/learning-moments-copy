import { Route, Routes } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { ApplicationViews } from "./views/ApplicationViews"
import { Authorized } from "./views/Authorized"
import { AllPosts } from "./components/posts/all_posts/AllPosts"
import { useEffect } from "react"

export const App = () => {
  useEffect(() => {
    function handleUnload() {
      localStorage.removeItem('learning_user');
    }

    window.addEventListener("beforeunload", handleUnload);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  )
}