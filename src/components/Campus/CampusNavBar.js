import React from 'react'
import { Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";

const CampusNavBar = () =>{

    const navigate = useNavigate();

    return(
        <div>
            <nav>
                Lista de sedes
                <Button sx={{ marginRight: '10px'}} variant='contained' onClick={ () => navigate("/newCampus")}> Nueva sede </Button>
                <Button sx={{ marginRight: '10px'}} variant='contained' onClick={ () => navigate("/dashboard")}> Regresar </Button>
            </nav>
        </div>
    )

}

export default CampusNavBar