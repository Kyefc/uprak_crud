import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AddTransaction from "./pages/AddTransaction";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import TransactionList from "./components/TransactionList";
import FormAddTransaction from "./components/FormAddTransaction";

function App() {
return (
<div>
<BrowserRouter>
<Routes>
<Route path="/" element={<Login />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/users" element={<Users />} />
<Route path="/users/add" element={<AddUser />} />
<Route path="/users/edit/:id" element={<EditUser />} />
<Route path="/products" element={<Products />} />
<Route path="/products/add" element={<AddProduct />} />
<Route path="/products/edit/:id" element={<EditProduct />} />

      {/* Nested Layout for Transactions */}
      <Route path="/transactions" element={<Layout />}>
        <Route index element={<TransactionList />} />
        <Route path="add" element={<FormAddTransaction />} />
      </Route>
    </Routes>
  </BrowserRouter>
</div>
);
}

export default App;