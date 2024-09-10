import { useEffect, useRef, useState } from "react"
import { Feature, Map, View } from "ol"
import { XYZ } from "ol/source"
import TileLayer from "ol/layer/Tile"
import { fromLonLat } from "ol/proj"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import mockData from "../data/mock-data.json"
import { Point } from "ol/geom"
import Style from "ol/style/Style"
import Icon from "ol/style/Icon"
import { isEmpty } from "ol/extent"
import Modal from "./Modal"

const createSVGIcon = (color) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="${color}">
    <path d="M12 2C8.13401 2 5 5.13401 5 9c0 4.77 5 10.794 6.125 12.066a1 1 0 0 0 1.75 0C14 19.794 19 13.77 19 9c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
  </svg>`
}

function MapComponent() {
  const [coordinates, setCoordinates] = useState(mockData.coordinates)
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const mapRef = useRef(null)
  const mapRefInstance = useRef(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Creating a map using OpenStreetMap as a source
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
        center: fromLonLat([58.775929, 24.658983]),
        projection: "EPSG:3857",
        zoom: 7,
      }),
    })

    mapRefInstance.current = map

    // To create a layer which contains the markers which use the coordinates coming from sample data
    const markers = new VectorLayer({
      source: new VectorSource({
        features: coordinates?.map((coord) => {
          const feature = new Feature({
            geometry: new Point(fromLonLat([coord.longitude, coord.latitude])),
            ...coord,
          })

          // Color of the marker based on the status
          const color = coord.status ? "#4CAF50" : "#F44336"

          feature.setStyle(
            new Style({
              image: new Icon({
                anchor: [0.5, 1],
                src: `data:image/svg+xml;utf8,${encodeURIComponent(
                  createSVGIcon(color)
                )}`,
              }),
            })
          )

          return feature
        }),
      }),
    })

    // Adding markers on map
    map.addLayer(markers)

    // To make map focus on the points added to the map so that all of the markers are visible
    const extent = markers.getSource().getExtent()
    if (!isEmpty(extent)) {
      map.getView().fit(extent, { padding: [50, 50, 50, 50] })
    }

    map.setTarget(mapRef.current)

    return () => map.setTarget(null)
  }, [coordinates])

  // Updating coordinates after saving changes in the marker content
  function updateCoordinate(updatedCoordinate) {
    setCoordinates((prev) => {
      const newCoord = prev.map((coord) =>
        coord.latitude === updatedCoordinate.latitude &&
        coord.longitude === updatedCoordinate.longitude
          ? {
              ...coord,
              status: updatedCoordinate.status,
              details: updatedCoordinate.details,
            }
          : coord
      )

      return newCoord
    })
  }

  // To make cursor pointer when hovered over a marker(predefined coordinate) on the map
  function handlePointerMove(e) {
    const map = mapRefInstance.current
    const pixel = map.getEventPixel(e)
    const pointerIsOnMarker = map.hasFeatureAtPixel(pixel)
    map.getTargetElement().style.cursor = pointerIsOnMarker ? "pointer" : ""
  }

  function handleClick(e) {
    const map = mapRefInstance.current
    const pixel = map.getEventPixel(e)
    const marker = map.forEachFeatureAtPixel(pixel, (mark) => mark)

    if (marker) {
      const selectedMarkerDetails = {
        latitude: marker.get("latitude"),
        longitude: marker.get("longitude"),
        status: marker.get("status"),
        details: marker.get("details"),
      }
      setSelectedMarker(selectedMarkerDetails)
      setIsModalOpen(true)
    }
  }

  return (
    <div className="relative w-full h-screen">
      <div
        // Here, pointer-events-none custom class is used to prevent the work of onPointerMove outside of modal when modal is open. It means that, when I hover or click on the markers when a modal is open, it just closes the modal triggering useOutsideClick() hook.
        className={`w-full h-full ${isModalOpen ? "pointer-events-none" : ""}`}
        ref={mapRef}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
      ></div>

      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          selectedMarker={selectedMarker}
          setIsModalOpen={setIsModalOpen}
          updateCoordinate={updateCoordinate}
        />
      )}
    </div>
  )
}

export default MapComponent
