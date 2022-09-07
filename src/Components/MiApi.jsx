import React from "react";
import { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';


const MiApi = () => {
  
    //setear los hooks useState
  const [ aves, setAves ] = useState([])
  const [ buscador, setBuscador ] = useState("")
  //función para traer los datos de la API
  const baseUrl = "https://aves.ninjas.cl/api/birds";
  console.log(baseUrl);

  const mostrarData = async () => {
    const response = await fetch(baseUrl)
    const data = await response.json()
   
    //console.log(data)
    setAves(data)
  }


   //buscador
  const BuscadorAves = (e) => { 
    setBuscador(e.target.value);
    //console.log(e.target)
  };


     //metodo de filtrado  
   let resultados = []
   if(!buscador)
   {
       resultados = aves
   }else{
        resultados = aves.filter( (aveFiltro) =>
        aveFiltro.name.spanish.toLowerCase().includes(buscador.toLocaleLowerCase())
    )
   } 
   
     //ordenamiento mediante metodo sort
  
    /*  const ordenamientoAves = (mostrarData) => { 
      ordenamientoAves.sort(mostrarData)

    };   */ 

    useEffect(() => {
  
    mostrarData()
  
    },[]) 
  
  return (
  <>
      <h1>Aves de Chile</h1>
      <div className="input-group">
        <input
          onChange={BuscadorAves}
          value={buscador}
          type="text"
          className="form-control rounded porte-barra"
          placeholder="Búsqueda por nombre"
          aria-label="Search"
          aria-describedby="search-addon"
        />
  
      </div>

      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Nombre Latin</th>
          <th>Imagen</th>
          
        </tr>
      </thead> 
      <tbody>
          {   resultados.map((ave) => ( 
              <tr key={ave.uid}>
                  <td>{ave.name.spanish}</td>
                  <td>{ave.name.latin}</td>
                  <td><img src={ave.images.main} ></img></td>
              </tr>
          ))}  
      </tbody>
      </Table>

     
  </>
  );
};

export default MiApi;
