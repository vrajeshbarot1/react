import React, {  useState,useEffect,useSortBy } from 'react';
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
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
const PartnerTable = ({user,deletePartner,editPartner}) => {
    const [postperpage, setPostperpage] = useState(4);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(postperpage);
    const [sortedData, setSortedData] = useState(user);
    const pageNumbers = [];
    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    //   };
    
    //   const handleChangeRowsPerPage = event => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    //   };
    // const pageNumbers = [];
    function ascTable() {
        let ascData = sortedData.sort((a, b) => {
            if (a.username < b.username) return -1;
            if (a.username > b.username) return 1;
            return 0
        })
        setSortedData(ascData);
    }
    function descTable() {
        let descData = sortedData.sort((a, b) => {
            if (a.username < b.username) return 1;
            if (a.username > b.username) return -1;
            return 0
        })
        setSortedData(descData);
    }
    for(let i = 1; i<= Math.ceil(user.length / postperpage); i++) {
        pageNumbers.push(i);
    }
    const paginationIndex = (index) => {
        console.log(index);
        setStartIndex(postperpage*(index-1));
        setEndIndex(postperpage*(index-1) + postperpage);
    }
    return ( 
        <>
            <Element.Data>
                <Button variant="outlined" onClick={() => ascTable()}>Asc</Button>
                <Button variant="outlined" onClick={() => descTable()}>desc</Button>
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
                        {sortedData.slice(startIndex,endIndex).map((row,key) => {
                            return (
                                <TableRow
                                key={key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                {startIndex + key + 1}
                                </TableCell>
                                <TableCell>
                                {row.name}
                                </TableCell>
                                <TableCell align="right">{row.username}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="edit" >
                                        <IconButton aria-label="edit" size="large" color="secondary" onClick={() => editPartner(key)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete" >
                                        <IconButton aria-label="delete" size="large" color="error"  onClick={() => deletePartner(key)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        {pageNumbers.map(number => {
                            return (
                                    <Button key={number} onClick={() => paginationIndex(number)}>
                                        {number}
                                    </Button>
                            );
                        })}
                    </ButtonGroup>
            </Element.Data>
        </>
    );
}

export default PartnerTable;