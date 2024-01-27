import { FC } from 'react';
import VacancyTable from './VacancyTable';
import { Box } from '@mui/material';

const VacancyPage: FC = () => {
  return (
    <>
      <Box sx={{ marginX: 25, marginTop: 2 }}>
        <VacancyTable />
      </Box>
    </>
  );
};

export default VacancyPage;
