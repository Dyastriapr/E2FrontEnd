import axios from "axios";
import React, { useEffect, useState } from "react";

const TahunAjar = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [tahun, setTahun] = useState([]);
  const [tahunAjar, setTahunAjar] = useState("");

  const openModal = (data = null) => {
    if (data) {
      setEditMode(true);
      setCurrentId(data.id);
      setTahunAjar(data.tahun_ajar);
    } else {
      setEditMode(false);
      setCurrentId(null);
      setTahunAjar("");
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://e2f-api-production.up.railway.app/api/tahun-ajar/fetch-all"
      );
      console.log(response.data);
      setTahun(response.data.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const createData = async () => {
    try {
      const response = await axios.post(
        "https://e2f-api-production.up.railway.app/api/tahun-ajar/create",
        {
          tahun_ajar: tahunAjar,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data created successfully: ", response.data);

      fetchData();
      closeModal();
    } catch (error) {
      console.error("Error creating data: ", error);
    }
  };

  const updateData = async () => {
    try {
      const response = await axios.put(
        "https://e2f-api-production.up.railway.app/api/tahun-ajar/update",
        {
          id: currentId,
          tahun_ajar: tahunAjar,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data updated successfully: ", response.data);

      fetchData();
      closeModal();
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await axios.delete(
        "https://e2f-api-production.up.railway.app/api/tahun-ajar/delete",
        {
          data: { id },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data deleted successfully: ", response.data);

      fetchData();
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      updateData();
    } else {
      createData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* Tombol untuk membuka modal */}
      <div className="mb-4">
        <button onClick={() => openModal()} className="btn btn-primary">
          Add Data Tahun Ajar
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
                  {editMode ? "Update Data Tahun Ajar" : "Add Data Tahun Ajar"}
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
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Tahun Ajar
                    </label>
                    <input
                      type="text"
                      value={tahunAjar}
                      onChange={(e) => setTahunAjar(e.target.value)}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      placeholder="Masukkan tahun ajar"
                    />
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

      {/* Daftar Tahun Ajar */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  No
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Tahun Ajar
                </th>

                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tahun.map((item, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {index + 1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {item.tahun_ajar}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => openModal(item)}
                      >
                        EDIT
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => deleteData(item.id)}
                      >
                        DELETE
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

export default TahunAjar;
