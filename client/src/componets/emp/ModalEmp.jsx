import Grid from "@mui/material/Unstable_Grid2";
import {Button, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import api from "../../util/api";
import {useState} from "react";
import {useMutation} from "react-query";

const ModalEmp = ({open,setSuccess}) => {

    const [fio,setFio] = useState('')
    const [pos,setPos] = useState('')
    const [pass,setPass] = useState('')

    function handleAdd() {
        const dataObj = {
            "fullName": fio,
            "position": pos,
            "password": pass
        }
        api({
            method: 'post',
            url: `/e`,
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
                <DialogTitle>Добавление сотрудника</DialogTitle>
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
                                label={"ФИО"}
                                onChange={(e)=>setFio(e.target.value)}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label={"Должность"}
                                onChange={(e)=>setPos(e.target.value)}
                            />

                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label={"Пароль"}
                                type={"password"}
                                onChange={(e)=>setPass(e.target.value)}
                            />
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

export default ModalEmp
