import { useFormContext } from 'react-hook-form';
import { LuAsterisk } from 'react-icons/lu';

type Props = {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'password' | 'email';
  required?: boolean;
};

const Input = ({
  id,
  label,
  name,
  placeholder = 'Enter here...',
  type = 'text',
  required = false,
}: Props) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='flex flex-col gap-2 w-full'>
      {/* Label */}
      <div className='flex items-center gap-1'>
        <label
          htmlFor={id}
          className='text-sm font-semibold text-gray-800'
        >
          {label}
        </label>
        {required && <LuAsterisk size={12} className='text-red-600' />}
      </div>

      {/* Input */}
      <input
        id={id}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        value={watch(name)}
        className={`w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 
          bg-gray-50 border shadow-sm 
          focus:outline-none focus:ring-2 transition-all duration-300
          ${
            errors[name]
              ? 'border-red-500 focus:ring-red-400 focus:border-red-500'
              : 'border-gray-300 focus:border-violet-600 focus:ring-violet-500'
          }`}
      />

      {/* Error Message */}
      <p className='text-red-600 text-xs min-h-[18px]'>
        {errors[name as string]?.message as string || ''}
      </p>
    </div>
  );
};

export default Input;
