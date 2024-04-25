import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {

     const navigate = useNavigate();
     const [ formData, setFormData ] = useReducer((formData, newItem) => { return ( {...formData, ...newItem} )}, {userName: "", password: ""})
     const [ errorMessage, setErrorMessage ] = useState(null)


     return (
          <div className="page">
               <h2>Login page</h2>
               {/* <div className="inputs"> */}
               {/*      <div className="input"> */}
               {/*           <input value={formData.userName} onChange={(e) => setFormData({userName: e.target.value}) } type="text"/> */}
               {/*      </div> */}
               {/*      <div className="input"> */}
               {/*           <input value={formData.password} onChange={(e) => setFormData({password: e.target.value}) } type="password"/> */}
               {/*      </div> */}
               {/*      <div className="button"> */}
               {/*           <button onClick={doLogin}>Log in</button> */}
               {/*      </div> */}
               {/*      {errorMessage ? */}
               {/*      <div className="error">{errorMessage}</div> */}
               {/*      : null } */}
               {/* </div> */}
          </div>
     )
}
