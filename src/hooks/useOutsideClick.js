import { useEffect, useRef } from "react"

export function useOutsideClick(handler) {
  const ref = useRef()

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler(false)
      }
    }

    document.addEventListener("click", handleClick, true)

    return () => document.removeEventListener("click", handleClick, true)
  }, [handler])

  return ref
}
