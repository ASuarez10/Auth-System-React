import React, { useState, useEffect } from 'react'
import { TextField, FormControlLabel, Checkbox, Button, TableContainer,Paper } from '@material-ui/core'
import "../../App.css";
import { auth, db, logout, app } from "../../server/firebase";
import { getFirestore, query, collection, getDocs, where, setDoc, doc, deleteDoc, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CampusForm  () {

    const navigate = useNavigate();

    const [campusName, setCampusName] = useState("");
    const [contactName, setcontactName] = useState("");
    const [contactPhone, setcontactPhone] = useState("");
    const [contactEmail, setcontactEmail] = useState("");
    const [city, setcity] = useState("");
    const [address, setaddress] = useState("");
    const [zipcode, setzipcode] = useState("");
    const [active, setactive] = useState(false);

    const addCampus = async( ) => {

        const id = Math.floor(Math.random()*10000)

        try{

            await addDoc(collection(db, "campus"), {

                id: id,
                campusName,
                contactName,
                contactPhone,
                contactEmail,
                city,
                address,
                zipcode,
                active

            });

            navigate('/campusList')



        }catch (err) {
            console.error(err);
            alert(err.message);
            navigate('/campusList')

        }

    };


    return (

        
        
        <div className="login">
            <div className="add__container" margin>
            <h1>Agregar nueva sede</h1>

            <input type="text"  placeholder='Nombre de la sede' name='campusName' value={campusName} onChange={(e) => setCampusName(e.target.value)}/>
            &nbsp;
            <input type="text"  placeholder='Nombre del contacto' name='contactName' value={contactName} onChange={(e) => setcontactName(e.target.value)}/>
            &nbsp;
            <input type="text"  placeholder='Teléfono del contacto' name='contactPhone' value={contactPhone} onChange={(e) => setcontactPhone(e.target.value)}/>
            &nbsp;
            <input type="text"  placeholder='Email del contacto' name='contactEmail' value={contactEmail} onChange={(e) => setcontactEmail(e.target.value)}/>
            &nbsp;
            <input type="text"  placeholder='Ciudad' name='city' value={city} onChange={(e) => setcity(e.target.value)}/>
            &nbsp;
            <input type="text"  placeholder='Dirección' name='address' value={address} onChange={(e) => setaddress(e.target.value)}/>
            &nbsp;
            <input type="text"  placeholder='Zipcode' name='zipcode' value={zipcode} onChange={(e) => setzipcode(e.target.value)}/>
            &nbsp;
            <FormControlLabel control={
                <Checkbox defaultChecked name="active" color="primary" value={active} 
                           onChange={(e) => setactive(e.target.checked)}/>
                } 
                label="Activo" />
            &nbsp;
            <Button variant='contained' onClick={ () => addCampus()}>Agregar</Button>
            <Button sx={{ marginRight: '10px'}} variant='contained' onClick={ () => navigate("/campusList")}> Regresar </Button>

            </div>

        </div>
        
    )

}

export default CampusForm;