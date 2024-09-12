import { useEffect, useState } from "react"
import { useOutsideClick } from "../hooks/useOutsideClick"

function Modal({
  isModalOpen,
  setIsModalOpen,
  selectedMarker,
  updateCoordinate,
}) {
  const [markerStatus, setMarkerStatus] = useState(false)
  const [details, setDetails] = useState("")
  const ref = useOutsideClick(setIsModalOpen)

  useEffect(() => {
    if (selectedMarker) {
      console.log(selectedMarker)
      setMarkerStatus(selectedMarker?.status || false)
      setDetails(selectedMarker?.details || "")
    }
  }, [selectedMarker])

  function onCloseModal() {
    setIsModalOpen(false)
  }

  function handleSave() {
    updateCoordinate({
      ...selectedMarker,
      status: markerStatus,
      details,
    })
    setIsModalOpen(false)
  }

  if (!selectedMarker || !isModalOpen) return

  return (
    isModalOpen && (
      <div className="fixed top-0 left-0 z-1000 w-full h-screen backdrop-blur-sm bg-[#ffffff01]">
        <div
          className="flex flex-col gap-6 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[35rem] bg-white rounded-2xl p-8"
          ref={ref}
          data-test="modal"
        >
          <div className="flex justify-between">
            <h3 className="text-4xl font-bold">Info</h3>
            <button onClick={onCloseModal} className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="16"
                height="16"
                fill="#555"
                className="duration-150 hover:fill-black"
                viewBox="0 0 24 24"
              >
                <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-9">
            <label
              htmlFor="status"
              className="pl-5 text-xl font-medium leading-none text-right"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              value={markerStatus ? "true" : "false"}
              onChange={(e) => setMarkerStatus(e.target.value === "true")}
              className="flex items-center w-[20%] pt-1 pb-1.5 pr-3 pl-1.5 text-xl border border-gray-200 shadow-sm rounded-md focus:outline-none"
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>

          <div className="flex items-center gap-8">
            <label
              htmlFor="details"
              className="pl-[11px] text-xl font-medium leading-none text-right"
            >
              Details
            </label>
            <textarea
              name="details"
              id="details"
              className="w-full p-3 text-xl text-black border border-gray-200 rounded-md focus:outline-none"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </div>

          <button
            className="flex items-center self-end px-4 py-3 text-sm font-medium text-white bg-black rounded-md shadow whitespace-nowrap disabled:opacity-50"
            onClick={handleSave}
          >
            Save changes
          </button>
        </div>
      </div>
    )
  )
}

export default Modal
