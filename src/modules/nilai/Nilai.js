import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateModal from "./UpdateModal";

const NilaiOld = () => {
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
        console.error(error);
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
        console.error(error);
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
        console.log(response.data.data);
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
          <h1 className="text-2xl">Nama : {siswa?.nama_siswa}</h1>
        </div>

        <div className="text-right">
          <button
            className="btn btn-primary me-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add Mata Pelajaran
          </button>
          <button className="btn btn-primary me-2">TARIK NILAI</button>
        </div>
      </div>

      {updateModal && (
        <UpdateModal
          showModal={updateModal}
          closeModal={closeModal}
          title="Tambah Mata Pelajaran"
          formData={formData}
          setFormData={setFormData}
          kelasOptions={kelas}
          tahunAjarOptions={tahunAjar}
          mapelOptions={mapel}
          handleUpdateTabungan={handleUpdateTabungan}
          setorNilai={setorNilai}
        />
      )}

      {showModalSaldo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal-box bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg">Saldo</h3>
            {saldo && saldo.Siswa && saldo.MataPelajaran ? (
              <div>
                <p className="py-4">Siswa: {saldo.Siswa?.nama_siswa}</p>
                <p className="py-4">
                  Mata Pelajaran: {saldo.MataPelajaran?.mata_pelajaran}
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
                        {packageItem.MataPelajaran?.mata_pelajaran}
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
                        onClick={() => {
                          openUpdateModal(packageItem);
                        }}
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

export default NilaiOld;
