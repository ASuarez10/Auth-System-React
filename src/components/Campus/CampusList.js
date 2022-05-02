import React, { useEffect, useState } from "react";
import {Paper, Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Button} from  '@material-ui/core'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { auth, db, logout, app } from "../../server/firebase";
import { getFirestore, query, collection, getDocs, where, setDoc, doc, deleteDoc } from "firebase/firestore";
import Campus from "./Campus";

import CampusNavBar from './CampusNavBar';

function CampusList() {
  
    const [campusList, setCampusList] = useState([])
    const [campusEdit, setCampusEdit] = useState({})
    const firebaseDb = getFirestore(app)
    
    useEffect(() => {

        getCampus(firebaseDb)
    .then( (res) => setCampusList(res))

    }, [])

    const getCampus = async (db) => {
        const campusCol = collection(db, 'campus')
        const campusCursor = await getDocs(campusCol)
        const campusList =  campusCursor.docs.map(doc => doc.data())
        return campusList
    }

    const addCampus = (sede) => {

        let sedes = [...campusList]

        if (!sede.id){

            sede.id = Math.floor(Math.random()*10000)

            setDoc(doc(firebaseDb, "campus", sede.id+""), sedes)
                .then(() => {
                    getCampus(firebaseDb)
                    .then( (res) => setCampusList(res))
                })
            sedes.push(sede)
            
        }else{

            let index = sedes.findIndex( sedeItem => sedeItem.id === sede.id )
            sedes[index] = sede
            setCampusEdit({})

            setCampusList(sedes)

        }

    }

    const delCampus = (sede) => {
        deleteDoc(doc(firebaseDb, "campus", sede.id+""))
        .then(() => {
            getCampus(firebaseDb)
            .then( (res) => setCampusList(res))
        })
        let sedes = [...campusList]
        let index = sedes.findIndex( campusItem => campusItem.id === sede.id )
        //    tasks.push(task)
        sedes.splice(index,1)
        setCampusList(sedes)
    }

    const editCampus = (sede) => {
        setCampusEdit(sede)
    }

    const renderCampus = () => {
        return campusList.map(sede => <Campus sede={sede} key={sede.id} delCampus={delCampus} editCampus={editCampus}/>)
    }

    return (
        <div>
            Hola
            <CampusNavBar/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300, maxWidth: 700, m: "auto" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Ciudad</TableCell>
                            <TableCell align="right">Activa</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                </TableHead>
                <TableBody>

                    {renderCampus()}

                </TableBody>
             </Table>
            </TableContainer>
        </div>
    )

}
export default CampusList;