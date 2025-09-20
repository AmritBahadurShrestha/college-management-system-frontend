import toast from 'react-hot-toast';
import Button from '../common/button';
import Input from '../common/inputs/input';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { ClassSchema } from '../../schema/class.schema';
import { postClass, updateClass } from '../../api/class.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IClassData, IClassResponse } from '../../types/class.types';

interface IProps {
    data?: IClassResponse
}

const ClassForm: React.FC<IProps> = ({ data: cclass }) => {

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const methods = useForm({
        defaultValues: {
            name: cclass?.name || '',
            program: cclass?.program || '',
            semester: cclass?.semester || 1,
            students: cclass?.students || [],
            courses: cclass?.courses || [],
            teacher: cclass?.teacher || ''
        },
        resolver: yupResolver(ClassSchema),
        mode: 'all'
    })

    // Add Mutation
    const { mutate, isPending } = useMutation({
        mutationFn: postClass,
        onSuccess: (response) => {
            toast.success(response.message || 'Class Added')
            methods.reset()
        },
        onError: (error) => {
            toast.error(error.message || 'Something went wrong')
        }
    })

    // Update Mutation
    const { mutate: updateMutation, isPending: updating } = useMutation({
        mutationFn: updateClass,
        onSuccess: (response) => {
            toast.success(response.message || 'Class Updated');
            queryClient.invalidateQueries({ queryKey: ['get_class_by_id', cclass?._id] })
            navigate('/cclass')
        },
        onError: (error) => {
            toast.error(error.message || 'Something went wrong')
        }
    })

    const onSubmit = (data: IClassData) => {
        console.log('Class Form', data)
        if (cclass) {
            updateMutation({ ...data, _id: cclass?._id })
        } else {
            mutate(data)
        }
    };

    return (
        <div>
        {/* Hook Form Provider */}
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                <div className='flex flex-col gap-6'>

                    <Input
                        id='name'
                        name='name'
                        label='Class Name'
                        placeholder='Enter class name'
                        required
                    />
                    <Input
                        id='program'
                        name='program'
                        label='Program'
                        placeholder='Enter program'
                        required
                    />
                    <Input
                        id='semester'
                        name='semester'
                        label='Semester'
                        type='number'
                        placeholder='Enter semester'
                        required
                    />
                    {/* Optional fields */}
                    <Input
                        id="teacher"
                        name="teacher"
                        label="Class Teacher"
                        placeholder="Enter teacher name"
                    />

                    {/* Students (array of IDs/names) */}
                    <Input
                        id="students"
                        name="students"
                        label="Students"
                        placeholder="Enter student IDs (comma separated)"
                    />

                    {/* Courses (array of IDs/names) */}
                    <Input
                        id="courses"
                        name="courses"
                        label="Courses"
                        placeholder="Enter course IDs (comma separated)"
                    />

                </div>
                <div>
                    <Button
                        label= {isPending || updating ? 'Submitting...' : 'Submit'}
                        type= 'submit'
                        isPending={isPending || updating}
                    />
                </div>

            </form>
        </FormProvider>

    </div>
    )
}

export default ClassForm;
