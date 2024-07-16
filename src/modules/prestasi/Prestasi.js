import axios from "axios";
import React, { useEffect, useState } from "react";
import ModalForm from "./ModalForm";

export default function Prestasi() {
  const [prestasi, setPrestasi] = useState();
  const [siswa, setSiswa] = useState();
  const [modalTambahOpen, setModalTambahOpen] = useState(false);
  const [formData, setFormData] = useState({
    id_siswa: null,
    prestasi: null,
    jenis_prestasi: null,
    tingkat: null,
    sertifikat: null,
  });

  const arrHead = [
    "Nama Siswa",
    "Prestasi",
    "Jenis",
    "Tingkat",
    "Sertifikat",
    "Actions",
  ];

  const closeModal = () => {};

  const fetchData = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/api/prestasi/fetch-all",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setPrestasi(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSiswa = async () => {
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

  const addData = () => {
    const FormData = formData;
    let data = new FormData();
    data.append("id_siswa", "1");
    data.append("prestasi", "Cerdas Cermat");
    data.append("jenis_prestasi", "Akademik");
    data.append("tingkat", "Nasional");
    data.append("sertifikat");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/api/prestasi/create",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchSiswa();
  }, []);

  return (
    <div>
      <div className="mb-3 flex justify-between">
        <div className="text-2xl font-bold">DATA PRESTASI SISWA</div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setModalTambahOpen(true);
          }}
        >
          Add Prestasi Siswa
        </button>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                {arrHead.map((e) => (
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    {e}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prestasi &&
                prestasi.map((item, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {item.Siswa?.nama_siswa}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.prestasi}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.jenis_prestasi}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.tingkat}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white hover:font-bold cursor-pointer">
                        {item.sertifikat}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          // onClick={() => openModal(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="hover:text-primary"
                          // onClick={() => deleteData(item.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalForm
        isOpen={modalTambahOpen}
        title="Tambah Prestasi Siswa"
        content={
          <>
            <form onSubmit={addData}>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Siswa
                  </label>
                  <select
                    className="mt-1 p-2 block bg-white w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                    onChange={(e) => {
                      setFormData({ ...formData, id_siswa: e.target.value });
                    }}
                  >
                    <option value="" disabled selected>
                      Pilih Siswa
                    </option>
                    {siswa &&
                      siswa.map((e) => (
                        <option value={e.id}>{e.nama_siswa}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end pt-6 border-t border-solid rounded-b border-blueGray-200">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={closeModal}
                  style={{ transition: "all .15s ease" }}
                >
                  Close
                </button>
                <button
                  className="bg-primary rounded-lg text-white font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="submit"
                  style={{ transition: "all .15s ease" }}
                >
                  Save Changes
                </button>
                {/* Tombol tambahan bisa ditambahkan di sini */}
              </div>
            </form>
          </>
        }
        onClose={closeModal}
      />
    </div>
  );
}
