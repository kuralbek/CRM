import {useEffect, useState} from "react";
import api from "../util/api";
import Grid from "@mui/material/Unstable_Grid2";
import {Alert, Button, Paper, TextField, Typography} from "@mui/material";


const LoginPage = ({SetAuth})=>{
    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')
    const [error, setError] = useState('');

    function handelLogin() {
        const obj={
            "fullName":login,
            "password":password
        }
        api({
            method: 'post',
            url: `/e/login`,
            data: obj
        }).then(response => {
            SetAuth(true)
            localStorage.setItem('auth', true);
        }).catch(error =>{
            if (error.response) {
                console.log('Error Response')
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                if (error.response.status === 401){
                    setError("Неверное имя пользователя или пароль")
                }
            } else if (error.request) {

                console.log('Error Request: ',error.request);
            } else {
                console.log('Else Error')
                //console.log('Error', error.message);
            }

        })
    }

    return(

        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid xs={12} sm={8} md={5}>
                <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Войти
                    </Typography>
                    {error && (
                        <Alert severity="error" style={{ marginBottom: '20px' }}>
                            {error}
                        </Alert>
                    )}
                        <TextField
                            label="Логин (ФИО)"
                            placeholder="Введите имя пользователя"
                            fullWidth

                            value={login}
                            onChange={(e)=>setLogin(e.target.value)}
                            required
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            placeholder="Введите пароль"
                            fullWidth
                            margin="normal"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: '20px' }}
                            onClick={handelLogin}
                        >
                            Войти
                        </Button>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default LoginPage
