import './App.css';
import HomePage from './components/Home/HomePage';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Home/Header';
import CitizenPage from './components/Citizen/CitizenPage';
import VacancyPage from './components/Vacancy/VacancyPage';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path='/ciudadanos' element={<CitizenPage />} />
        <Route path='/vacantes' element={<VacancyPage />} />
      </Routes>
    </>
  );
}

export default App;
