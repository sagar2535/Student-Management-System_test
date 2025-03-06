import { api, Tag } from '@/api';
import {
  AddStudent,
  GetStudentDetailProps,
  GetTeachers,
  ReviewStudentStatusRequest,
  StudentData,
  StudentFilter,
  StudentProps,
  StudentPropsWithId
} from '../types';

export const studentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<StudentData, StudentFilter>({
      query: (payload) => ({
        url: `/students/get-students`,
        method: 'POST',
        body: payload
      }),
      providesTags: (result) =>
        result?.students?.map(({ id }) => {
          return { type: Tag.STUDENTS, id };
        }) || [{ type: Tag.STUDENTS }]
    }),
    getStudentDetail: builder.query<GetStudentDetailProps, string | undefined>({
      query: (id) => (id ? `/students/${id}` : `/account/me`),
      providesTags: (result) => (result ? [{ type: Tag.STUDENTS, id: result.id }] : [])
    }),
    reviewStudentStatus: builder.mutation<{ message: string }, ReviewStudentStatusRequest>({
      query: ({ id, status }) => ({
        url: `/students/${id}/status`,
        method: 'POST',
        body: { id, status }
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: Tag.STUDENTS, id }]
    }),
    addStudent: builder.mutation<AddStudent, StudentProps>({
      query: (payload) => ({
        url: `/students/add-student`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [Tag.STUDENTS]
    }),
    updateStudent: builder.mutation<{ message: string }, StudentPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/students/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: Tag.STUDENTS, id }]
    }),
    getTeachers: builder.query<GetTeachers, void>({
      query: () => `/teachers`
    }),
    deleteStudent: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/students/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, id) => [{ type: Tag.STUDENTS, id }]
    })
  })
});

export const {
  useGetStudentsQuery,
  useLazyGetStudentDetailQuery,
  useReviewStudentStatusMutation,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useGetTeachersQuery,
  useDeleteStudentMutation
} = studentApi;
