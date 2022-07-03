import React, { useState ,useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Element from "./style";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PartnerTable from '../PartnerTable/PartnerTable';

const theme = createTheme();

const Addpartner = () => {

    // GET initial or local storage Data

    const localData=() => { 
        const data = localStorage.getItem('users');
        if(data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    const[name,setName] = useState('');
    const[username,setUsername] = useState('');
    const[user,setUser] = useState(localData());
    // snackbar
    const[snackbarData,setsnackbarData] = useState([]);
    const[snackbaropen, snackbarsetOpen] = useState(false);
    // edit State
    const[btnSubmit,setbtnSubmit] = useState(true);
    const[editIndex,setEditIndex] = useState(true);

    if(!localStorage.getItem('users')) {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
            setUser(json);
        });
    }


    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(user));
    }, [user]);

    const addNew = () => {
        if(!name == '' && !username == '' && btnSubmit == true) {
            snackbarsetOpen(true);
            setsnackbarData({
                message:"data added",
                varient:"success"
            });
            setUser([...user,{
                username:name,
                name:username
            }]);   
            setName('');
            setUsername('');
        } else if(!name == '' && !username == '' && btnSubmit == false) {
            let newArr = [...user];
            newArr[editIndex] = {
                name:name,
                username:username
            }
            setUser(newArr); 
            setbtnSubmit(true);
            setName('');
            setUsername('');
        } else {
            snackbarsetOpen(true);
            setsnackbarData({
                message:"invalid value",
                varient:"error"
            });
        }
    }
    const removeAll = () => {
        setUser([]);
    }
    // const removeAll = () => {
    //     setUser([]);
    // }
    const editPartner = (index) => {
        console.log(user[index]);
        setName(user[index].name);
        setUsername(user[index].username);
        setbtnSubmit(false);
        setEditIndex(index);
    }
    const deletePartner = (delindex) => {
        console.log('111111111111',delindex);
        const newArr = user.filter((currelem,index) => {
            return index !== delindex;
        });
        setUser(newArr); 
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        snackbarsetOpen(false);
    };
    const action = (
    <React.Fragment>
        <IconButton
        size="small"
        aria-label="close"
        color={snackbarData.varient}
        onClick={handleClose}
        >
        <CloseIcon fontSize="small" />
        </IconButton>
    </React.Fragment>
    );
    return(
        <>
            <Snackbar
                open={snackbaropen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbarData.message}
                action={action}
            ></Snackbar>
            <Element.Form>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                            <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            >
                                <Typography component="h1" variant="h5">
                                    Add Partner
                                </Typography>
                                <Box component="form" noValidate sx={{ mt: 1 }}>
                                    <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="partner Name"
                                    label="partner Name"
                                    name="partner Name"
                                    autoComplete="partner Name"
                                    autoFocus
                                    value={name}
                                    onChange= {(e) => setName(e.target.value)}
                                    />
                                    <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="partner Description"
                                    label="partner Description"
                                    description="partner Description"
                                    autoComplete="partner Description"
                                    autoFocus
                                    value={username}
                                    onChange= {(e) => setUsername(e.target.value)}
                                    />
                                    {
                                        btnSubmit ? 
                                        <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={addNew}
                                        >
                                            Add
                                        </Button> : 
                                        <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        color="secondary"
                                        onClick={addNew}
                                        >
                                            Edit
                                        </Button>
                                    }
                                    <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={removeAll}
                                    >
                                        Remove All
                                    </Button>
                                </Box>
                            </Box>
                    </Container>
                </ThemeProvider>
            </Element.Form>
            <PartnerTable user={user} deletePartner={deletePartner} editPartner={editPartner} />
        </>
    );
}

export default Addpartner;