import {Suspense} from "react";
import Bootstrapper from "./components/organisms/Bootstrapper/Bootstrapper.tsx";
import ErrorBoundary from "./components/molecules/ErrorBoundary/ErrorBoundary.tsx";
import Loading from "./components/atoms/Loading/Loading.tsx";
import {Route, Routes} from "react-router-dom";
import CustomerSelector from "./components/organisms/CustomerSelector/CustomerSelector.tsx";
import MeterSelector from "./components/organisms/MeterSelector/MeterSelector.tsx";
import NotFound from "./components/molecules/NotFound/NotFound.tsx";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary message="Something has gone horribly wrong!">
        <Bootstrapper>
          <Routes>
            <Route path="/" element={<CustomerSelector />}>
              <Route path="customer/:customerId" element={<MeterSelector />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Bootstrapper>
      </ErrorBoundary>
    </Suspense>
  )
}

export default App
