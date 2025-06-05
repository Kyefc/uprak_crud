import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/transactions", {
        withCredentials: true,
      });
      setTransactions(response.data);
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  const approveTransaction = async (id) => {
    const confirm = window.confirm("Yakin ingin menyetujui transaksi ini?");
    if (!confirm) return;

    try {
      await axios.patch(
        `http://localhost:5000/transactions/${id}/approve`,
        {},
        { withCredentials: true }
      );
      getTransactions(); // refresh after approval
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
    }
  };

  return (
    <div>
      <h1 className="title">Transactions</h1>
      <p className="has-text-danger has-text-centered">{msg}</p>
      {loading ? (
        <p className="has-text-centered">Loading...</p>
      ) : (
        <div className="table-container">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>User</th>
                {user?.role === "manager" && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx, index) => (
                <tr key={trx.uuid}>
                  <td>{index + 1}</td>
                  <td>{trx.description}</td>
                  <td>{trx.amount}</td>
                  <td>
                    <span
                      className={`tag is-${
                        trx.status === "approved" ? "success" : "warning"
                      }`}
                    >
                      {trx.status}
                    </span>
                  </td>
                  <td>
                    {trx.date
                      ? moment(trx.date).format("YYYY-MM-DD HH:mm")
                      : "-"}
                  </td>
                  <td>{trx.user?.name || "-"}</td>
                  {user?.role === "manager" && (
                    <td>
                      {trx.status === "pending" ? (
                        <button
                          onClick={() => approveTransaction(trx.uuid)}
                          className="button is-small is-success"
                        >
                          Approve
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;