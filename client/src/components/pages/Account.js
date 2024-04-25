import { AuthData } from "../../auth/AuthProvider"

export const Account = () => {

     const { user } = AuthData();

     return (
          <div className="page">
               <h2>Your Account</h2>
               <p>Username: {user.name}</p>
          </div>
     )
}
