import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DataSiswa = () => {
  const [siswa, setSiswa] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = siswa
    .filter((item) =>
      item.nama_siswa.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.nama_siswa.localeCompare(b.nama_siswa);
      } else {
        return b.nama_siswa.localeCompare(a.nama_siswa);
      }
    });

  const fetchData = async () => {
    try {
      const responseSiswa = await axios.get(
        "https://e2f-api-production.up.railway.app/api/siswa/fetch-all"
      );
      console.log("res", responseSiswa);
      setSiswa(responseSiswa.data.data);
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
            <label htmlFor="search" className="text-black dark:text-white">
              Cari Nama:
            </label>
            <input
              id="search"
              type="text"
              className="ml-2 px-3 py-1 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button onClick={handleSortChange} className="btn btn-primary">
            Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </button>
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
