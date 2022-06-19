import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Element from "./style";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

const theme = createTheme();

const Addpartner = () => {
    const[uname,setName] = useState();
    const[udesc,setDesc] = useState();
    const[udata,setUser] = useState([]);
    // snackbar
    const[snackbarData,setsnackbarData] = useState([]);
    const[snackbaropen, snackbarsetOpen] = useState(false);
    // edit State
    const[btnSubmit,setbtnSubmit] = useState(true);
    const[editIndex,setEditIndex] = useState(true);
    const addNew = () => {
        if(!uname == '' && !udesc == '' && btnSubmit == true) {
            snackbarsetOpen(true);
            setsnackbarData({
                message:"data added",
                varient:"success"
            });
            setUser([...udata,{
                uname:uname,
                udesc:udesc
            }]);   
            setName('');
            setDesc('');
        } else if(!uname == '' && !udesc == '' && btnSubmit == false) {
            let newArr = [...udata];
            newArr[editIndex] = {
                uname:uname,
                udesc:udesc
            }
            setUser(newArr); 
            setbtnSubmit(true);
            setName('');
            setDesc('');
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
        console.log(udata[index]);
        setName(udata[index].uname);
        setDesc(udata[index].udesc);
        setbtnSubmit(false);
        setEditIndex(index);
    }
    const deletePartner = (delindex) => {
        console.log('111111111111',delindex);
        const newArr = udata.filter((currelem,index) => {
            return index !== delindex;
        });
        setUser(newArr); 
    }
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
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
                                    value={uname}
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
                                    value={udesc}
                                    onChange= {(e) => setDesc(e.target.value)}
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
            <Element.Data>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>index</TableCell>
                            <TableCell>Partner</TableCell>
                            <TableCell align="right">Partner Description</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {udata.map((row,index) => (
                                <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {index+1 }
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.uname}
                                </TableCell>
                                <TableCell align="right">{row.udesc}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="edit" >
                                        <IconButton aria-label="edit" size="large" color="secondary" onClick={() => editPartner(index)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete" >
                                        <IconButton aria-label="delete" size="large" color="error"  onClick={() => deletePartner(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Element.Data>
        </>
    );
}

export default Addpartner;