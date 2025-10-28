// src/components/IncidentForm.js
import React, { useEffect, useState } from "react";
import { createIncident, getCategories, getDepartments, updateIncident, getIncidentById } from "../services/incidentService";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const IncidentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [severity, setSeverity] = useState("low");

  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(()=>{
    (async ()=>{
    //   setCategories(await getCategories());
    //   setDepartments(await getDepartments());
      if (id) {
        const inc = await getIncidentById(id);
        if (inc) {
          setTitle(inc.title || "");
          setDescription(inc.description || "");
          setCategoryId(inc.categoryId || "");
          setDepartmentId(inc.departmentId || "");
          setSeverity(inc.severity || "low");
        }
      }
    })()
  },[id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title, description, categoryId, departmentId, severity,
      reporterId: user.uid,
      status: "open"
    };
    if (id) {
      await updateIncident(id, payload);
    } else {
      await createIncident(payload);
    }
    navigate("/incidents");
  };

  return (
    <div className="container">
      <h3>{id ? "Editar incidente" : "Reportar novo incidente"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input required className="form-control" value={title} onChange={e=>setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea required className="form-control" value={description} onChange={e=>setDescription(e.target.value)} />
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Categoria</label>
            <select className="form-select" value={categoryId} onChange={e=>setCategoryId(e.target.value)}>
              <option value="">-- selecione --</option>
              {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label>Departamento</label>
            <select className="form-select" value={departmentId} onChange={e=>setDepartmentId(e.target.value)}>
              <option value="">-- selecione --</option>
              {departments.map(d=> <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label>Severidade</label>
            <select className="form-select" value={severity} onChange={e=>setSeverity(e.target.value)}>
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
              <option value="critical">Crítica</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary">{id ? "Salvar alterações" : "Enviar relato"}</button>
      </form>
    </div>
  );
};

export default IncidentForm;
