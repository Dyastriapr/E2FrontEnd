import React, { useEffect, useState } from "react";
import axios from "axios";

const Kelas = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [kelas, setKelas] = useState([]);
  const [tahun, setTahun] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [formData, setFormData] = useState({
    nama_kelas: "",
    tingkat: "",
    id_tahunajar: "",
    id_semester: "",
  });

  const openModal = (data = null) => {
    if (data) {
      setEditMode(true);
      setCurrentId(data.id);
      setFormData({
        nama_kelas: data.nama_kelas,
        tingkat: data.tingkat,
        id_tahunajar: data.id_tahunajar,
        id_semester: data.id_semester,
      });
    } else {
      setEditMode(false);
      setCurrentId(null);
      setFormData({
        nama_kelas: "",
        tingkat: "",
        id_tahunajar: "",
        id_semester: "",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://e2f-api-production.up.railway.app/api/kelas/fetch-all"
      );
      setKelas(response.data.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchTahunAjar = async () => {
    try {
      const response = await axios.get(
        "https://e2f-api-production.up.railway.app/api/tahun-ajar/fetch-all"
      );
      setTahun(response.data.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchSemesters = async () => {
    try {
      const response = await axios.get(
        "https://e2f-api-production.up.railway.app/api/semester/fetch-all"
      );
      setSemesters(response.data.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editMode
      ? "https://e2f-api-production.up.railway.app/api/kelas/update"
      : "https://e2f-api-production.up.railway.app/api/kelas/create";
    const method = editMode ? "put" : "post";

    try {
      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      fetchData(); // Refresh data kelas setelah menambah atau mengupdate data
      closeModal();
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await axios.delete(
        "https://e2f-api-production.up.railway.app/api/kelas/delete",
        {
          data: { id },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      fetchData(); // Refresh data kelas setelah menghapus data
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTahunAjar();
    fetchSemesters();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => openModal()} className="btn btn-primary">
          Add Data Kelas
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto mx-auto my-6">
            <div className="relative flex flex-col bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-xl font-semibold">
                  {editMode ? "Update Data Kelas" : "Add Data Kelas"}
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={closeModal}
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Nama Kelas
                    </label>
                    <input
                      type="text"
                      name="nama_kelas"
                      value={formData.nama_kelas}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      placeholder="Masukkan nama kelas"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Tingkat
                    </label>
                    <input
                      type="text"
                      name="tingkat"
                      value={formData.tingkat}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      placeholder="Masukkan tingkat kelas"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Tahun Ajar
                    </label>
                    <select
                      name="id_tahunajar"
                      value={formData.id_tahunajar}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    >
                      <option value="" disabled hidden>
                        Pilih Tahun Ajar
                      </option>
                      {tahun.map((tahunAjar) => (
                        <option key={tahunAjar.id} value={tahunAjar.id}>
                          {tahunAjar.tahun_ajar}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button
                      className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white">
                  No.
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                  Nama Kelas
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Tingkat
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {kelas.map((item, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {key + 1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {item.nama_kelas}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.tingkat}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => openModal(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => deleteData(item.id)}
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
    </div>
  );
};

export default Kelas;
