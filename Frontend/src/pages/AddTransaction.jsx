import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddTransaction from "../components/FormAddTransaction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddTransaction = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const { isError } = useSelector((state) => state.auth);

useEffect(() => {
dispatch(getMe());
}, [dispatch]);

useEffect(() => {
if (isError) {
navigate("/");
}
}, [isError, navigate]);

return (
<Layout>
<FormAddTransaction />
</Layout>
);
};

export default AddTransaction;