import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Nilai = () => {
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [showModalSaldo, setShowModalSaldo] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [nilai, setNilai] = useState([]);
  const [siswa, setSiswa] = useState({});
  const [semester, setSemester] = useState(1);
  const [mapel, setMapel] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [tahunAjar, setTahunAjar] = useState([]);
  const [saldo, setSaldo] = useState({});

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

  const [formTabungan, setFormTabungan] = useState({
    saldo: 0,
    id_siswa: id,
    id_mapel: formData.id_mapel,
  });

  const handleUpdateTabungan = (e) => {
    const { value } = e.target;
    const saldoTabungan = parseFloat(value) || 0;

    setFormTabungan((prevState) => ({
      ...prevState,
      saldo: saldoTabungan,
      id_mapel: formData.id_mapel,
    }));

    if (semester === 1) {
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
  };

  const handleOpenSaldo = (id_siswa, id_mapel) => {
    fetchDataSaldo(id_siswa, id_mapel);
    setShowModalSaldo(true);
  };

  const openModal = () => {
    setShowModal(true);
    setUpdateModal(false);
  };

  const openUpdateModal = (item) => {
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

    setUpdateModal(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowModalSaldo(false);
    setUpdateModal(false);
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
        setSaldo(response.data.data || {});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setorNilai = async () => {
    if (updateModal) {
      updateNilai();
    } else {
      createNilai();
    }
  };

  const createNilai = () => {
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
        setFormTabungan({ ...formTabungan, id_mapel: formData.id_mapel });
        createTabungan();
        alert("Berhasil setor nilai");
      })
      .catch((error) => {
        console.log(error);
        alert("Gagal setor nilai");
      });
  };

  const updateNilai = () => {
    let data = formData;

    let config = {
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
        alert("Berhasil memperbarui nilai");
      })
      .catch((error) => {
        console.log(error);
        alert("Gagal memperbarui nilai");
      });
  };

  const updateSaldo = () => {
    let data = {
      saldo: formTabungan.saldo,
      id_siswa: formTabungan.id_siswa,
      id_mapel: formTabungan.id_mapel,
      id: saldo.id,
    };

    let config = {
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
        fetchDataSaldo(formTabungan.id_siswa, formTabungan.id_mapel);
        alert("Berhasil setor Tabungan");
      })
      .catch((error) => {
        console.log(error);
        alert("Gagal setor Tabungan");
      });
  };

  const createTabungan = () => {
    let data = {
      saldo: formTabungan.saldo,
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
        alert("Berhasil setor Tabungan");
      })
      .catch((error) => {
        console.log(error);
        alert("Gagal setor Tabungan");
      });
  };

  const fetchData = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://e2f-api-production.up.railway.app/api/siswa/${id}`,
      headers: {},
    };

    await axios
      .request(config)
      .then((response) => {
        setNilai(response.data.data.Nilais);
        setSiswa(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
    fetchDataTahunAjar();
    fetchDataMapel();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-left">
          <h1>Nama : {siswa?.nama_siswa}</h1>
          <h1>Kelas : {siswa?.kelas?.nama_kelas}</h1>
        </div>

        <div className="text-right">
          <button className="btn btn-primary me-2" onClick={openModal}>
            Add Mata Pelajaran
          </button>
          <button className="btn btn-primary me-2">TARIK NILAI</button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto mx-auto my-6">
            <div className="relative flex flex-col bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setorNilai();
                }}
              >
                {/* Header modal */}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                  <h3 className="text-xl font-semibold">
                    {updateModal ? "Update Nilai" : "Setor Nilai"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* Body modal */}
                <div className="relative p-6 flex-auto">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Kelas
                    </label>
                    <select
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      value={formData.id_kelas}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          id_kelas: e.target.value,
                        });
                      }}
                    >
                      <option value="" disabled>
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
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      value={formData.id_tahun_ajar}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          id_tahun_ajar: e.target.value,
                        });
                      }}
                    >
                      <option value="" disabled>
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
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      value={formData.id_mapel}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          id_mapel: e.target.value,
                        });
                      }}
                    >
                      <option value="" disabled>
                        Pilih Mata Pelajaran...
                      </option>
                      {mapel.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.mata_pelajaran}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Credit Nilai Semester Ganjil(Nilai Asli)
                    </label>
                    <input
                      type="number"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      placeholder="Masukkan credit (nilai asli)"
                      value={formData.credit_ganjil}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          credit_ganjil: parseFloat(e.target.value),
                        });
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Credit Nilai Semester Genap(Nilai Asli)
                    </label>
                    <input
                      type="number"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      placeholder="Masukkan credit (nilai asli)"
                      value={formData.credit_genap}
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
                    <input
                      type="number"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      placeholder="Masukkan debet (nilai rapot)"
                      onChange={handleUpdateTabungan}
                    />
                  </div>
                </div>
                {/* Footer modal */}
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
      )}

      {showModalSaldo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal-box bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg">Saldo</h3>
            {saldo && saldo.Siswa && saldo.MataPelajaran ? (
              <div>
                <p className="py-4">Siswa: {saldo.Siswa.nama_siswa}</p>
                <p className="py-4">
                  Mata Pelajaran: {saldo.MataPelajaran.mata_pelajaran}
                </p>
                <p className="py-4">Saldo: {saldo.saldo}</p>
              </div>
            ) : (
              <p className="py-4">Loading...</p>
            )}
            <div className="modal-action">
              <button className="btn" onClick={() => setShowModalSaldo(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daftar kelas */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Nama Mata Pelajaran
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-center">
                  Semester Ganjil
                  <div className="flex justify-between mt-1">
                    <span>Credit</span>
                    <span>Debet</span>
                  </div>
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-center">
                  Semester Genap
                  <div className="flex justify-between mt-1">
                    <span>Credit</span>
                    <span>Debet</span>
                  </div>
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Saldo Nilai
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {nilai &&
                nilai.map((packageItem, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {packageItem.MataPelajaran.mata_pelajaran}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex justify-between text-center">
                        <span>{packageItem.credit_ganjil}</span>
                        <span>{packageItem.debet_ganjil}</span>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex justify-between">
                        <span>{packageItem.credit_genap}</span>
                        <span>{packageItem.debet_genap}</span>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          handleOpenSaldo(
                            packageItem.id_siswa,
                            packageItem.id_mapel
                          )
                        }
                      >
                        Lihat Saldo
                      </button>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <button
                        className="btn btn-primary"
                        onClick={() => openUpdateModal(packageItem)}
                      >
                        Setor Nilai
                      </button>
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

export default Nilai;
