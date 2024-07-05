import axios from "axios";
import React, { useEffect, useState } from "react";

const Semester = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSemester, setCurrentSemester] = useState(null);
  const [semester, setSemester] = useState([]);
  const [newSemester, setNewSemester] = useState("");

  const openModal = (semester = null) => {
    if (semester) {
      setNewSemester(semester.semester);
      setCurrentSemester(semester);
      setEditMode(true);
    } else {
      setNewSemester("");
      setCurrentSemester(null);
      setEditMode(false);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchData = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/api/semester/fetch-all",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setSemester(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createSemester = async () => {
    let data = JSON.stringify({
      semester: newSemester,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/api/semester/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        fetchData();
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateSemester = async () => {
    let data = JSON.stringify({
      semester: newSemester,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `http://localhost:5000/api/semester/update/${currentSemester.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        fetchData();
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteSemester = async (id) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `http://localhost:5000/api/semester/delete/${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      updateSemester();
    } else {
      createSemester();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => openModal()} className="btn btn-primary">
          Add Data Semester
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto mx-auto my-6">
            <div className="relative flex flex-col bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-xl font-semibold">
                  {editMode ? "Update Data Semester" : "Add Data Semester"}
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
              <div className="relative p-6 flex-auto">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Semester
                    </label>
                    <input
                      type="text"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      placeholder="Masukkan nama semester"
                      value={newSemester}
                      onChange={(e) => setNewSemester(e.target.value)}
                      required
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

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  No
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Semester
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {semester &&
                semester.map((packageItem, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {index + 1}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.semester}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          onClick={() => openModal(packageItem)}
                        >
                          EDIT
                        </button>
                        <button
                          className="hover:text-primary"
                          onClick={() => deleteSemester(packageItem.id)}
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

export default Semester;
