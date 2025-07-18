import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MultiSectionForm from "./MultiSectionForm"; // Reuse the same form

const UpdateClientForm = ({userRole}) => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/auth/clients/${clientId}/`)
      .then((res) => {
        setInitialData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch client:", err);
        alert("Client not found.");
        navigate("/dashboard");
      });
  }, [clientId]);

  if (loading) return <div>Loading client data...</div>;

  return (
    <MultiSectionForm
      isEditMode={true}
      initialData={initialData}
      clientId={clientId}
      userRole={userRole}           // Added for role-based access
    />
  );
};

export default UpdateClientForm;