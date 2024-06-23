import Grid from "@mui/material/Unstable_Grid2";
import {Button, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {useState} from "react";
import {useQuery} from "react-query";
import api from "../../util/api";


import 'moment/locale/ru';
import moment from "moment";


const EditTask = ({id,setSuccess,open})=> {

    const [title,setTitle] = useState('')
    const [desc,setDesc] = useState('')
    const [dDate,setDDate] = useState(moment())
    const [comp,setComp] = useState('')

    useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            await api({
                method:"get",
                url: `/Task/getTask/${id}`

            }).then(response => {
                setTitle(response.data[0].title)
                setDesc(response.data[0].description)
                const newDto = moment(response.data[0].dueDate)
                setDDate(newDto)
                setComp(response.data[0].completionPercentage)
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
        },
    })

    function handleAdd() {
        const dataObj = {
            "id": id,
            "title": title,
            "description": desc,
            "dueDate": dDate,
            "completionPercentage": comp
        }
        console.log(dataObj)
        api({
            method: 'put',
            url: `/Task/${id}`,
            data:dataObj
        }).then(response => {

            setSuccess(prev => prev +1)
            open(false)
            //setData(response.data)
        }).catch(error => {
            if (error.response) {
                console.log('Error Response')
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {

                console.log('Error Request: ', error.request);
            } else {
                console.log('Else Error')
                //console.log('Error', error.message);
            }
            console.log('kjhkj', error.config);
        })
    }

    return(
        <Grid container xs={12}>
            <Grid xs={12}>
                <DialogTitle>Редактирование задачи</DialogTitle>
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
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label={"Описание"}
                                value={desc}
                                onChange={(e)=>setDesc(e.target.value)}
                            />

                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label={"Процент выполнение"}
                                value={comp}
                                onChange={(e)=>setComp(e.target.value)}
                            />

                        </Grid>
                        <Grid xs={12}>
                            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru" >
                                <DatePicker
                                    label={"Дата завершения"}
                                    value={dDate}
                                    onChange={(newValue)=> setDDate(newValue)}
                                />
                            </LocalizationProvider>

                        </Grid>
                    </Grid>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button autoFocus  variant={"contained"} color={"success"} onClick={handleAdd}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Grid>
        </Grid>
    )
}

export default EditTask
