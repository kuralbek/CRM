import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import GridDisplay from "./GridDisplay";
import HeaderDisplay from "./HeaderDisplay";
import {useState} from "react";
import {Button, Dialog} from "@mui/material";
import ModalEmp from "./ModalEmp";
import EditModal from "./EditModal";
import ModalDel from "./ModalDel";
import TaskDisplay from "../tasks/TaskDisplay";
import AllTasks from "../tasks/AllTasks";


const MainDisplay =() => {
    const [id,setId] = useState(null )
    const  [fio,setFio] = useState("1")
    const [openM,setOpenM] = useState(false)
    const [openE,setOpenE] = useState(false)
    const [openD,setOpenD] = useState(false)
    const [openTask,setOpenTask] = useState(false)
    const [openOverTask,setOpenOverTask] = useState(false)
    const [success,setSuccess] = useState(0)
    const [emp,setEmp]=useState({})
    return(
        <>
        <Grid container justifyContent="center" alignItems="center">
            <Grid xs={12}>
                <HeaderDisplay
                    id={id}
                    setFio={setFio}
                    setOpenM={setOpenM}
                    setOpenE={setOpenE}
                    setOpenD={setOpenD}
                    setOpenTask={setOpenTask}
                    setOpenOverTask={setOpenOverTask}
                />
            </Grid>
            <Grid xs={12}>
                <GridDisplay
                    setId={setId}
                    fio={fio}
                    success={success}
                    emp={setEmp}
                />
            </Grid>
        </Grid>
            <Dialog
                maxWidth={"md"}
                open={openM}
            >
                <ModalEmp
                    open={setOpenM}
                    setSuccess={setSuccess}
                />
            </Dialog>
            <Dialog
                maxWidth={"md"}
                open={openE}
            >
                <EditModal
                    id={id}
                    open={setOpenE}
                    setSuccess={setSuccess}
                />
            </Dialog>

            <Dialog
                maxWidth={"md"}
                open={openD}
            >
                <ModalDel
                    id={id}
                    open={setOpenD}
                    setSuccess={setSuccess}
                    setId={setId}
                />
            </Dialog>

            <Dialog
                maxWidth={"lg"}
                open={openTask}
            >
                <TaskDisplay
                    open={setOpenTask}
                    isFinish={setSuccess}
                    emp={emp}
                />
            </Dialog>
            <Dialog
                maxWidth={"lg"}
                fullWidth
                open={openOverTask}
            >
                <AllTasks
                    open={setOpenOverTask}
                />
            </Dialog>
        </>
    )
}

export default MainDisplay
