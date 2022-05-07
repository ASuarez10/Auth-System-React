import React from 'react';
import {Button, TableCell, TableRow} from '@material-ui/core';

function User ({user, delUser, editUser}){


    return(
        <TableRow>
            <TableCell>{user.id}</TableCell>
            <TableCell align="right">{user.name}</TableCell>
            <TableCell align="right">{user.lastName}</TableCell>
            <TableCell align="right">{user.email}</TableCell>
            <TableCell align="right">{user.password}</TableCell>
            <TableCell align="right">{user.valid}</TableCell>
            <TableCell align="right">{user.campus}</TableCell>
            <TableCell align="right">{user.active?"yes":"no"}</TableCell>
            <TableCell align="center">
                <Button variant='contained' onClick={ ()=> {delUser(user)} }>Borrar</Button>
                <Button variant='contained' onClick={ ()=> {editUser(user)} }>Editar</Button>
            </TableCell>
        </TableRow>
    )
}

export default User;