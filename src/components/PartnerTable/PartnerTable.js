import React, { useSortBy } from 'react';
import * as Element from "./style";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
const PartnerTable = ({user,deletePartner,editPartner}) => {    
    return ( 
        <>
            <Element.Data>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell >index</TableCell>
                            <TableCell>Partner</TableCell>
                            <TableCell align="right">Partner Description</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {user.map((row,index) => (
                                <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {index+1 }
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.username}</TableCell>
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

export default PartnerTable;