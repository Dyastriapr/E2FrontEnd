import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../modules/authentication/components/Login";
import Dashboard from "../modules/dashboard/Dashboard";
import Kelas from "../modules/datamaster/kelas";
import DefaultLayout from "../layout/DefaultLayouts";
import Semester from "../modules/datamaster/semester";
import Tahunajar from "../modules/datamaster/tahunajar";
import Mapel from "../modules/datamaster/mapel";
import Siswa from "../modules/datamaster/siswa";
import DataSiswa from "../modules/data/DataSiswa";
import Nilai from "../modules/nilai";
import DataGuru from "../modules/data/DataGuru";
import Prestasi from "../modules/prestasi/Prestasi";

function BaseRoute() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for Login page */}
        <Route path="/" element={<Login />} />

        {/* Protected routes inside DefaultLayout */}
        <Route
          path="/dashboard"
          element={
            <DefaultLayout>
              <Dashboard />
            </DefaultLayout>
          }
        />
        <Route
          path="/kelas"
          element={
            <DefaultLayout>
              <Kelas />
            </DefaultLayout>
          }
        />
        <Route
          path="/guru"
          element={
            <DefaultLayout>
              <DataGuru />
            </DefaultLayout>
          }
        />
        <Route
          path="/semester"
          element={
            <DefaultLayout>
              <Semester />
            </DefaultLayout>
          }
        />
        <Route
          path="/tahunajar"
          element={
            <DefaultLayout>
              <Tahunajar />
            </DefaultLayout>
          }
        />
        <Route
          path="/mapel"
          element={
            <DefaultLayout>
              <Mapel />
            </DefaultLayout>
          }
        />
        <Route
          path="/create-siswa"
          element={
            <DefaultLayout>
              <Siswa />
            </DefaultLayout>
          }
        />
        <Route
          path="/siswa"
          element={
            <DefaultLayout>
              <DataSiswa />
            </DefaultLayout>
          }
        />
        <Route
          path="/nilai/:id"
          element={
            <DefaultLayout>
              <Nilai />
            </DefaultLayout>
          }
        />
        <Route
          path="/prestasi"
          element={
            <DefaultLayout>
              <Prestasi />
            </DefaultLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default BaseRoute;
