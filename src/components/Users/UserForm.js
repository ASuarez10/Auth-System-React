import React, { useState, useEffect } from 'react'
import { TextField, FormControlLabel, Checkbox, Button, TableContainer,Paper } from '@material-ui/core'
import "../../App.css";
import { auth, db, logout, app } from "../../server/firebase";
import { getFirestore, query, collection, getDocs, where, setDoc, doc, deleteDoc, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function UserForm  () {

    const navigate = useNavigate();

    const [name, setname] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [valid, setvalid] = useState("");
    const [campus, setcampus] = useState("");
    const [active, setactive] = useState(false);


    const addUser = async() => {

        const id = Math.floor(Math.random()*10000)

        try{

            await addDoc(collection(db, "users"), {

                id: id,
                name,
                lastName,
                email,
                password,
                valid,
                campus,
                active

            });

            navigate('/userList')



        }catch (err) {
            console.error(err);
            alert(err.message);
            navigate('/userList')

        }

    };


    return(

        <div className="login">
            <div className="add__container" margin>
            <h1>Agregar nuevo usuario</h1>

            <input type="text"  placeholder='Nombre del usuario' name='name' value={name} onChange={(e) => setname(e.target.value)}/>
            &nbsp;
            <input type="text"  placeholder='Apellido del usuario' name='lastName' value={lastName} onChange={(e) => setlastName(e.target.value)}/>
            &nbsp;
            <input type="email"  placeholder='Email del usuario' name='email' value={email} onChange={(e) => setemail(e.target.value)}/>
            &nbsp;
            <input type="text"  placeholder='Contraseña del usuario' name='password' value={password} onChange={(e) => setpassword(e.target.value)}/>
            &nbsp;
            <input type="text"  placeholder='Valido hasta' name='valid' value={valid} onChange={(e) => setvalid(e.target.value)}/>
            &nbsp;
            <input type="text"  placeholder='Sede' name='campus' value={campus} onChange={(e) => setcampus(e.target.value)}/>
            &nbsp;
            <FormControlLabel control={
                <Checkbox defaultChecked name="active" color="primary" value={active} 
                           onChange={(e) => setactive(e.target.checked)}/>
                } 
                label="Activo" />
            &nbsp;
            <Button variant='contained' onClick={ () => addUser()}>Agregar</Button>
            <Button sx={{ marginRight: '10px'}} variant='contained' onClick={ () => navigate("/userList")}> Regresar </Button>

            </div>

        </div>
    )

}

export default UserForm;