import Grid from "@mui/material/Unstable_Grid2";
import {Button, TextField} from "@mui/material";
import {useState} from "react";


const HeaderDisplay = ({id,setFio,setOpenM,setOpenE,setOpenD,setOpenTask,setOpenOverTask}) => {
    const [filter,setFilter] = useState()
    const handleClick = (e)=>{
        if (filter)
            setFio(filter)
        else setFio("1")
    }

    function handleAdd() {

        setOpenM(true)
    }
    function handleEdite() {

        setOpenE(true)
    }

    function handleDel() {
        setOpenD(true)
    }

    const handleOpenTasks=()=>{
        setOpenTask(true)
    }

    function handleOverT() {
        setOpenOverTask(true)
    }

    return(
        <Grid container >
            <Grid xs={12} container sx={{marginTop:5}}>
               <Grid xs={4}  spacing={2}>
                   <Button
                       sx={{margin:1}}
                       variant={'contained'}
                       onClick={handleAdd}
                   >Добавить</Button>
                   <Button
                       sx={{margin:1}}
                       variant={'contained'}
                       disabled={!id}
                       onClick={handleEdite}

                   >Редактировать</Button>
                   <Button
                       sx={{margin:1}}
                       variant={'contained'}
                       disabled={!id}
                       color={"error"}
                       onClick={handleDel}
                   >Удалить</Button>
               </Grid>
                <Grid  xs={2}>
                    <Button
                        sx={{margin:1}}
                        variant={'contained'}
                        disabled={!id}
                        onClick={handleOpenTasks}
                    >Задачи</Button>
                    <Button
                        sx={{margin:1}}
                        variant={'contained'}
                        onClick={handleOverT}
                    >Отчет</Button>
                </Grid>
                <Grid xs={5} container spacing={2}>
                    <Grid xs={4}>
                        <TextField
                            placeholder={'Пойск по ФИО'}
                            onChange={(e)=> setFilter(e.target.value)}
                        />
                    </Grid>

                    <Grid xs={1}>
                        <Button
                            variant={'contained'}
                            onClick={handleClick}
                            sx={{marginY:1}}
                        >Найти</Button>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    )
}

export default HeaderDisplay
