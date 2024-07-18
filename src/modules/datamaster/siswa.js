import axios from "axios";
import React, { useEffect, useState } from "react";

const Siswa = () => {
  const [kelas, setKelas] = useState([]);
  const [formData, setFormData] = useState({
    nama_siswa: "",
  });

  const fetchClasses = async () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = JSON.stringify(formData);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://e2f-api-production.up.railway.app/api/siswa/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        // Show success alert
        alert(
          `Data siswa bernama: ${formData.nama_siswa} berhasil ditambahkan`
        );
        // Reset form data
        setFormData({
          nama_siswa: "",
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Gagal menambahkan data siswa");
      });
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div>
      <div className="text-2xl">Add Data Siswa</div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark"></div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Nama Siswa
              </label>
              <input
                type="text"
                name="nama_siswa"
                value={formData.nama_siswa}
                onChange={handleChange}
                placeholder="Masukan Nama Siswa"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary justify-end">
                Tambah
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Siswa;
