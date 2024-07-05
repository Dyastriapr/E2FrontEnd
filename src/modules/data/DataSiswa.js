import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DataSiswa = () => {
  const [siswa, setSiswa] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [tahunAjar, setTahunAjar] = useState([]);
  const [filterKelas, setFilterKelas] = useState("Semua");
  const [filterTahunAjar, setFilterTahunAjar] = useState("Semua");

  const handleKelasChange = (e) => {
    setFilterKelas(e.target.value);
  };

  const handleTahunAjarChange = (e) => {
    setFilterTahunAjar(e.target.value);
  };

  const filteredData = siswa.filter((item) => {
    if (filterKelas !== "Semua" && item.kelas?.nama_kelas !== filterKelas) {
      return false;
    }
    if (
      filterTahunAjar !== "Semua" &&
      item.kelas?.tahun_ajar?.tahun_ajar !== filterTahunAjar
    ) {
      return false;
    }
    return true;
  });

  const fetchData = async () => {
    try {
      const responseSiswa = await axios.get(
        "https://e2f-api-production.up.railway.app/api/siswa/fetch-all"
      );
      console.log("res", responseSiswa);
      setSiswa(responseSiswa.data.data);

      const responseKelas = await axios.get(
        "https://e2f-api-production.up.railway.app/api/kelas/fetch-all"
      );
      setKelas(responseKelas.data.data);

      const responseTahunAjar = await axios.get(
        "https://e2f-api-production.up.railway.app/api/tahun-ajar/fetch-all"
      );
      setTahunAjar(responseTahunAjar.data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">DATA SISWA</div>
        <div className="flex space-x-4">
          <div>
            <label htmlFor="filterKelas" className="text-black dark:text-white">
              Filter Kelas:
            </label>
            <select
              id="filterKelas"
              className="ml-2 px-3 py-1 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              value={filterKelas}
              onChange={handleKelasChange}
            >
              <option value="Semua">Semua</option>
              {kelas.map((kelas) => (
                <option key={kelas.id} value={kelas.nama_kelas}>
                  {kelas.nama_kelas}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="filterTahunAjar"
              className="text-black dark:text-white"
            >
              Filter Tahun Ajar:
            </label>
            <select
              id="filterTahunAjar"
              className="ml-2 px-3 py-1 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              value={filterTahunAjar}
              onChange={handleTahunAjarChange}
            >
              <option value="Semua">Semua</option>
              {tahunAjar.map((tahun) => (
                <option key={tahun.id} value={tahun.tahun_ajar}>
                  {tahun.tahun_ajar}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Nama
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Kelas
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Tahun ajar
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {item.nama_siswa}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.kelas?.nama_kelas}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.kelas?.tahun_ajar?.tahun_ajar}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <Link
                          to={`/nilai/${item.id}`}
                          className="btn btn-primary hover:text-primary"
                        >
                          Tabungan
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataSiswa;
