import Grid from "@mui/material/Unstable_Grid2";
import {Button, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";
import api from "../../util/api";
import {DatePicker} from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import 'moment/locale/ru';
const ModalTask = ({idEmp,open,setSuccess}) => {

    const [title,setTitle] = useState('')
    const [desc,setDesc] = useState('')
    const [dDate,setDDate] = useState('')


    function handleAdd() {
        const dataObj = {
            "title": title,
            "employeeId": idEmp,
            "description": desc,
            "dueDate": dDate.utc().format(),
            "completionPercentage": 0
        }

        api({
            method: 'post',
            url: `/Task`,
            data:dataObj
        }).then(response => {
            setSuccess(prev => prev +1)
            open(false)
            //setData(response.data)
        }).catch(error =>{
            if (error.response) {
                console.log('Error Response')
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {

                console.log('Error Request: ',error.request);
            } else {
                console.log('Else Error')
                //console.log('Error', error.message);
            }
            console.log('kjhkj',error.config);
        })
    }
    return(
        <Grid container xs={12}>
            <Grid xs={12}>
                <DialogTitle>Добавление задачи</DialogTitle>
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
                    <Grid container spacing={2}>

                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label={"Найменование"}
                                onChange={(e)=>setTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label={"Описание"}
                                onChange={(e)=>setDesc(e.target.value)}
                            />

                        </Grid>
                        <Grid xs={12}>
                            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru" >
                                <DatePicker
                                    label={"Дата завершения"}
                                    onChange={(newValue)=> setDDate(newValue)}
                                />
                            </LocalizationProvider>

                        </Grid>
                    </Grid>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button autoFocus  variant={"contained"} color={"success"} onClick={handleAdd}>
                        Добавить
                    </Button>
                </DialogActions>
            </Grid>
        </Grid>
    )
}

export default ModalTask
