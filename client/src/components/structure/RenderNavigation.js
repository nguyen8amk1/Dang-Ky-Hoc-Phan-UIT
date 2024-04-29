import { Link, Route, Routes } from "react-router-dom";
import { AuthData } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

import { nav } from "./navigation";


export const RenderRoutes = () => {

    const { user, userIsAuthenticated } = AuthData();

    return (
        <Routes>
            { nav.map((r, i) => {

                if (r.isPrivate && userIsAuthenticated()) {
                    return <Route key={i} path={r.path} element={r.element}/>
                } else if (!r.isPrivate) {
                    return <Route key={i} path={r.path} element={r.element}/>
                } else return false
            })}

        </Routes>
    )
}

export const RenderMenu = () => {
    const navigate = useNavigate();

    const { user, userIsAuthenticated, login, logout } = AuthData();
    console.log("from render menu: ", user);

    const MenuItem = ({r}) => {
        return (
            <div className="menuItem"><Link to={r.path}>{r.name}</Link></div>
        )
    }

    const doLogin = async () => {

        try {
            await login();
            console.log("authenticated user: ", user);
            navigate("/account");
        } catch (error) {
            // setErrorMessage(error)
            console.log(error);
        }

    }
    return (
        <div className="menu">
            { nav.map((r, i) => {

                if (!r.isPrivate && r.isMenu) {
                    return (
                        <MenuItem key={i} r={r}/>
                    )
                } else if (userIsAuthenticated() && r.isMenu) {
                    return (
                        <MenuItem key={i} r={r}/>
                    )
                } else return false
            } )}

            { userIsAuthenticated() ?
                <div className="menuItem"><Link to={'#'} onClick={logout}>Log out</Link></div>
                :
                <div className="menuItem" style={{color:'white'}}onClick={doLogin}>Log in</div> }
        </div>
    )
}
