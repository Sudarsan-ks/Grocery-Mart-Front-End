import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { Cart } from "./components/Cart";
import { Otpverify } from "./components/Otpverify";
import { Resetpass } from "./components/Resetpass";
import { Error } from "./components/Error";
import { Forgotpass } from "./components/Forgotpass";
import { Profile } from "./components/Profile";
import { ProtectedRoute } from "./components/ProctectedRoute";
import { AdminDash } from "./components/AdminDash"
import { UserDash } from "./components/UserDash";
import { Unauthorised } from "./components/Unauthorised";
import { Setting } from "./components/Setting";
import { EditGrocery } from "./components/EditGrocery";
import { Payment } from "./components/Payment";
import { UserOrders } from "./components/UserOrders";
import { AdminOrders } from "./components/AdminOrders";
import { ChangeAddress } from "./components/ChangeAddress";
import { OrderDetails } from "./components/OrderDetails";

function App() {

  return (
    <>
      <div className="grocery-mart">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otpverify" element={<Otpverify />} />
          <Route path="/resetpass" element={<Resetpass />} />
          <Route path="/forgotpass" element={<Forgotpass />} />
          <Route path="/home" element={<ProtectedRoute allowedRole={["admin", "user"]} ><Home /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute allowedRole={["admin", "user"]} ><Cart /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute allowedRole={["admin", "user"]} ><Profile /></ProtectedRoute>} />
          <Route path="/admindash" element={<ProtectedRoute allowedRole={["admin"]} ><AdminDash /></ProtectedRoute>} />
          <Route path="/editgrocery" element={<ProtectedRoute allowedRole={["admin"]} ><EditGrocery /></ProtectedRoute>} />
          <Route path="/userdash" element={<ProtectedRoute allowedRole={["admin", "user"]} ><UserDash /></ProtectedRoute>} />
          <Route path="/setting" element={<ProtectedRoute allowedRole={["admin", "user"]} ><Setting /></ProtectedRoute>} />
          <Route path="/adminorder" element={<ProtectedRoute allowedRole={["admin"]} ><AdminOrders /></ProtectedRoute>} />
          <Route path="/userorder" element={<ProtectedRoute allowedRole={["admin", "user"]} ><UserOrders /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute allowedRole={["admin", "user"]} ><Payment /></ProtectedRoute>} />
          <Route path="/changeaddress" element={<ProtectedRoute allowedRole={["admin", "user"]} ><ChangeAddress /></ProtectedRoute>} />
          <Route path="/orderdetails" element={<ProtectedRoute allowedRole={["admin", "user"]} ><OrderDetails /></ProtectedRoute>} />
          <Route path="/unauthorised" element={<Unauthorised />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </>
  )
}

export default App
