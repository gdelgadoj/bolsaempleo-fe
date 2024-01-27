import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender, gridClasses } from '@mui/x-data-grid';
import { useAppContext } from '../../contextApi/AppContext';
import { Vacancy, useVacancies } from '../../hooks/useVacancies';
import { Button } from 'primereact/button';
import { IconButton, Typography } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import 'primeicons/primeicons.css';
import { useState } from 'react';
import VacancyAssign from './VacancyAssign';

const VacancyTable = () => {
  const [assignModal, setAssignModal] = useState(false);
  const [vacancyToAssign, setVacancyToAssign] = useState<Vacancy>();
  const { switchingStatusUIFramework } = useAppContext();
  const { vacancies, isError, isLoading } = useVacancies();

  const handleAssignVacancy = (vacancy: Vacancy) => {
    setVacancyToAssign(vacancy);
    setAssignModal(true);
  };

  const actionButton = (grid: any) => {
    return (
      <>
        {switchingStatusUIFramework ? (
          <>
            <Button
              icon='pi pi-user-edit'
              rounded
              text
              aria-label='Edit'
              onClick={() => handleAssignVacancy(grid as Vacancy)}
            />
          </>
        ) : (
          <>
            <IconButton aria-label='update' color='primary' onClick={() => handleAssignVacancy(grid.row)}>
              <ManageAccountsIcon />
            </IconButton>
          </>
        )}
      </>
    );
  };

  const columns: GridColDef[] = [
    { field: 'code', headerName: 'Code', flex: 1, headerAlign: 'center' },
    { field: 'position', headerName: 'Posición', flex: 2, headerAlign: 'center' },
    { field: 'description', headerName: 'Descripción', flex: 3, headerAlign: 'center' },
    { field: 'company', headerName: 'Empresa', flex: 2, headerAlign: 'center' },
    { field: 'salary', headerName: 'Salario', flex: 1, headerAlign: 'center' },
    {
      field: 'actions',
      headerName: 'Acciones',
      headerAlign: 'center',
      renderCell: (vacancy) => actionButton(vacancy),
      align: 'center',
    },
  ];

  return (
    <>
      <VacancyAssign assignModal={assignModal} vacancy={vacancyToAssign} setAssignModal={setAssignModal} />
      {switchingStatusUIFramework ? (
        <DataTable value={vacancies} tableStyle={{ minWidth: '50rem', zIndex: -1 }}>
          <Column field='code' header='Code' />
          <Column field='position' header='Posición' />
          <Column field='description' header='Descripción' />
          <Column field='company' header='Empresa' />
          <Column field='salary' header='Salario' />
          <Column header='Acciones' body={actionButton} />
        </DataTable>
      ) : (
        <DataGrid
          rows={isError || isLoading ? [] : vacancies}
          columns={columns}
          getRowHeight={() => 'auto'}
          slots={{
            noRowsOverlay: () => <Typography>No Rows</Typography>,
          }}
          sx={{
            [`& .${gridClasses.cell}`]: {
              py: 1,
            },
          }}
        ></DataGrid>
      )}
    </>
  );
};

export default VacancyTable;
