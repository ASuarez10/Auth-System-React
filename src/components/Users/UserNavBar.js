import React from 'react'
import { Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";

const UserNavBar = () =>{

    const navigate = useNavigate();

    return(
        <div>
            <nav>
                Lista de usuarios
                <Button sx={{ marginRight: '10px'}} variant='contained' onClick={ () => navigate("/newUser")}> Nuevo usuario </Button>
                <Button sx={{ marginRight: '10px'}} variant='contained' onClick={ () => navigate("/dashboard")}> Regresar </Button>
            </nav>
        </div>
    )
}

export default UserNavBar