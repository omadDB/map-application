import { useEffect, useRef } from "react"

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef()

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler(false)
      }
    }

    document.addEventListener("click", handleClick, listenCapturing)

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing)
  }, [handler, listenCapturing])

  return ref
}
