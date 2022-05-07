import React, { useEffect, useState } from "react";
import {Paper, Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Button} from  '@material-ui/core'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { auth, db, logout, app } from "../../server/firebase";
import { getFirestore, query, collection, getDocs, where, setDoc, doc, deleteDoc } from "firebase/firestore";
import User from "./User";
import UserNavBar from "./UserNavBar";

function UserList() {

    const [userList, setUserList] = useState([])
    const [userEdit, setUserEdit] = useState({})
    const [findByName, setfindByName] = useState([])
    const [findByCampus, setfindByCampus] = useState([])
    const firebaseDb = getFirestore(app)
    const [searchState, setSearchState] = useState(0)
    
    useEffect(() => {

        getUsers(firebaseDb)
        .then( (res) => setUserList(res))

    }, [])

    const throwbackUsers = async (db) => {
        const userCol = collection(db, 'users')
        const userCursor = await getDocs(userCol)
        const userList =  userCursor.docs.map(doc => doc.data())
        setUserList(userList);
        return userList
    }

    const getUsersByName = async (db, uname) => {
        const q = query(collection(db, "users"), where("name", "==", uname));
        const userCursor = await getDocs(q)
        const userList =  userCursor.docs.map(doc => doc.data())
        setUserList(userList);
        return userList
    }

    const getUsersByCampus = async (db, ucampus) => {
        const q = query(collection(db, "users"), where("campus", "==", ucampus));
        const userCursor = await getDocs(q)
        const userList =  userCursor.docs.map(doc => doc.data())
        setUserList(userList);
        return userList
    }

    const getUsers = async (db) => {
        const userCol = collection(db, 'users')
        const userCursor = await getDocs(userCol)
        const userList =  userCursor.docs.map(doc => doc.data())
        return userList
    }

    const delUser = async(user) => {
        await deleteDoc(doc(db, "users", user.id+""))
        .then(() => {
            getUsers(firebaseDb)
            .then( (res) => setUserList(res))
        })
        let users = [...userList]
        let index = users.findIndex( userItem => userItem.id === user.id )
        //    tasks.push(task)
        users.splice(index,1)
        setUserList(users)
    }

    const delUser2 = (user) => {
        deleteDoc(doc(firebaseDb, "users", user.id+""))
        .then(() => {
            getUsers(firebaseDb)
            .then( (res) => setUserList(res))
        })
        let users = [...userList]
        let index = users.findIndex( userItem => userItem.id === user.id )
        //    tasks.push(task)
        users.splice(index,1)
        setUserList(users)
    }

    const editUser = (user) => {
        setUserEdit(user)
    }

    const renderUsers = (userList) => {
        return userList.map(user => <User user={user} key={user.id} delUser={delUser} editCampus={editUser}/>)
    }

    return (
        <div>
            &nbsp;
            <div className="user_page">
            <UserNavBar/>
            </div>
            &nbsp;
            <div className="user_page">
            <input type="text"  placeholder='Buscar por nombre' name='findByName' value={findByName} onChange={(e) => setfindByName(e.target.value)}/>
            <Button variant='contained' id="fbname" onClick={() => getUsersByName(firebaseDb, findByName)} >Buscar</Button>
            
            </div>
            <div className="user_page">
            <input type="text"  placeholder='Buscar por sede' name='findByCampus' value={findByCampus} onChange={(e) => setfindByCampus(e.target.value)}/>
            <Button variant='contained' onClick={() => getUsersByCampus(firebaseDb, findByCampus)}>Buscar</Button>
            </div>

            <div className="user_page">
            <Button variant='contained' onClick={() => throwbackUsers(firebaseDb)} >Reestablecer</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300, maxWidth: 700, m: "auto" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Apellido</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Contraseña</TableCell>
                            <TableCell align="right">Valido_Hasta</TableCell>
                            <TableCell align="right">Sedes</TableCell>
                            <TableCell align="right">Activo</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                </TableHead>
                <TableBody>

                    {renderUsers(userList)}

                </TableBody>
             </Table>
            </TableContainer>
        </div>
    )

}

export default UserList;