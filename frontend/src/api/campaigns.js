const API_URL = "https://socialmediabooster.onrender.com";


export async function getCampaigns() {
  const res = await fetch(`${API_URL}/campaigns/`);
  return res.json();
}

export async function createCampaign(data) {
  const res = await fetch(`${API_URL}/campaigns/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateCampaign(id, data) {
  const res = await fetch(`${API_URL}/${editingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Update failed");
  }

  return res.json();
}

export async function deleteCampaign(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Delete failed");
  }
}

