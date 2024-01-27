import { Autocomplete, Box, Button, Modal, TextField } from '@mui/material';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Citizen, useCitizens } from '../../hooks/useCitizens';
import { Vacancy } from '../../hooks/useVacancies';

type VacancyAssignType = {
  vacancy: Vacancy | undefined;
  assignModal: boolean;
  setAssignModal: Dispatch<SetStateAction<boolean>>;
};

const VacancyAssign: FC<VacancyAssignType> = ({ vacancy, assignModal, setAssignModal }) => {
  const [citizenSelected, setCitizenSelected] = useState<string>('');
  const { citizens, handleAssignVacancyToCitizen } = useCitizens(setAssignModal);
  const handleVacancyAssignModal = () => setAssignModal(false);

  const handleOnSave = () => {
    const [, , id] = citizenSelected.split(' ');
    handleAssignVacancyToCitizen({ id: id, vacancyID: vacancy?.id });
  };

  return (
    <Modal
      id='assign-modal'
      open={assignModal}
      onClose={handleVacancyAssignModal}
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
        <Autocomplete
          id='auto-complete-vacancy-assign'
          options={citizens?.map((citizen: Citizen) => citizen.name + ' ' + citizen.surname + ' ' + citizen.id)}
          value={citizenSelected}
          onChange={(_, value) => {
            setCitizenSelected(value as string);
          }}
          renderInput={(params) => <TextField {...params} label='Busque por nombre' />}
        />
        <Button disabled={!citizenSelected} sx={{ width: '100%' }} onClick={handleOnSave}>
          Asignar al ciudadano
        </Button>
      </Box>
    </Modal>
  );
};

export default VacancyAssign;
