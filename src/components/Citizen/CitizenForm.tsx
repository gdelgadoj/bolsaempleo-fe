import { Button, MenuItem, Select, TextField } from '@mui/material';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useDocumentTypes } from '../../hooks/useDocumentTypes';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Citizen, CitizenPostRequest, useCitizens } from '../../hooks/useCitizens';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

type CitizenFormType = {
  editMode?: boolean;
  citizenToEdit?: Citizen;
  setModal?: Dispatch<SetStateAction<boolean>>;
};
const CitizenForm: FC<CitizenFormType> = ({ editMode, citizenToEdit, setModal }) => {
  const [disableSaveButton, setDisableSaveButton] = useState(false);
  const [documentNumber, setDocumentNumber] = useState<string>(citizenToEdit?.document_number ?? '');
  const [documentTypeID, setDocumentTypeID] = useState<number | undefined>(
    citizenToEdit?.document_type_id ?? undefined
  );
  const [name, setName] = useState<string>(citizenToEdit?.name ?? '');
  const [surname, setSurname] = useState<string>(citizenToEdit?.surname ?? '');
  const [secondSurname, setSecondSurname] = useState<string>(citizenToEdit?.second_surname ?? '');
  const [birthDate, setBirthDate] = useState<Dayjs | null>(
    !!citizenToEdit?.birth_date ? dayjs(citizenToEdit?.birth_date) : null
  );
  const [profession, setProfession] = useState<string>(citizenToEdit?.profession ?? '');
  const [salaryExpectation, setSalaryExpectation] = useState<number | undefined>(
    citizenToEdit?.salary_expectation ?? undefined
  );
  const [email, setEmail] = useState<string>(citizenToEdit?.email ?? '');
  const { documentTypes } = useDocumentTypes();
  const { handleCreateCitizen, handleUpdateCitizen } = useCitizens(setModal);
  const style = {
    width: '100%',
  };

  const handleOnSave = () => {
    const citizenObject: CitizenPostRequest = {
      document_number: documentNumber,
      document_type_id: documentTypeID,
      name: name,
      surname: surname,
      second_surname: secondSurname,
      birth_date: birthDate?.format('YYYY-MM-DD'),
      profession: profession,
      salary_expectation: salaryExpectation,
      email: email,
    };
    handleCreateCitizen(citizenObject);
  };

  const handleOnUpdate = () => {
    console.log(citizenToEdit?.id);
    const citizenObject: Citizen = {
      id: citizenToEdit?.id,
      document_number: documentNumber,
      document_type_id: documentTypeID,
      name: name,
      surname: surname,
      second_surname: secondSurname,
      birth_date: birthDate?.format('YYYY-MM-DD'),
      profession: profession,
      salary_expectation: salaryExpectation,
      email: email,
    };
    handleUpdateCitizen(citizenObject);
  };

  useEffect(() => {
    if (
      !documentNumber ||
      !documentTypeID ||
      !name ||
      !surname ||
      !secondSurname ||
      !birthDate?.isValid() ||
      !birthDate ||
      !profession ||
      !salaryExpectation ||
      !email
    ) {
      setDisableSaveButton(true);
    } else {
      setDisableSaveButton(false);
    }
  }, [birthDate, documentNumber, documentTypeID, email, name, profession, salaryExpectation, secondSurname, surname]);

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid xs={6}>
        <Select
          labelId='document-type'
          id='document-type'
          disabled={editMode}
          value={documentTypeID}
          onChange={(e) => setDocumentTypeID(e.target.value as number)}
          sx={style}
        >
          <MenuItem disabled value=''>
            <em>Tipo de documento</em>
          </MenuItem>
          {documentTypes?.map((documentType: any) => (
            <MenuItem key={documentType.id} value={documentType.id}>
              {documentType.document_type_name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid xs={6}>
        <TextField
          id='document'
          label='Número de Documento'
          disabled={editMode}
          variant='outlined'
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
          sx={style}
        />
      </Grid>
      <Grid xs={6}>
        <TextField
          id='name'
          label='Nombre'
          variant='outlined'
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={style}
        />
      </Grid>
      <Grid xs={6}>
        <TextField
          id='surname'
          label='Primer Apellido'
          variant='outlined'
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          sx={style}
        />
      </Grid>
      <Grid xs={6}>
        <TextField
          id='secondSurname'
          label='Segundo Apellido'
          variant='outlined'
          value={secondSurname}
          onChange={(e) => setSecondSurname(e.target.value)}
          sx={style}
        />
      </Grid>
      <Grid xs={6}>
        <DatePicker
          label='Fecha de Nacimiento'
          value={birthDate}
          onChange={(newValue) => setBirthDate(newValue)}
          sx={style}
        />
      </Grid>
      <Grid xs={6}>
        <TextField
          id='profession'
          label='Profesión'
          variant='outlined'
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          sx={style}
        />
      </Grid>
      <Grid xs={6}>
        <TextField
          id='salaryExpectation'
          label='Expectativa Salarial'
          variant='outlined'
          value={salaryExpectation}
          onChange={(e) => setSalaryExpectation(parseInt(e.target.value))}
          sx={style}
        />
      </Grid>
      <Grid xs={6}>
        <TextField
          id='email'
          label='Correo Electrónico'
          variant='outlined'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={style}
        />
      </Grid>
      <Grid xs={12}>
        <Button disabled={disableSaveButton} sx={style} onClick={editMode ? handleOnUpdate : handleOnSave}>
          {editMode ? 'Editar Ciudadano' : 'Crear ciudadano'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CitizenForm;
