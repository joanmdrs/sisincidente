// src/components/IncidentList.js
import React, { useEffect, useState } from "react";
import { getIncidents } from "../services/incidentService";
import { Link } from "react-router-dom";

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(()=>{
    (async ()=>{
      setIncidents(await getIncidents());
    })()
  },[]);

  return (
    <div className="container">
      <h3>Incidentes</h3>
      
      <div className="list-group">
        {incidents.map(i => (
          <Link key={i.id} to={`/incidents/${i.id}`} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{i.title}</h5>
              <small>{new Date(i.createdAt?.seconds ? i.createdAt.seconds * 1000 : Date.now()).toLocaleString()}</small>
            </div>
            <p className="mb-1 text-truncate">{i.description}</p>
            <small>Status: {i.status} • Severidade: {i.severity}</small>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IncidentList;
