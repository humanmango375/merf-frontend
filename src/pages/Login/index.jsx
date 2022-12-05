import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { authDataSelector, fetchUserAuth } from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authData = useSelector(authDataSelector);

  useEffect(() => {
    if (authData) {
      navigate('/');
    }
  }, [authData]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserAuth(values));
    localStorage.setItem('token', data.payload.token);
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          {...register('email', { required: 'Укажите почту' })}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          className={styles.field}
          {...register('password', { required: 'Укажите пароль' })}
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
          label="Пароль"
          fullWidth
        />
        <Button size="large" disabled={!isValid} type="submit" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
