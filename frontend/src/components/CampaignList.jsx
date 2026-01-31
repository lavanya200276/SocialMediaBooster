import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";

const API_URL = "https://socialmediabooster.onrender.com/campaigns";
const CONVERT_URL = "https://socialmediabooster.onrender.com/convert-budget";


export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [platform, setPlatform] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [conversion, setConversion] = useState(null);

  /* ---------------- FETCH ---------------- */
  const fetchCampaigns = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    setCampaigns(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
  }
};



  useEffect(() => {
    fetchCampaigns();
  }, []);

  const showUsdConversion = async (amount) => {
    const res = await fetch(`${CONVERT_URL}?amount=${amount}`);
    const data = await res.json();
    setConversion(data);
    setShowModal(true);
  };
  /* ---------------- CREATE / UPDATE ---------------- */
  const handleCreateOrUpdate = async () => {
    if (!name || !budget || !platform) {
      alert("Fill all fields");
      return;
    }

    const payload = { name, budget: Number(budget), platform };

    if (editingId) {
      await fetch(`${API_URL}${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    fetchCampaigns();
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this campaign?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchCampaigns();
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (c) => {
    setEditingId(c.id);
    setName(c.name);
    setBudget(c.budget);
    setPlatform(c.platform);
  };

  const resetForm = () => {
    setName("");
    setBudget("");
    setPlatform("");
    setEditingId(null);
  };

  return (
    <>
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#0f172a",
        padding: "24px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "32px",
          fontSize: "32px",
          fontWeight: 700,
        }}
      >
        Campaign Management System
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "420px 1fr",
          gap: "24px",
          width: "100%",
          alignItems: "stretch",
        }}
      >
        {/* DASHBOARD */}
        <div
          style={{
            background: "#020617",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
          }}
        >
          <Dashboard campaigns={campaigns} />
        </div>

        {/* CAMPAIGNS */}
        <div
          style={{
            background: "#020617",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 style={{ marginBottom: "16px" }}>📁 Campaigns</h2>

          {/* FORM */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr auto auto",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <input
              placeholder="Campaign Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="">Platform</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>LinkedIn</option>
              <option>Youtube</option>
            </select>

            <button onClick={handleCreateOrUpdate}>
              {editingId ? "Update" : "Create"}
            </button>

            {editingId && (
              <button className="danger" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>

          {/* TABLE */}
          <div style={{ overflowY: "auto", flex: 1 }}>
            <table width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Budget (₹)</th>
                  <th>Platform</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                  {campaigns.map((c) => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>₹{c.budget}</td>
                      <td>{c.platform}</td>
                      <td>
  <div className="action-buttons">
    <button onClick={() => handleEdit(c)}>Edit</button>
    <button onClick={() => showUsdConversion(c.budget)}>USD</button>
    <button className="danger" onClick={() => handleDelete(c.id)}>
      Delete
    </button>
  </div>
</td>

                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

      {showModal && conversion && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#020617",
              padding: "30px",
              borderRadius: "16px",
              width: "360px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            <h2 style={{ marginBottom: "12px" }}>💱 Budget Conversion</h2>

            <p style={{ fontSize: "18px", marginBottom: "8px" }}>
              ₹{conversion.inr}
            </p>

            <p
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#6366f1",
                marginBottom: "20px",
              }}
            >
              ${conversion.usd}
            </p>

            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
