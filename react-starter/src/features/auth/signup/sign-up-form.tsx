import './signUpForm.css';
import { useState } from 'react';

import Container from '../../../components/Container';
import Input from '../../../components/Input';
import Label from '../../../components/Label';

import { useSignUpMutation } from '../../../store/services/authenticationService';

import { SignUpRequest } from '../../../type/libs/auth';

const SignUpForm = (props: any) => {
  const [signUpForm, setSignUpForm] = useState<SignUpRequest>({
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'test@test.example.com.tr',
    password: 'admin1234',
    confirmPassword: 'admin1234',
  });
  const [error, setError] = useState<string>('');
  const [signUp, { data, isLoading, isError, error: signUpError }] = useSignUpMutation();
  console.log({ data, isLoading, isError, signUpError });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignUpForm({ ...signUpForm, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signUpForm.password !== signUpForm.confirmPassword) return setError('Passwords are not matched!');

    if (!signUpForm.email || !signUpForm.password) {
      setError('Both email and password are required.');
      return;
    }

    try {
      await signUp(signUpForm).unwrap();
      setError('');
    } catch (err) {
      console.error('Sign-up failed:', err);
      setError('Sign-up failed. Please try again.');
    }
  };
  return (
    <Container className='signupContainer'>
      <form className='signupForm' onSubmit={handleSubmit}>
        <div className='fillContainer'>
          <div className='inputContainer'>
            <Label label='First Name' htmlFor='firstName' />
            <Input id='firstName' className='signupInput' value={signUpForm.firstName} onChange={handleInputChange} />
          </div>
          <div className='inputContainer'>
            <Label label='Last Name' htmlFor='lastName' />
            <Input id='lastName' className='signupInput' value={signUpForm.lastName} onChange={handleInputChange} />
          </div>
          <div className='inputContainer'>
            <Label label='E-Mail' htmlFor='email' />
            <Input id='email' className='signupInput' value={signUpForm.email} onChange={handleInputChange} />
          </div>
          <div className='inputContainer'>
            <Label label='Password' htmlFor='password' />
            <Input
              id='password'
              className='signupInput'
              type='password'
              value={signUpForm.password}
              onChange={handleInputChange}
            />
          </div>
          <div className='inputContainer'>
            <Label label='Confirm Password' htmlFor='confirmPassword' />
            <Input
              id='confirmPassword'
              className='signupInput'
              type='password'
              value={signUpForm.confirmPassword}
              onChange={handleInputChange}
            />
            <button className='forgot'>Şifremi Unuttum</button>
          </div>
        </div>
        {error && <p className='error'>{error}</p>}
        <button type='submit' className='buttonContainer'>
          {isLoading ? 'Loading...' : 'Giriş Yap'}
        </button>
      </form>
    </Container>
  );
};

export default SignUpForm;
