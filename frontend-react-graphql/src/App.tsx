import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Loading from './components/Loading';
import Index from './pages';

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' Component={Index} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
