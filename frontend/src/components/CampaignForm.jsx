import { useState } from "react";
import { createCampaign } from "../api/campaigns";

function CampaignForm({ onCreated }) {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [platform, setPlatform] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await createCampaign({
      name,
      budget: Number(budget),
      platform,
    });

    setName("");
    setBudget("");
    setPlatform("");

    onCreated(); // refresh list
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Campaign name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        placeholder="Budget"
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        required
      />

      <input
        placeholder="Platform"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        required
      />

      <button type="submit">Create Campaign</button>
    </form>
  );
}

export default CampaignForm;

