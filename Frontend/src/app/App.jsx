import "./app.css"
import { RouterProvider } from "react-router";
import { appRoutes } from "./app.route";

function App() {
  return (
    <>
      <RouterProvider router={appRoutes} />
    </>
  )
}

export default App
