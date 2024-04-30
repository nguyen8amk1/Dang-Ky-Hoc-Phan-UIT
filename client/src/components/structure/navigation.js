import { About } from "../pages/About"
import { Account } from "../pages/Account"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import SelectExcel from "../pages/SelectExcel"
import Scheduling from "../pages/Scheduling"
import  Result from "../pages/Result"
import { Private } from "../pages/Private"

export const nav = [
    { path:     "/",         name: "Home",        element: <Home />,       isMenu: true,     isPrivate: false  },
    // { path:     "/about",    name: "About",       element: <About />,      isMenu: true,     isPrivate: false  },
    // TODO: this is the place to put the new tkb site 
    { path:     "/select_excel",  name: "Step 1: Select Excel File",     element: <SelectExcel/>,    isMenu: true,     isPrivate: true  },
    // { path:     "/schedule",      name: "Step 2: Scheduling",     element: <Scheduling />,    isMenu: true,     isPrivate: true  },
    { path:     "/result",        name: "Step 3: Result",     element: <Result />,    isMenu: true,     isPrivate: true  },
    { path:     "/login",         name: "Login",       element: <Login />,      isMenu: false,    isPrivate: false  },
    { path:     "/account",       name: "Account",     element: <Account />,    isMenu: true,     isPrivate: true  },
]
