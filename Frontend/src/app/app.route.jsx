import { createBrowserRouter } from "react-router";
import Url from "../features/main/pages/Url";

export const appRoutes = createBrowserRouter([
    {
        path : "/",
        element : <div>hello world</div>
    },
    {
        path:"/urlFind",
        element:<Url />
    }
])