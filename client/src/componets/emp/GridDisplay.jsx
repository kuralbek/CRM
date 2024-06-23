import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import React, {useEffect, useMemo, useState} from "react";
import api from "../../util/api";
import { memo } from 'react';
import {useQuery} from "react-query";
import Grid from "@mui/material/Unstable_Grid2";


const GridDisplay = memo( ({fio,setId,success,emp}) => {
    const [data,setData] = useState([])

    useEffect(() => {

        api({
            method: 'get',
            url: `/e?fullName=${fio}`
        }).then(response => {
            setData(response.data)
        })
    }, [fio,success]);


    const columns = [
        {
            field: 'rowNumber',
            headerName: '#',
            flex:1,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1,
        },
        {
            field: 'fullName',
            headerName: 'ФИО',
            flex: 4,
            editable: false,
        },
        {
            field: 'position',
            headerName: 'Должность',
            flex:3,
            editable: false,
        },
        {
            field: 'taskCount',
            headerName: 'Задач',
            type: 'number',
            flex:2,
            editable: false,
        },
        {
            field: 'completionPercentage',
            headerName: 'Выполненно',
            type: 'number',
            flex: 2,
            valueFormatter: (params) => {
                return `${params}%`;
            }
        },
    ];

    function handleEd(e) {
        setId(e.row.id)
        emp(e.row)

    }

    return(
        <Grid container sx={{marginX:5,marginY:1}}>

            <Box sx={{ height: 400, width: '70%'}}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    onCellClick={(e)=> handleEd(e)}
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
    )
})

export default GridDisplay
