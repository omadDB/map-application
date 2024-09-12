import { useEffect, useState } from "react"
import { useOutsideClick } from "../hooks/useOutsideClick"
import Select from "./Select"
import Textarea from "./Textarea"

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
          className="flex flex-col gap-6 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[26rem] sm:w-[35rem] bg-white rounded-2xl sm:p-8 p-6"
          ref={ref}
          data-test="modal"
        >
          <div className="flex justify-between">
            <h3 className="text-3xl font-bold sm:text-4xl">Info</h3>
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

          <Select
            markerStatus={markerStatus}
            setMarkerStatus={setMarkerStatus}
          />

          <Textarea details={details} setDetails={setDetails} />

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
