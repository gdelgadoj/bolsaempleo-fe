import { useQuery } from '@tanstack/react-query';
import { getAllVacancies } from '../components/api/Agent';

const getCurrentVacancyQueryKey = () => ['/vacancy'];

export type Vacancy = {
  id?: number;
  code: string;
  position: string;
  description: string;
  company: string;
  salary: number;
};

export const useVacancies = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const response = await getAllVacancies();
      if (response.status !== 200) throw new Error('Error fetching vacancies');
      return response.data;
    },
    queryKey: getCurrentVacancyQueryKey(),
    staleTime: 30 * 1000,
  });

  return {
    isError,
    isLoading,
    vacancies: data,
  };
};
