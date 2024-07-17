import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Prestasi() {
  const [prestasi, setPrestasi] = useState([]);
  const [siswa, setSiswa] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id_siswa: "",
    prestasi: "",
    jenis_prestasi: "",
    tingkat: "",
    sertifikat: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPrestasi();
    fetchSiswa();
  }, []);

  const fetchPrestasi = async () => {
    try {
      const response = await axios.get(
        "https://e2f-api-production.up.railway.app/api/prestasi/fetch-all"
      );
      setPrestasi(response.data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchSiswa = async () => {
    try {
      const response = await axios.get(
        "https://e2f-api-production.up.railway.app/api/siswa/fetch-all"
      );
      setSiswa(response.data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchSertif = async (id) => {
    try {
      const response = await axios.get(
        `https://e2f-api-production.up.railway.app/api/prestasi/fetch-sertif/${id}`,
        { responseType: "arraybuffer" } // Mendapatkan data sebagai array buffer
      );

      const blob = new Blob([response.data], { type: "image/png" }); // Sesuaikan tipe MIME dengan tipe data
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://e2f-api-production.up.railway.app/api/prestasi/delete`,
        { data: { id } }
      );
      fetchPrestasi();
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  const handleOpenModal = () => {
    setIsEditing(false);
    setFormData({
      id_siswa: "",
      prestasi: "",
      jenis_prestasi: "",
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
      id_siswa: prestasi.id_siswa,
      prestasi: prestasi.prestasi,
      jenis_prestasi: prestasi.jenis_prestasi,
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
      fetchPrestasi();
      handleCloseModal();
    } catch (error) {
      console.log("Error submitting data:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">DATA PRESTASI SISWA</div>
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
                  Jenis
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
                    <p className="text-black dark:text-white">{item.tingkat}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {/* {item.sertifikat ? (
                      <img
                        src={item.sertifikat}
                        alt="Sertifikat"
                        className="h-16 w-16 object-cover rounded-full"
                      />
                    ) : (
                      <p className="text-black dark:text-white">
                        Tidak ada sertifikat
                      </p>
                    )} */}
                    <p
                      className="hover:font-bold cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        fetchSertif(item.id);
                      }}
                    >
                      {item.sertifikat}
                    </p>
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
                Siswa
              </label>
              <select
                name="id_siswa"
                value={formData.id_siswa}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="" disabled>
                  Pilih Siswa
                </option>
                {siswa.map((siswa) => (
                  <option key={siswa.id} value={siswa.id}>
                    {siswa.nama_siswa}
                  </option>
                ))}
              </select>
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
                Jenis Prestasi
              </label>
              <select
                name="jenis_prestasi"
                value={formData.jenis_prestasi}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="" disabled>
                  Pilih Jenis Prestasi
                </option>
                <option value="Akademik">Akademik</option>
                <option value="Nonakademik">Nonakademik</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tingkat
              </label>
              <select
                name="tingkat"
                value={formData.tingkat}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="" disabled>
                  Pilih Tingkat
                </option>
                <option value="Kecamatan">Kecamatan</option>
                <option value="Kabupaten/Kota">Kabupaten/Kota</option>
                <option value="Provinsi">Provinsi</option>
                <option value="Nasional">Nasional</option>
                <option value="Internasional">Internasional</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sertifikat
              </label>
              <input
                type="file"
                name="sertifikat"
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
}
