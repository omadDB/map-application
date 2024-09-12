// As these components Select, Textarea and Modal could be refactored for a usage like in ui libraries, I kept naming them like this.

function Select({ markerStatus, setMarkerStatus }) {
  return (
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
  )
}

export default Select
