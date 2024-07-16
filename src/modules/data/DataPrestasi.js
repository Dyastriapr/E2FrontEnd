import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const DataPrestasi = () => {
  const [prestasi, setPrestasi] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama_siswa: "",
    prestasi: "",
    tingkat: "",
    sertifikat: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://e2f-api-production.up.railway.app/api/prestasi/fetch-all"
      );
      setPrestasi(response.data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://e2f-api-production.up.railway.app/api/prestasi/delete`,
        {
          data: { id },
        }
      );
      fetchData(); // Refresh data setelah penghapusan
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  const handleOpenModal = () => {
    setIsEditing(false);
    setFormData({
      nama_siswa: "",
      prestasi: "",
      tingkat: "",
      sertifikat: null,
    });
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleEdit = (prestasi) => {
    setIsEditing(true);
    setEditId(prestasi.id);
    setFormData({
      nama_siswa: prestasi.nama_siswa,
      prestasi: prestasi.prestasi,
      tingkat: prestasi.tingkat,
      sertifikat: null,
    });
    setModalIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      if (isEditing) {
        await axios.put(
          `https://e2f-api-production.up.railway.app/api/prestasi/update/${editId}`,
          data
        );
        alert("Data berhasil diperbarui");
      } else {
        await axios.post(
          "https://e2f-api-production.up.railway.app/api/prestasi/create",
          data
        );
        alert("Data berhasil ditambahkan");
      }
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.log("Error submitting data:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">DATA PRESTASI</div>
        <button onClick={handleOpenModal} className="btn btn-primary">
          Tambah Prestasi
        </button>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Nama Siswa
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Prestasi
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Tingkat
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Sertifikat
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {prestasi.map((item, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {item.nama_siswa}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item.prestasi}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.tingkat}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {item.sertifikat ? (
                      <a
                        href={item.sertifikat}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Lihat Sertifikat
                      </a>
                    ) : (
                      <p className="text-black dark:text-white">
                        Tidak ada sertifikat
                      </p>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => handleEdit(item)}
                        className="btn btn-primary hover:text-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-danger hover:text-danger"
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Form Prestasi"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            {isEditing ? "Edit" : "Tambah"} Prestasi
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nama Siswa
              </label>
              <input
                type="text"
                name="nama_siswa"
                value={formData.nama_siswa}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prestasi
              </label>
              <input
                type="text"
                name="prestasi"
                value={formData.prestasi}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tingkat
              </label>
              <input
                type="text"
                name="tingkat"
                value={formData.tingkat}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sertifikat
              </label>
              <input
                type="file"
                name="sertifikat"
                onChange={handleFileChange}
                accept="image/*,application/pdf"
                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="btn btn-secondary"
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default DataPrestasi;
