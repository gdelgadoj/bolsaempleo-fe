import { useQuery } from '@tanstack/react-query';
import { getAllDocumentTypes } from '../components/api/Agent';

const getCurrentDocumentTypeQueryKey = () => ['/vacancy'];

export const useDocumentTypes = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const response = await getAllDocumentTypes();
      if (response.status !== 200) throw new Error('Error fetching vacancies');
      return response.data;
    },
    queryKey: getCurrentDocumentTypeQueryKey(),
    staleTime: 30 * 1000,
  });

  return {
    isError,
    isLoading,
    documentTypes: data,
  };
};
