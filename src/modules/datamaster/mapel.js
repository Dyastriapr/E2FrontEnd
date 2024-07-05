import axios from "axios";
import React, { useEffect, useState } from "react";

const Mapel = () => {
  const [showModal, setShowModal] = useState(false);
  const [mapel, setMapel] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    mata_pelajaran: "",
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEdit(false);
    setEditId(null);
    setFormData({
      mata_pelajaran: "",
    });
  };

  const fetchData = async () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      mata_pelajaran: formData.mata_pelajaran,
    });

    let config = {
      method: isEdit ? "put" : "post",
      maxBodyLength: Infinity,
      url: isEdit
        ? `https://e2f-api-production.up.railway.app/api/mata-pelajaran/update`
        : "https://e2f-api-production.up.railway.app/api/mata-pelajaran/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        fetchData();
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (item) => {
    setFormData({
      mata_pelajaran: item.mata_pelajaran,
    });
    setEditId(item.id);
    setIsEdit(true);
    openModal();
  };

  const handleDelete = async (id) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: "https://e2f-api-production.up.railway.app/api/mata-pelajaran/delete",
      data: { id },
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .request(config)
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* Tombol untuk membuka modal */}
      <div className="mb-4">
        <button onClick={openModal} className="btn btn-primary">
          Add Data Mata Pelajaran
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto mx-auto my-6">
            <div className="relative flex flex-col bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Header modal */}
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-xl font-semibold">
                  {isEdit
                    ? "Edit Data Mata Pelajaran"
                    : "Add Data Mata Pelajaran"}
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
              {/* Body modal */}
              <div className="relative p-6 flex-auto">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Nama Mata Pelajaran
                    </label>
                    <input
                      type="text"
                      name="mata_pelajaran"
                      value={formData.mata_pelajaran}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      placeholder="Masukkan nama mata pelajaran"
                    />
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
        </div>
      )}

      {/* Daftar mata pelajaran */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Nama Mata Pelajaran
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mapel &&
                mapel.map((packageItem, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {packageItem.mata_pelajaran}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          onClick={() => handleEdit(packageItem)}
                        >
                          EDIT
                        </button>
                        <button
                          className="hover:text-primary"
                          onClick={() => handleDelete(packageItem.id)}
                        >
                          HAPUS
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

export default Mapel;
