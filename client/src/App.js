import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PostDetails from '../src/pages/PostDetails/PostDetails';
import { Routes, Route, Navigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotFound from '../src/pages/Notfound/NotFound';
import Userinfo from '../src/pages/Userinfo/Userinfo';
import { toggleTheme } from './actions/theme.actions';
import React, { useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Home from '../src/pages/Home/Home';
import Auth from '../src/pages/Auth/Auth';
import { Button } from '@mui/material';
import './App.css';
import { refreshToken } from './actions/auth.actions'; // Import the refresh token action

const App = () => {
    const dispatch = useDispatch();
    const [showScrollButton, setShowScrollButton] = useState(false);
    const { darkMode } = useSelector((state) => state.themeReducer);

    const profile = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        // Dispatch the refreshToken action if refreshToken exists
        if (profile && profile.refreshToken) {
            dispatch(refreshToken());
        }
    }, [profile, dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const scrollThreshold = 200;

            if (scrollY > scrollThreshold) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleView = () => {
        dispatch(toggleTheme());
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={`root-bg ${darkMode ? 'dark' : ''}`} style={{ overflowX: 'hidden' }}>
            <Button onClick={toggleView} className="toggleButton">
                {darkMode ? <LightModeIcon sx={{ color: 'white' }} /> : <DarkModeIcon sx={{ color: 'black' }} />}
            </Button>

            <Container maxWidth="xl">
                <KeyboardArrowUpIcon
                    className={showScrollButton ? 'scrollup show' : 'scrollup hide'}
                    onClick={scrollToTop}
                />

                <Navbar darkMode={darkMode} />

                <Routes>
                    <Route path="/" element={<Navigate to="/posts" />} />
                    <Route path="/posts/search" element={<Home darkMode={darkMode} />} />
                    <Route path="/posts/:id" element={<PostDetails darkMode={darkMode} />} />
                    <Route path="/posts" element={<Home darkMode={darkMode} />} />
                    <Route path="/auth" element={!profile ? <Auth darkMode={darkMode} /> : <Navigate to="/posts" />} />
                    <Route path="/user/i" element={<Userinfo darkMode={darkMode} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Container>

            <Footer darkMode={darkMode} />
        </div>
    );
};

export default App;
