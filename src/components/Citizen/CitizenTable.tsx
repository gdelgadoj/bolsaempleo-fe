import { Dispatch, FC, SetStateAction } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DataGrid, GridColDef, GridTreeNodeWithRender, GridRenderCellParams } from '@mui/x-data-grid';
import { useAppContext } from '../../contextApi/AppContext';
import { Button } from 'primereact/button';
import { IconButton, Typography } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import 'primeicons/primeicons.css';
import { Citizen, useCitizens } from '../../hooks/useCitizens';
import Swal from 'sweetalert2';

type CitizenTableType = {
  handleEditModal?: Dispatch<SetStateAction<boolean>>;
  setCitizenToUpdate?: Dispatch<SetStateAction<Citizen | undefined>>;
  setCreateCitizenModal?: Dispatch<SetStateAction<boolean>>;
};

const CitizenTable: FC<CitizenTableType> = ({
  handleEditModal,
  setCitizenToUpdate,
  setCreateCitizenModal: setModal,
}) => {
  const { switchingStatusUIFramework } = useAppContext();
  const { citizens, isError, isLoading, handleDelete } = useCitizens(setModal);

  const handleRemoveCitizen = (citizenID: number) => {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Este cambio no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Volver',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(citizenID);
      }
    });
  };
  const handleUpdateCitizen = (citizen: Citizen) => {
    handleEditModal?.(true);
    setCitizenToUpdate?.(citizen);
  };
  const actionButton = (grid: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    return (
      <>
        {switchingStatusUIFramework ? (
          <>
            <Button
              icon='pi pi-user-edit'
              rounded
              text
              aria-label='Edit'
              onClick={() => handleUpdateCitizen(grid as Citizen)}
            />
            <Button
              icon='pi pi-trash'
              rounded
              text
              aria-label='Delete'
              onClick={() => handleRemoveCitizen(grid.id as number)}
            />
          </>
        ) : (
          <>
            <IconButton aria-label='update' color='primary' onClick={() => handleUpdateCitizen(grid.row)}>
              <ManageAccountsIcon />
            </IconButton>
            <IconButton aria-label='delete' color='primary' onClick={() => handleRemoveCitizen(grid.row.id)}>
              <PersonRemoveIcon />
            </IconButton>
          </>
        )}
      </>
    );
  };

  const columns: GridColDef[] = [
    { field: 'document_type_id', headerName: 'Tipo de Documento', flex: 1 },
    { field: 'document_number', headerName: 'Número de Documento', flex: 1 },
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'surname', headerName: 'Apellido', flex: 1 },
    { field: 'second_surname', headerName: 'Segundo Apellido', flex: 1 },
    { field: 'birth_date', headerName: 'Fecha de Nacimiento', flex: 1 },
    { field: 'profession', headerName: 'Profesión', flex: 1 },
    { field: 'salary_expectation', headerName: 'Expectativa Salarial', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'actions', headerName: 'Acciones', renderCell: (citizen) => actionButton(citizen) },
  ];

  return (
    <>
      {switchingStatusUIFramework ? (
        <DataTable value={citizens} tableStyle={{ minWidth: '50rem' }}>
          <Column field='document_type_id' header='Tipo de Documento' />
          <Column field='document_number' header='Número de Documento' />
          <Column field='name' header='Nombre' />
          <Column field='surname' header='Apellido' />
          <Column field='second_surname' header='Segundo Apellido' />
          <Column field='birth_date' header='Fecha de Nacimiento' />
          <Column field='profession' header='Profesión' />
          <Column field='salary_expectation' header='Expectativa Salarial' />
          <Column field='email' header='Email' />
          <Column header='Acciones' body={actionButton} />
        </DataTable>
      ) : (
        <DataGrid
          rows={isError || isLoading ? [] : citizens}
          columns={columns}
          slots={{
            noRowsOverlay: () => <Typography>No Rows</Typography>,
          }}
        ></DataGrid>
      )}
    </>
  );
};

export default CitizenTable;
