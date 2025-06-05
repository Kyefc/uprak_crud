import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddTransaction = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveTransaction = async (e) => {
    e.preventDefault();
    if (!description || !amount) {
      setMsg("Deskripsi dan jumlah wajib diisi");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/transactions",
        {
          description,
          amount: parseInt(amount),
        },
        { withCredentials: true }
      );
      navigate("/transactions");
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
    }
  };

  return (
    <div>
      <h1 className="title">Tambah Transaksi</h1>
      <p className="has-text-danger has-text-centered">{msg}</p>
      <div className="card">
        <div className="card-content">
          <form onSubmit={saveTransaction}>
            <div className="field">
              <label className="label">Deskripsi</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  required
                  placeholder="Contoh: Pembelian bahan"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Jumlah</label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  required
                  placeholder="Contoh: 200000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button type="submit" className="button is-success">
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddTransaction;