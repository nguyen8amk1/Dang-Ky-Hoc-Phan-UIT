import { About } from "../pages/About"
import { Account } from "../pages/Account"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { SelectExcelFile } from "../pages/SelectExcelFile"
import { Private } from "../pages/Private"

export const nav = [
    // { path:     "/",         name: "Home",        element: <Home />,       isMenu: true,     isPrivate: false  },
    // { path:     "/about",    name: "About",       element: <About />,      isMenu: true,     isPrivate: false  },
    // TODO: this is the place to put the new tkb site 
    { path:     "/login",    name: "Login",       element: <Login />,      isMenu: false,    isPrivate: false  },
    { path:     "/select_excel",  name: "Step 1: Select Excel File",     element: <SelectExcelFile />,    isMenu: true,     isPrivate: true  },
    { path:     "/account",  name: "Account",     element: <Account />,    isMenu: true,     isPrivate: true  },
]
