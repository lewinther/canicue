import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import type { AnyUser } from 'Models/User';
import { useUserStore } from 'Stores/UserStore';

import LogInPage from './Components/Pages/LogInPage';
import NotFoundPage from 'Components/Pages/NotFoundPage';
import BehavioristDashboard from './Components/Pages/BehavioristDashboard';
import ClientDashboard from 'Components/Pages/ClientDashboard';
import ClientPlansOverview from 'Components/Pages/ClientPlansOverview';
import BehavioristClientOverview from 'Components/Pages/BehavioristClientOverview';
import AuthenticatedLayout from 'Layout/AuthenticatedLayout';

function App() {
  const userStore = useUserStore()
  const navigate = useNavigate();

  useEffect(() =>{
    if(!userStore.user){
      navigate('/', { replace: true });
    }
  }, [userStore.user, navigate])

  function LogUserIn( value: AnyUser | undefined) {
    if (!value) return;
    userStore.setUser(value)
  }

  return (
    <Routes>
      {!userStore.user && 
        <>
          <Route path='*' element={<LogInPage onLogin={LogUserIn}/>}/>
        </> 
      }

      {userStore.user && userStore.getRole() === 'Client' && (
        <>
          <Route element={<AuthenticatedLayout />}>
            <Route
              path={`/${userStore.user.name}-dashboard`}
              element={
                <ClientDashboard  />
              }
            />
            <Route
              path={`/${userStore.user.name}-plans-overview`}
              element={
                <ClientPlansOverview />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route
            path='/'
            element={<Navigate to={`/${userStore.user.name}-dashboard`} replace/>}
          />
        </>
      )}

      {userStore.user && userStore.getRole() === 'Behaviorist' && (
        <>
          <Route element={<AuthenticatedLayout />}>
            <Route
              path={`/${userStore.user.name}-dashboard`}
              element={
                <BehavioristDashboard />
              }
            />
            <Route
              path={`/${userStore.user.name}-clients-overview`}
              element={
                <BehavioristClientOverview />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route
            path='/'
            element={<Navigate to={`/${userStore.user.name}-dashboard`} replace/>}
          />
        </>
      )}
    </Routes>
  )
}

export default App;
