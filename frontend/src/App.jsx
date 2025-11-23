import EmployeeDirectory from './components/EmployeeDirectory';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <EmployeeDirectory />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
