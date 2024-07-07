import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import ModalForm from "./ModalForm";

export default function Nilai() {
  const { id } = useParams();
  const [semester, setSemester] = useState(1);
  const [kelas, setKelas] = useState();
  const [tahunAjar, setTahunAjar] = useState();
  const [mapel, setMapel] = useState();
  const [siswa, setSiswa] = useState();
  const [nilai, setNilai] = useState();
  const [saldo, setSaldo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSetorOpen, setModalSetorOpen] = useState(false);
  const [modalTarikOpen, setModalTarikOpen] = useState(false);
  const [modalTambahOpen, setModalTambahOpen] = useState(false);
  const [formData, setFormData] = useState({
    credit_ganjil: 0,
    debet_ganjil: 0,
    credit_genap: 0,
    debet_genap: 0,
    id_siswa: id,
    id_mapel: 0,
    id_kelas: 0,
    id_tahun_ajar: 0,
  });
  const [nilaiData, setNilaiData] = useState({
    credit_ganjil: 0,
    credit_genap: 0,
  });
  const [newSaldo, setnewSaldo] = useState(0);

  console.log("saldo", saldo);
  console.log("formdat", formData);
  //handle

  const openModal = () => {
    setModalOpen(true);
  };

  const openAddModal = async (item) => {
    await fetchDataSaldo(item.id_siswa, item.id_mapel);
    setFormData({
      id: item.id,
      credit_ganjil: item.credit_ganjil,
      debet_ganjil: item.debet_ganjil,
      credit_genap: item.credit_genap,
      debet_genap: item.debet_genap,
      id_siswa: item.id_siswa,
      id_mapel: item.id_mapel,
      id_kelas: item.id_kelas,
      id_tahun_ajar: item.id_tahun_ajar,
    });
    setNilaiData({
      credit_ganjil: item.credit_ganjil,
      credit_genap: item.credit_genap,
    });

    setModalSetorOpen(true);
  };

  const openPutModal = async (item) => {
    await fetchDataSaldo(item.id_siswa, item.id_mapel);
    setFormData({
      id: item.id,
      credit_ganjil: item.credit_ganjil,
      debet_ganjil: item.debet_ganjil,
      credit_genap: item.credit_genap,
      debet_genap: item.debet_genap,
      id_siswa: item.id_siswa,
      id_mapel: item.id_mapel,
      id_kelas: item.id_kelas,
      id_tahun_ajar: item.id_tahun_ajar,
    });
    setNilaiData({
      credit_ganjil: item.credit_ganjil,
      credit_genap: item.credit_genap,
    });

    setModalTarikOpen(true);
  };

  const closeModal = () => {
    setSemester(1);
    setSaldo({});
    setnewSaldo(0);
    setModalOpen(false);
    setModalSetorOpen(false);
    setModalTarikOpen(false);
    setModalTambahOpen(false);
    setFormData({
      credit_ganjil: 0,
      debet_ganjil: 0,
      credit_genap: 0,
      debet_genap: 0,
      id_siswa: id,
      id_mapel: 0,
      id_kelas: 0,
      id_tahun_ajar: 0,
    });
  };

  // api
  const fetchData = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://e2f-api-production.up.railway.app/api/siswa/${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSiswa(response.data.data.nama_siswa);
        setNilai(response.data.data.Nilais);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchDataSaldo = async (id_siswa, id_mapel) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://e2f-api-production.up.railway.app/api/tabungan/${id_siswa}/${id_mapel}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setSaldo(response.data.data);
        console.log("saldo", response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const lihatSaldo = async (id_siswa, id_mapel) => {
    await fetchDataSaldo(id_siswa, id_mapel);
    openModal();
  };

  const tambahMapel = (e) => {
    e.preventDefault();
    let data = formData;

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://e2f-api-production.up.railway.app/api/nilai/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        createTabungan();
      })
      .catch((error) => {
        console.error(error);
        alert("Gagal menambahkan mapel");
      });
  };

  const createTabungan = () => {
    let data = {
      saldo: 0,
      id_siswa: formData.id_siswa,
      id_mapel: formData.id_mapel,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://e2f-api-production.up.railway.app/api/tabungan/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        alert("Berhasil Menambahkan Mata Pelajaran");
        fetchData();
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        alert("Gagal Menambahkan Mata Pelajaran");
      });
  };

  const setorNilai = (e) => {
    e.preventDefault();
    const data = formData;
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "https://e2f-api-production.up.railway.app/api/nilai/update",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        updateSaldo();
      })
      .catch((error) => {
        console.error("Error updating nilai:", error);
        alert("Gagal setor nilai");
      });
  };

  const tarikNilai = (e) => {
    e.preventDefault();
    const data = formData;
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "https://e2f-api-production.up.railway.app/api/nilai/update",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        updateSaldo();
      })
      .catch((error) => {
        console.error("Error updating nilai:", error);
        alert("Gagal setor nilai");
      });
  };

  const updateSaldo = () => {
    const data = {
      saldo: saldo.saldo + newSaldo,
      id_siswa: saldo.id_siswa,
      id_mapel: saldo.id_mapel,
      id: saldo.id,
    };

    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "https://e2f-api-production.up.railway.app/api/tabungan/update",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        fetchDataSaldo(saldo.id_siswa, saldo.id_mapel);
        alert("Berhasil setor nilai");
        fetchData();
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating saldo:", error);
        alert("Gagal memperbarui saldo");
      });
  };

  const deleteNilai = async (item) => {
    // Konfirmasi dengan pengguna
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus nilai ini?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `https://e2f-api-production.up.railway.app/api/tabungan/delete`,
          {
            data: { id_siswa: item.id_siswa, id_mapel: item.id_mapel },
          }
        );

        await deleteTabungan(item.id);

        alert("Nilai dan Tabungan berhasil dihapus");
        fetchData();
        closeModal();
      } catch (error) {
        console.error("Error deleting nilai and tabungan:", error);
        alert("Gagal menghapus nilai dan tabungan");
      }
    } else {
      alert("Penghapusan nilai dibatalkan");
    }
  };

  const deleteTabungan = async (id) => {
    try {
      await axios.delete(
        `https://e2f-api-production.up.railway.app/api/nilai/delete`,
        {
          data: { id: id },
        }
      );
    } catch (error) {
      console.error("Error deleting tabungan:", error);
      throw error; // Rethrow error to be caught in deleteNilai
    }
  };

  const handleUpdateTabungan = (e) => {
    const { value } = e.target;
    const saldoTabungan = parseFloat(value) || 0;

    if (semester == 1) {
      setFormData((prevState) => ({
        ...prevState,
        debet_ganjil: prevState.credit_ganjil - saldoTabungan,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        debet_genap: prevState.credit_genap - saldoTabungan,
      }));
    }

    setnewSaldo(saldoTabungan);
  };

  const handleUpdateNilai = (e) => {
    const { value } = e.target;
    const saldoTabungan = parseFloat(value) || 0;

    if (semester == 1) {
      setFormData((prevState) => ({
        ...prevState,
        debet_ganjil: prevState.credit_ganjil + saldoTabungan,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        debet_genap: prevState.credit_genap + saldoTabungan,
      }));
    }

    const minSaldo = -Math.abs(saldoTabungan);
    setnewSaldo(minSaldo);
    console.log("tarik", minSaldo);
  };

  const fetchDataMapel = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://e2f-api-production.up.railway.app/api/mata-pelajaran/fetch-all",
      headers: {},
    };

    await axios
      .request(config)
      .then((response) => {
        setMapel(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchDataKelas = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://e2f-api-production.up.railway.app/api/kelas/fetch-all",
      headers: {},
    };

    await axios
      .request(config)
      .then((response) => {
        setKelas(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchDataTahunAjar = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://e2f-api-production.up.railway.app/api/tahun-ajar/fetch-all",
      headers: {},
    };

    await axios
      .request(config)
      .then((response) => {
        setTahunAjar(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchDataKelas();
    fetchDataMapel();
    fetchDataTahunAjar();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-left">
          <h1 className="text-2xl">Nama : {siswa}</h1>
        </div>

        <div className="text-right">
          <button
            className="btn btn-primary me-2"
            onClick={() => {
              setModalTambahOpen(true);
            }}
          >
            Add Mata Pelajaran
          </button>
        </div>
      </div>

      {/* Daftar kelas */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto text-center">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Nama Mata Pelajaran
                </th>
                <th className="text-center font-medium text-black dark:text-white xl:pl-11">
                  Kelas
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white text-center">
                  Semester Ganjil
                  <div className="flex justify-around mt-1">
                    <span>Credit</span>
                    <span>Debet</span>
                  </div>
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-center">
                  Semester Genap
                  <div className="flex justify-around mt-1">
                    <span>Credit</span>
                    <span>Debet</span>
                  </div>
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-center">
                  Saldo Nilai
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {nilai &&
                nilai.map((packageItem, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white text-start">
                        {packageItem.MataPelajaran?.mata_pelajaran}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white py-4 text-center">
                        {packageItem.Kela?.nama_kelas}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex justify-around text-center">
                        <span>{packageItem.credit_ganjil}</span>
                        <span>{packageItem.debet_ganjil}</span>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex justify-around">
                        <span>{packageItem.credit_genap}</span>
                        <span>{packageItem.debet_genap}</span>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          lihatSaldo(
                            packageItem.id_siswa,
                            packageItem.id_mapel
                          );
                        }}
                      >
                        Lihat Saldo
                      </button>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <button
                        className="btn btn-primary me-3"
                        onClick={() => {
                          openAddModal(packageItem);
                        }}
                      >
                        Setor Nilai
                      </button>
                      <button
                        className="btn btn-primary me-3"
                        onClick={() => {
                          openPutModal(packageItem);
                        }}
                      >
                        Tarik Nilai
                      </button>
                      <button
                        className="btn bg-red-500 hover:bg-red-700 border-0 text-black"
                        onClick={() => {
                          deleteNilai(packageItem);
                        }}
                      >
                        Hapus Nilai
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal saldo */}
      <Modal
        isOpen={modalOpen}
        title="Lihat Saldo"
        content={
          <>
            <div className="flex">
              <div className="w-1/2">Mata Pelajaran</div>
              <div className="me-3">:</div>
              <div>{saldo.MataPelajaran?.mata_pelajaran}</div>
            </div>
            <div className="flex">
              <div className="w-1/2">Saldo</div>
              <div className="me-3">:</div>
              <div>{saldo.saldo}</div>
            </div>
          </>
        }
        onClose={closeModal}
      />

      {/* modal add */}
      <ModalForm
        isOpen={modalSetorOpen}
        title="Setor Nilai"
        content={
          <>
            <form onSubmit={setorNilai}>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Kelas
                  </label>
                  <select
                    className="mt-1 p-2 block bg-white w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                    value={formData.id_kelas}
                    onChange={(e) => {
                      setFormData({ ...formData, id_kelas: e.target.value });
                    }}
                    disabled
                  >
                    <option value="" disabled selected>
                      Pilih Kelas
                    </option>
                    {kelas &&
                      kelas.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.nama_kelas}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Tahun Ajar
                  </label>
                  <select
                    className="bg-white mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                    value={formData.id_tahun_ajar}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        id_tahun_ajar: e.target.value,
                      });
                    }}
                    disabled
                  >
                    <option value="" disabled selected>
                      Pilih Tahun Ajar
                    </option>
                    {tahunAjar &&
                      tahunAjar.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.tahun_ajar}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mata Pelajaran
                  </label>
                  <select
                    className=" bg-white mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                    value={formData.id_mapel}
                    onChange={(e) => {
                      setFormData({ ...formData, id_mapel: e.target.value });
                    }}
                    disabled
                  >
                    <option value="" disabled selected>
                      Pilih Mata Pelajaran...
                    </option>
                    {mapel &&
                      mapel.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.mata_pelajaran}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Semester
                  </label>
                  <select
                    className=" bg-white mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                    onChange={(e) => {
                      setSemester(e.target.value);
                    }}
                  >
                    <option value="1">GANJIL</option>
                    <option value="2">GENAP</option>
                  </select>
                </div>
                {semester == 1 ? (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Credit Nilai Semester Ganjil(Nilai Asli)
                      </label>
                      <input
                        type="number"
                        className="bg-white mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Masukkan credit (nilai asli)"
                        value={formData.credit_ganjil}
                        disabled={nilaiData.credit_ganjil !== 0}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            credit_ganjil: parseInt(e.target.value),
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Tabung
                      </label>
                      {nilaiData.credit_ganjil == 0 ? (
                        <input
                          type="number"
                          className="mt-1 bg-white p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                          placeholder="Masukkan nilai yang ingin di tabung"
                          onChange={handleUpdateTabungan}
                          min="0"
                          max={formData.credit_ganjil}
                        />
                      ) : (
                        <div>{saldo.saldo}</div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Credit Nilai Semester Genap(Nilai Asli)
                      </label>
                      <input
                        type="number"
                        className="bg-white mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Masukkan credit (nilai asli)"
                        value={formData.credit_genap}
                        disabled={nilaiData.credit_genap !== 0}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            credit_genap: parseFloat(e.target.value),
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Tabung
                      </label>
                      {nilaiData.credit_genap == 0 ? (
                        <input
                          type="number"
                          className="mt-1 bg-white p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                          placeholder="Masukkan nilai yang ingin di tabung"
                          onChange={handleUpdateTabungan}
                          min="0"
                          max={formData.credit_genap}
                        />
                      ) : (
                        <div>{saldo.saldo}</div>
                      )}
                    </div>
                  </>
                )}
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

      <ModalForm
        isOpen={modalTarikOpen}
        title="Tarik Nilai"
        content={
          <>
            <form onSubmit={tarikNilai}>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Kelas
                  </label>
                  <select
                    className="mt-1 p-2 block bg-white w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                    value={formData.id_kelas}
                    onChange={(e) => {
                      setFormData({ ...formData, id_kelas: e.target.value });
                    }}
                    disabled
                  >
                    <option value="" disabled selected>
                      Pilih Kelas
                    </option>
                    {kelas &&
                      kelas.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.nama_kelas}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Tahun Ajar
                  </label>
                  <select
                    className="bg-white mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                    value={formData.id_tahun_ajar}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        id_tahun_ajar: e.target.value,
                      });
                    }}
                    disabled
                  >
                    <option value="" disabled selected>
                      Pilih Tahun Ajar
                    </option>
                    {tahunAjar &&
                      tahunAjar.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.tahun_ajar}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mata Pelajaran
                  </label>
                  <select
                    className=" bg-white mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                    value={formData.id_mapel}
                    onChange={(e) => {
                      setFormData({ ...formData, id_mapel: e.target.value });
                    }}
                    disabled
                  >
                    <option value="" disabled selected>
                      Pilih Mata Pelajaran...
                    </option>
                    {mapel &&
                      mapel.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.mata_pelajaran}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Semester
                  </label>
                  <select
                    className=" bg-white mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                    onChange={(e) => {
                      setSemester(e.target.value);
                    }}
                  >
                    <option value="1">GANJIL</option>
                    <option value="2">GENAP</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {semester === 1
                      ? "Credit Nilai Semester Ganjil (Nilai Asli)"
                      : "Credit Nilai Semester Genap (Nilai Asli)"}
                  </label>
                  <input
                    type="number"
                    className="bg-white mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    placeholder="Masukkan credit (nilai asli)"
                    value={
                      semester === 1
                        ? formData.credit_ganjil
                        : formData.credit_genap
                    }
                    disabled={
                      semester === 1
                        ? nilaiData.credit_ganjil !== 0
                        : nilaiData.credit_genap !== 0
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [semester === 1 ? "credit_ganjil" : "credit_genap"]:
                          parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Saldo
                  </label>
                  <div>{saldo.saldo}</div>
                </div>
                {saldo.saldo !== 0 ? (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      {semester === 1
                        ? "Tarik Nilai Semester Ganjil"
                        : "Tarik Nilai Semester Genap"}
                    </label>
                    <input
                      type="number"
                      className="bg-white mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      placeholder="Tarik nilai dari saldo untuk nilai rapot"
                      min="0"
                      max={saldo.saldo}
                      onChange={handleUpdateNilai}
                    />
                  </div>
                ) : (
                  ""
                )}
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

      <ModalForm
        isOpen={modalTambahOpen}
        title="Tambah Mata Pelajaran"
        content={
          <>
            <form onSubmit={tambahMapel}>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Kelas
                  </label>
                  <select
                    className="mt-1 p-2 block bg-white w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                    onChange={(e) => {
                      setFormData({ ...formData, id_kelas: e.target.value });
                    }}
                  >
                    <option value="" disabled selected>
                      Pilih Kelas
                    </option>
                    {kelas &&
                      kelas.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.nama_kelas}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Tahun Ajar
                  </label>
                  <select
                    className="bg-white mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        id_tahun_ajar: e.target.value,
                      });
                    }}
                  >
                    <option value="" disabled selected>
                      Pilih Tahun Ajar
                    </option>
                    {tahunAjar &&
                      tahunAjar.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.tahun_ajar}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mata Pelajaran
                  </label>
                  <select
                    className=" bg-white mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                    onChange={(e) => {
                      setFormData({ ...formData, id_mapel: e.target.value });
                    }}
                  >
                    <option value="" disabled selected>
                      Pilih Mata Pelajaran...
                    </option>
                    {mapel &&
                      mapel.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.mata_pelajaran}
                        </option>
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
