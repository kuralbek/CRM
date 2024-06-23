import React, {useEffect, useState} from "react";
import api from "../../util/api";
import {DataGrid} from "@mui/x-data-grid";
import {Box} from "@mui/material";


const GridDisplay = ({idE,success,Setid}) => {
    const [data,setData] = useState([])

    useEffect(() => {

        api({
            method: 'get',
            url: `/Task/${idE}`
        }).then(response => {
            setData(response.data)
        })
    }, [success]);

    const columns = [

        {
            field: 'rowNumber',
            headerName: '#',
            width: 50,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1,
        },

        {
            field: 'title',
            headerName: 'Найменование',
            width: 250,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Описание',
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
            width: 130,
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
    ];

    function handleEd(e) {
        Setid(e.row.id)
    }

    return(
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}

                getRowId= {(row) => row.id}
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
    )
}


export default GridDisplay
