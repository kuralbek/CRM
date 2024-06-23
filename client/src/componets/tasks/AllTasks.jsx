import {DataGrid} from "@mui/x-data-grid";
import {Box, Button, DialogContent, DialogTitle, Divider, IconButton} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import api from "../../util/api";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Unstable_Grid2";
import { useReactToPrint } from 'react-to-print';

const PrintableTable = React.forwardRef((props, ref) => {
    const { rows, columns } = props;
    return (
        <div ref={ref} style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.field}
                            style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                backgroundColor: '#f2f2f2',
                                textAlign: 'left',
                            }}
                        >{column.headerName}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <tr key={row.id}>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.fullName}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.title}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.startDate}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.dueDate}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.completionPercentage}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.daysOverdue}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
});
const AllTasks = ({open}) => {
    const componentRef = useRef();
    const [data,setData] = useState([])

    useEffect(() => {

        api({
            method: 'get',
            url: `/Task/overdueTasks`
        }).then(response => {

            setData(response.data)
        })
    }, []);

    const columns = [

        {
            field: 'rowNumber',
            headerName: '#',
            width: 50,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1,
        },
        {
            field: 'fullName',
            headerName: 'Сотрудник',
            width: 130,
            editable: true,
        },

        {
            field: 'title',
            headerName: 'Найменование',
            width: 400,
            editable: true,
        },
        {
            field: 'startDate',
            headerName: 'Дата старта',
            type: 'number',
            width: 110,
            editable: false,
        },
        {
            field: 'dueDate',
            headerName: 'Дата завершения',
            type: 'number',
            width: 140,
            editable: false,
        },
        {
            field: 'completionPercentage',
            headerName: 'Процент выполнения',
            type: 'number',
            width: 160,
            valueFormatter: (params) => {
                return `${params}%`;
            }
        },
        {
            field: 'daysOverdue',
            headerName: 'Просроченно дней',
            type: 'number',
            width: 160,
            valueFormatter: (params) => {
                return `${params} дней`;
            }
        },
    ];


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return(
        <>
            <Grid container xs={12}>
                <Grid xs={12}>
            <DialogTitle>Отчет:Просроченные задачи</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={()=> open(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <Divider/>
            <DialogContent>
                <Grid xs={12} sx={{marginBottom:1}}>
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={handlePrint}
                        style={{margin:2}}
                    >Печать</Button>
                </Grid>
                <Grid xs={12}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        getRowId= {(row) => row.id}
                        columns={columns}

                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                    />
                </Box>
                </Grid>
            </DialogContent>
                </Grid>
            </Grid>
            <div style={{ display: 'none' }}>
                <PrintableTable ref={componentRef} rows={data} columns={columns} />
            </div>
        </>

    )
}

export default AllTasks
