import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MultiSectionForm from "./MultiSectionForm";
import { UserContext } from "../UserContext"; // ✅ Import UserContext

const UpdateClientForm = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userRole } = useContext(UserContext); // ✅ Live role from context

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/auth/clients/${clientId}/`)
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
  if (!initialData) return <div>Client not found.</div>;

  return (
    <MultiSectionForm
      isEditMode={true}
      isCreateMode={false}
      initialData={initialData}
      clientId={clientId}
      userRole={userRole} // ✅ Context-powered role
    />
  );
};

export default UpdateClientForm;