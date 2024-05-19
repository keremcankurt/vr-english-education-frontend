import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoleSelectionPage from './pages/roleSelection/RoleSelectionPage';
import StudentLogin from './pages/student/login/Login';
import StudentRegister from './pages/student/register/Register';
import TeacherLogin from './pages/teacher/login/Login';
import TeacherRegister from './pages/teacher/register/Register';
import HomePage from './pages/home/HomePage';
import ContentPage from './pages/home/contentPage/ContentPage';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RoleSelectionPage />} />
        <Route path='/home'>
          <Route index={true} element={<HomePage />}/>
        <Route path="content/:contentName" element={<ContentPage />} />
        </Route>
        <Route path="/student">
          <Route path="login" element={<StudentLogin />} />
          <Route path="register" element={<StudentRegister />} />
        </Route>
        <Route path="/teacher">
          <Route path="login" element={<TeacherLogin />} />
          <Route path="register" element={<TeacherRegister />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
