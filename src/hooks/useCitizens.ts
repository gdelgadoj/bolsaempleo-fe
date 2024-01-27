import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  assignVacancyToCitizen,
  createCitizen,
  deleteCitizen,
  getAllCitizens,
  updateCitizen,
} from '../components/api/Agent';
import Swal from 'sweetalert2';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from 'react';

const getCurrentCitizenQueryKey = () => ['/citizen'];

export type CitizenPostRequest = {
  document_number?: string | undefined;
  document_type_id?: number | undefined;
  name?: string | undefined;
  surname?: string | undefined;
  second_surname?: string | undefined;
  birth_date?: string | undefined;
  profession?: string | undefined;
  salary_expectation?: number | undefined;
  email?: string | undefined;
};

export type Citizen = {
  id?: string;
  documentNumber?: string;
  documentTypeID?: number;
  surname?: string;
  secondSurname?: string;
  birthDate?: Dayjs;
  salaryExpectation?: number;
  vacancyID?: number;
} & CitizenPostRequest;

export const useCitizens = (setModal?: Dispatch<SetStateAction<boolean>>) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const response = await getAllCitizens();
      if (response.status !== 200) throw new Error('Error fetching citizens');
      return response.data;
    },
    queryKey: getCurrentCitizenQueryKey(),
    staleTime: 30 * 1000,
  });

  const { mutateAsync: handleCreateCitizen } = useMutation({
    mutationFn: async (payload: CitizenPostRequest) => createCitizen(payload),
    onError: async (error: { response: { data: string } }) => {
      await Swal.fire({
        target: document.getElementById('create-modal'),
        position: 'top-end',
        icon: 'error',
        text: error.response.data,
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    },
    onSuccess: async () => {
      await Swal.fire({
        target: document.getElementById('create-modal'),
        position: 'top-end',
        icon: 'success',
        text: 'Usuario creado',
        showConfirmButton: false,
        timer: 2500,
      });
      queryClient.invalidateQueries({ queryKey: getCurrentCitizenQueryKey() });
      return setModal?.(false);
    },
  });

  const { mutateAsync: handleUpdateCitizen } = useMutation({
    mutationFn: async (payload: Citizen) => updateCitizen(payload),
    onError: async (error: { response: { data: string } }) => {
      return await Swal.fire({
        target: document.getElementById('create-modal'),
        position: 'top-end',
        icon: 'error',
        text: error.response.data,
        showConfirmButton: false,
        timer: 2500,
      });
    },
    onSuccess: async () => {
      await Swal.fire({
        target: document.getElementById('create-modal'),
        position: 'top-end',
        icon: 'success',
        text: 'Usuario actualizado',
        showConfirmButton: false,
        timer: 2500,
      });
      queryClient.invalidateQueries({ queryKey: getCurrentCitizenQueryKey() });
      return setModal?.(false);
    },
  });

  const { mutateAsync: handleDelete } = useMutation({
    mutationFn: async (payload: any) => deleteCitizen(payload),
    onError(error: { response: { data: string } }) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: error.response.data,
        showConfirmButton: false,
        timer: 2500,
      });
    },
    onSuccess: async () => {
      await Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '¡Eliminado!',
        text: 'El ciudadano ha sido elminado',
        showConfirmButton: false,
        timer: 2500,
      });
      return queryClient.invalidateQueries({ queryKey: getCurrentCitizenQueryKey() });
    },
  });

  const { mutateAsync: handleAssignVacancyToCitizen } = useMutation({
    mutationFn: async (payload: any) => assignVacancyToCitizen(payload),
    onError(error: { response: { data: string } }) {
      Swal.fire({
        target: document.getElementById('assign-modal'),
        position: 'top-end',
        icon: 'error',
        text: error.response.data,
        showConfirmButton: false,
        timer: 2500,
      });
    },
    onSuccess: async () => {
      await Swal.fire({
        target: document.getElementById('assign-modal'),
        position: 'top-end',
        icon: 'success',
        title: '¡Asignado!',
        text: 'El ciudadano ha sido asignado exitosamente',
        showConfirmButton: false,
        timer: 2500,
      });
      queryClient.invalidateQueries({ queryKey: getCurrentCitizenQueryKey() });
      return setModal?.(false);
    },
  });

  return {
    isError,
    isLoading,
    citizens: data,
    handleCreateCitizen,
    handleUpdateCitizen,
    handleDelete,
    handleAssignVacancyToCitizen,
  };
};
