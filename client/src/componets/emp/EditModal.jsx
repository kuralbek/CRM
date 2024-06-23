import {useState} from "react";
import {useQuery} from "react-query";
import api from "../../util/api";
import Grid from "@mui/material/Unstable_Grid2";
import {Button, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const EditModal = ({id,setSuccess,open})=> {

    const [fio,setFio] = useState('')
    const [pos,setPos] = useState('')
    const [pass,setPass] = useState('')


    useQuery({
        queryKey: ['dataEmpGet'],
        queryFn: async () => {
            await api({
                method:"get",
                url: `/e/${id}`

            }).then(response => {
                setFio(response.data[0].fullName)
                setPos(response.data[0].position)
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
            "id":id,
            "fullName": fio,
            "position": pos,
            "password": pass
        }
        console.log(dataObj)
        api({
            method: 'put',
            url: `/e/${id}`,
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

    const handleClose = ()=>{
        open(false)
    }

    return(
        <Grid container xs={12}>
            <Grid xs={12}>
                <DialogTitle>Редактирование сотрудника</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
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
                                value={fio}
                                onChange={(e)=>setFio(e.target.value)}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label={"Должность"}
                                value={pos}
                                onChange={(e)=>setPos(e.target.value)}
                            />

                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label={"Пароль"}
                                type={"password"}
                                value={pass}
                                onChange={(e)=>setPass(e.target.value)}
                            />
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

export default EditModal
