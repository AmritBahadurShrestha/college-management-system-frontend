import toast from 'react-hot-toast';
import Input from '../common/inputs/input';
import { login } from '../../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/auth.context';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../schema/auth.schema';
import { useLocation, useNavigate } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import type { ILoginData } from '../../types/auth.types';

const LoginForm = () => {

  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigate_to = location.state?.from ?? '/';

  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(LoginSchema),
    mode: 'all',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      toast.success(response?.message ?? 'Login Success');
      setUser(response.data.data);
      navigate(navigate_to, { replace: true });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.message ?? 'Failed Login');
    },
    mutationKey: ['login_mutation']
  });

  const onSubmit = (data: ILoginData) => {
    mutate(data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='flex flex-col'>
            {/* Email Field */}
            <Input
              label='Email'
              id='email'
              name='email'
              placeholder='example@gmail.com'
              required
            />

            {/* Password Field */}
            <Input
              label='Password'
              id='password'
              name='password'
              type='password'
              placeholder='••••••••••••••••••••••'
              required
            />

            {/* Sign In Button */}
            <div className='w-full mt-2'>
              <button
                type='submit'
                disabled={isPending}
                className='cursor-pointer w-full bg-gradient-to-r from-indigo-500 to-blue-600 py-3 rounded-md text-white font-semibold text-lg hover:from-indigo-400 hover:to-blue-500 transition-all duration-300 shadow-md disabled: bg-amber-600 disabled:cursor-not-allowed'
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
