import React from "react";
import { useState, useEffect } from "react";
import {Table} from 'react-bootstrap';

const baseUrl = "https://aves.ninjas.cl/api/birds";
console.log(baseUrl);

const MiApi = () => {
  const [datos, setDatos] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const fetchDatos = async () => {
      let urlFiltro = baseUrl;
      if (filtro !== "") {
        urlFiltro = baseUrl + "?name=" + filtro;
      }

      const response = await fetch(urlFiltro);
      const respDatos = await response.json();
      console.log(respDatos);//veo como llega la informacion
      setDatos(respDatos);
    };

    fetchDatos();
  }, [filtro]);

  const capturaNombrebuscar = (e) => {
    setFiltro(e.target.value);
  };
  console.log(capturaNombrebuscar);
  
  return (
    <>
      <h1>Aves de Chile</h1>
      <input value={filtro} onChange={capturaNombrebuscar}></input>

      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Nombre Latin</th>
          <th>Imagen</th>
          
        </tr>
      </thead> 
      <tbody>
          {datos.map((dato) => ( 
              <tr key={dato.uid}>
                  <td>{dato.name.spanish}</td>
                  <td>{dato.name.latin}</td>
                  <td><img src={dato.images.main} ></img></td>
              </tr>
          ))}  
      </tbody>
    </Table>




     {/*  <ul>
        {datos.map((dato) => (
          <li key={dato.uid}>
            Efemeride:{dato.name.spanish}- Fecha:{dato.name.latin} 
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default MiApi;
