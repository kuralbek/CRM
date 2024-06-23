import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Unstable_Grid2";
import api from "../../util/api";


const ModalDelTask = ({id,open,setSuccess}) => {

    function handleDel() {
        api({
            method: 'delete',
            url: `/Task/${id}`
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
        <>
            <DialogTitle>Удаление сотрудника</DialogTitle>
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
                    <Typography variant={"h4"}>Потдвердите действия</Typography>
                </Grid>
            </DialogContent>
            <Divider/>
            <DialogActions>
                <Button autoFocus  variant={"contained"} color={"success"} onClick={handleDel}>
                    Подтвердить
                </Button>
            </DialogActions>
        </>
    )
}

export default ModalDelTask
