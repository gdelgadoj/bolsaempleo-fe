import { Box, Button, Modal } from '@mui/material';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import CitizenForm from './CitizenForm';
import { Citizen } from '../../hooks/useCitizens';

type CitizenCreateType = {
  isEditMode?: boolean;
  citizen?: Citizen;
  setCitizenToUpdate?: Dispatch<SetStateAction<Citizen | undefined>>;
  setIsEditMode?: Dispatch<SetStateAction<boolean>>;
  createCitizenModal?: boolean;
  setCreateCitizenModal?: Dispatch<SetStateAction<boolean>>;
};

const CitizenCreate: FC<CitizenCreateType> = ({
  isEditMode = false,
  citizen,
  setCitizenToUpdate,
  setIsEditMode,
  createCitizenModal,
  setCreateCitizenModal,
}) => {
  const handleCreateNewCitizen = () => setCreateCitizenModal?.(true);
  const handleCloseCreateCitizenModal = () => {
    if (isEditMode && !!citizen?.id) {
      setCitizenToUpdate?.(undefined);
      setIsEditMode?.(false);
    }
    setCreateCitizenModal?.(false);
  };

  useEffect(() => {
    if (isEditMode && !!citizen?.id) setCreateCitizenModal?.(true);
  }, [isEditMode, citizen]);
  return (
    <>
      <Button variant='outlined' onClick={handleCreateNewCitizen}>
        Crear Nuevo Ciudadano
      </Button>
      <Modal
        id='create-modal'
        open={!!createCitizenModal}
        onClose={handleCloseCreateCitizenModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid rgba(0,0,0,0.2)',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <CitizenForm editMode={isEditMode} citizenToEdit={citizen} setModal={setCreateCitizenModal} />
        </Box>
      </Modal>
    </>
  );
};

export default CitizenCreate;
