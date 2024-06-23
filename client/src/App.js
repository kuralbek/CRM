import logo from './logo.svg';
import './App.css';
import {QueryClient, QueryClientProvider} from "react-query";
import MainDisplay from "./componets/emp/MainDisplay";
import {useEffect, useState} from "react";
import LoginPage from "./componets/LoginPage";

function App() {

  const queryClient = new QueryClient();
  const [auth,setAuth] = useState(false)

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('auth') === 'true';
        setAuth(isAuthenticated);
    }, []);

  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            {
                !auth ? (
                    <>
                        <LoginPage
                            SetAuth={setAuth}
                        />
                    </>
                ) : (
                    <>
                        <MainDisplay/>
                    </>
                )
            }

        </QueryClientProvider>
    </div>
  );
}

export default App;
