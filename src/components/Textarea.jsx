function Textarea({ details, setDetails }) {
  return (
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
  )
}

export default Textarea
