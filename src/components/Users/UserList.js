import React, { useEffect, useState } from "react";
import {Paper, Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Button} from  '@material-ui/core'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { auth, db, logout, app } from "../../server/firebase";
import { getFirestore, query, collection, getDocs, where, setDoc, doc, deleteDoc } from "firebase/firestore";

function UserList() {

    const [userList, setUserList] = useState([])
    const [userEdit, setUserEdit] = useState({})
    const firebaseDb = getFirestore(app)
    
    useEffect(() => {

        getUser(firebaseDb)
    .then( (res) => setUserList(res))

    }, [])


}