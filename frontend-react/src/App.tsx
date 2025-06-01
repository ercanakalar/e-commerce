import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Loading from './components/Loading';
import SignUpPage from './pages/auth/SignUp';

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/signup' Component={SignUpPage} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
