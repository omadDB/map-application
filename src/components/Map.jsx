import { useEffect, useRef } from "react"
import { Map, View } from "ol"
import { XYZ } from "ol/source"
import TileLayer from "ol/layer/Tile"
import { fromLonLat } from "ol/proj"

function MapComponent() {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current) return

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            crossOrigin: "anonymous",
            tilePixelRatio: 2,
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([-0.1276, 51.5074]),
        projection: "EPSG:3857",
        zoom: 10,
      }),
    })

    map.setTarget(mapRef.current)

    return () => map.setTarget(null)
  }, [])

  return (
    <div ref={mapRef} className="absolute top-0 bottom-0 w-full h-screen"></div>
  )
}

export default MapComponent
