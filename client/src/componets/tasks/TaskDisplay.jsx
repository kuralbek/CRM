import Grid from "@mui/material/Unstable_Grid2";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GridDisplay from "./GridDisplay";
import {useState} from "react";
import ModalTask from "./ModalTask";
import EditTask from "./EditTask";
import ModalDelTask from "./ModalDelTask";


const TaskDisplay = ({open,emp,isFinish})=>{
    const [openE,setOpenE] = useState(false)
    const [openM,setOpenM] = useState(false)
    const [openD,setOpenD] = useState(false)
    const [success,setSuccess] = useState(0)
    const [id,setId] = useState(null)


    function handleAdd() {
        setOpenM(true)
    }

    function handleEdite() {
        setOpenE(true)
    }

    function handleDel() {
        setOpenD(true)
    }

    const handleCancle = ()=>{
        isFinish(prev => prev +1)
        open(false)
    }

    return(
        <>

            <Grid container xs={12}>
                <Grid xs={12}>
                    <DialogTitle>Задачи:{emp.fullName}</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleCancle}
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
                            <Grid xs={12}>
                                <GridDisplay
                                    success={success}
                                    idE={emp.id}
                                    Setid={setId}
                                />
                            </Grid>

                        </Grid>
                    </DialogContent>

                </Grid>
            </Grid>

            <Dialog
                maxWidth={"md"}
                open={openM}
            >
                <ModalTask
                    open={setOpenM}
                    setSuccess={setSuccess}
                    idEmp={emp.id}
                />
            </Dialog>
            <Dialog
                maxWidth={"md"}
                open={openE}
            >
                <EditTask
                    open={setOpenE}
                    setSuccess={setSuccess}
                    id={id}
                />
            </Dialog>
            <Dialog
                maxWidth={"md"}
                open={openD}
            >
                <ModalDelTask
                    open={setOpenD}
                    setSuccess={setSuccess}
                    id={id}
                />
            </Dialog>
            </>
    )

}

export default TaskDisplay
