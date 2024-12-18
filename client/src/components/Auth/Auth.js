import { Button, Paper, Grid, Typography, Container, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signin, signup } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import Input from './Input';
import './styles.css';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const { errorMessage } = useSelector((state) => state.authReducer);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(form, navigate));

        } else {
            dispatch(signin(form, navigate));
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <Container component="main" maxWidth="xs">
            <Paper className='paper' elevation={6} style={{ borderRadius: '5px', backgroundColor: 'white' }}>
                <LockOutlinedIcon />
                <Typography className='typography' component="h1" variant="h5" style={{ margin: "16px 0 16px 0", color: 'black' }}>
                    {isSignup ? 'Sign up' : 'Log in'}
                </Typography>
                {errorMessage?.length && <Alert severity="error" style={{ margin: '10px 0' }}>{errorMessage}</Alert>}
                <form className='form' onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth className='submit' variant='contained' style={{ margin: "16px 0", backgroundColor: 'black' }}>
                        {isSignup ? 'Sign Up' : 'Log In'}
                    </Button>
                    <Grid style={{ margin: '16px 0' }} container justify="flex-end">
                        <Grid item>
                            <div onClick={switchMode} style={{ color: '#2f8ddf', cursor: 'pointer' }}>
                                {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign Up"}
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default SignUp;