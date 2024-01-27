import { FC, useState } from 'react';
import CitizenTable from './CitizenTable';
import CitizenCreateUpdate from './CitizenCreateUpdate';
import { Box } from '@mui/material';
import { Citizen } from '../../hooks/useCitizens';

const CitizenPage: FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [citizenToUpdate, setCitizenToUpdate] = useState<Citizen>();
  const [createCitizenModal, setCreateCitizenModal] = useState(false);

  return (
    <Box sx={{ marginX: 25, marginTop: 5, display: 'flex', flexDirection: 'column' }}>
      <CitizenCreateUpdate
        isEditMode={isEditMode}
        citizen={citizenToUpdate}
        setCitizenToUpdate={setCitizenToUpdate}
        setIsEditMode={setIsEditMode}
        setCreateCitizenModal={setCreateCitizenModal}
        createCitizenModal={createCitizenModal}
      />
      <CitizenTable
        handleEditModal={setIsEditMode}
        setCitizenToUpdate={setCitizenToUpdate}
        setCreateCitizenModal={setCreateCitizenModal}
      />
    </Box>
  );
};

export default CitizenPage;
