import React from 'react';
import { useState, useEffect } from 'react';

const baseUrl = "https://swapi.dev/api/people/"
console.log(baseUrl)

const MiApi = () => {
    const [datos, setDatos] = useState([]);
    const[filtro,setFiltro]=useState("");

useEffect(() => {
        const fetchDatos = async () => {
            let urlFiltro = baseUrl;

            if (filtro !== "") {
                urlFiltro = baseUrl + "?name=" + filtro;
            }

            const resp = await fetch(urlFiltro);
            const respDatos = await resp.json();
            console.log(respDatos);
            setDatos(respDatos.results);
        }

        fetchDatos();
    }, [filtro])

 const capturaNombrebuscar=(e)=>{
        setFiltro(e.target.value)
 }
 return (
    <>
        <h1>FetchDatos</h1>
        <input value={filtro}
             onChange={capturaNombrebuscar}></input>
        <ul>
            {datos.map((dato) => (
                <li key={dato.name}>{dato.name}- Porte:{dato.height} </li>
            ))}
        </ul>
    </>
)
}
 
export default MiApi;