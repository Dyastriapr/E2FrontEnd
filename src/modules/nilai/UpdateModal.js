import React from "react";

const UpdateModal = ({
  showModal,
  closeModal,
  title,
  formData,
  setFormData,
  kelasOptions,
  tahunAjarOptions,
  mapelOptions,
  handleUpdateTabungan,
  setorNilai,
}) => {
  if (!showModal) return null;

  return (
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
              <h3 className="text-xl font-semibold">{title}</h3>
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
                  required
                  value={formData.id_kelas}
                  onChange={(e) => {
                    setFormData({ ...formData, id_kelas: e.target.value });
                  }}
                >
                  <option value="" disabled selected>
                    Pilih Kelas
                  </option>
                  {kelasOptions &&
                    kelasOptions.map((e) => (
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
                  required
                  value={formData.id_tahun_ajar}
                  onChange={(e) => {
                    setFormData({ ...formData, id_tahun_ajar: e.target.value });
                  }}
                >
                  <option value="" disabled selected>
                    Pilih Tahun Ajar
                  </option>
                  {tahunAjarOptions &&
                    tahunAjarOptions.map((e) => (
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
                  required
                  onChange={(e) => {
                    setFormData({ ...formData, id_mapel: e.target.value });
                  }}
                >
                  <option value="" disabled selected>
                    Pilih Mata Pelajaran...
                  </option>
                  {mapelOptions.map((e) => (
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
  );
};

export default UpdateModal;
