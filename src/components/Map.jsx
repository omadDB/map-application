import { useEffect, useRef, useState } from "react"
import { Feature, Map, View } from "ol"
import { XYZ } from "ol/source"
import TileLayer from "ol/layer/Tile"
import { fromLonLat } from "ol/proj"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import mockData from "../data/mock-data.json"
import { Point } from "ol/geom"

function MapComponent() {
  const [coordinates, setCoordinates] = useState([])
  const mapRef = useRef(null)

  useEffect(() => {
    setCoordinates(mockData.coordinates)

    if (!mapRef.current) return

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attributions:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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

    const markers = new VectorLayer({
      source: new VectorSource({
        features: coordinates.map((coord) => {
          console.log(coord)
          const feature = new Feature({
            geometry: new Point(fromLonLat([coord.longitude, coord.latitude])),
          })

          return feature
        }),
      }),
    })

    map.addLayer(markers)

    map.setTarget(mapRef.current)

    return () => map.setTarget(null)
  }, [coordinates])

  return (
    <div ref={mapRef} className="absolute top-0 bottom-0 w-full h-screen"></div>
  )
}

export default MapComponent
