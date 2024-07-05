import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const DataGuru = () => {
  const [guru, setGuru] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama_guru: "",
    nip: "",
    mata_pelajaran: "",
    foto: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://e2f-api-production.up.railway.app/api/guru/fetch-all"
      );
      setGuru(response.data.data);
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
        `https://e2f-api-production.up.railway.app/api/guru/delete`,
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
      nama_guru: "",
      nip: "",
      mata_pelajaran: "",
      foto: null,
    });
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleEdit = (guru) => {
    setIsEditing(true);
    setEditId(guru.id);
    setFormData({
      nama_guru: guru.nama_guru,
      nip: guru.nip,
      mata_pelajaran: guru.mata_pelajaran,
      foto: null,
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
          `https://e2f-api-production.up.railway.app/api/guru/update/${editId}`,
          data
        );
        alert("Data berhasil diperbarui");
      } else {
        await axios.post(
          " https://e2f-api-production.up.railway.app/api/guru/create",
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
        <div className="text-2xl font-bold">DATA GURU</div>
        <button onClick={handleOpenModal} className="btn btn-primary">
          Tambah Guru
        </button>
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
                  NIP
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Mata Pelajaran
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Foto
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {guru.map((item, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {item.nama_guru}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.nip}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item.mata_pelajaran}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {item.foto ? (
                      <img
                        src={item.foto}
                        alt={item.nama_guru}
                        className="h-16 w-16 object-cover rounded-full"
                      />
                    ) : (
                      <p className="text-black dark:text-white">
                        Tidak ada foto
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
        contentLabel="Form Guru"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            {isEditing ? "Edit" : "Tambah"} Guru
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nama Guru
              </label>
              <input
                type="text"
                name="nama_guru"
                value={formData.nama_guru}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                NIP
              </label>
              <input
                type="text"
                name="nip"
                value={formData.nip}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mata Pelajaran
              </label>
              <input
                type="text"
                name="mata_pelajaran"
                value={formData.mata_pelajaran}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Foto
              </label>
              <input
                type="file"
                name="foto"
                onChange={handleFileChange}
                accept="image/*"
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

export default DataGuru;
