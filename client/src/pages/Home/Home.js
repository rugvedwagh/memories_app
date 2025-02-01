import { Container, Grid, AppBar } from '@mui/material';
import Search from '../../components/Search/Search';
import React, { useState, useEffect } from 'react';
import Posts from '../../components/Posts/Posts';
import { useLocation } from 'react-router-dom';
import Form from '../../components/Form/Form';
import './home.styles.css';

const Home = ({ darkMode }) => {

    const location = useLocation();

    const [currentId, setCurrentId] = useState(null);
    const [formOpen, setformOpen] = useState(false);

    const profile = JSON.parse(localStorage.getItem('profile')) ;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const handleDrop = () => {
        setformOpen(true);
    }

    return (
        <Container maxWidth='xl' style={{ marginTop: '5.5rem' }}>

            <Grid container justify="space-between" alignItems="stretch" spacing={3} className='gridContainer'>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId} darkMode={darkMode} />
                </Grid>

                <Grid id='gridtemp' item xs={12} sm={4} md={3}>

                    <Search darkMode={darkMode} />

                    <AppBar className={`appBarSearch ${darkMode ? 'dark' : ''}`} elevation={6} position='static' >
                        {!formOpen && profile ? (
                            <h4 onClick={handleDrop}>Want to share something?</h4>
                        ) : (
                            <Form className='form' darkMode={darkMode} currentId={currentId} setCurrentId={setCurrentId} setformOpen={setformOpen} />
                        )}
                    </AppBar>
                </Grid>
            </Grid>

        </Container>
    )
}

export default Home;
