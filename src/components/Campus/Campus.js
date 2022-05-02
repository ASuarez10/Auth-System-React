import React from 'react';
import {Button, TableCell, TableRow} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Delete, Edit } from '@mui/icons-material';

function Campus ({sede, delCampus, editCampus}){
    return(
        <TableRow>
            <TableCell>{sede.id}</TableCell>
            <TableCell align="right">{sede.campusName}</TableCell>
            <TableCell align="right">{sede.city}</TableCell>
            <TableCell align="right">{sede.active?"yes":"no"}</TableCell>
            <TableCell align="center">
                <Button variant='contained' onClick={ ()=> {delCampus(sede)} }>Borrar</Button>
                <Button variant='contained' onClick={ ()=> {editCampus(sede)} }>Editar</Button>
            </TableCell>
        </TableRow>
    )
}

export default Campus