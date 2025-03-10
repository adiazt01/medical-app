import { useState, useEffect } from "react"

interface WindowSize {
  width: number
  height: number
}

export function useWindowSize(): WindowSize {
  // Valores iniciales para evitar errores en SSR
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Añadir event listener
    window.addEventListener("resize", handleResize)

    // Llamar al handler inmediatamente para establecer el tamaño inicial
    handleResize()

    // Limpiar event listener al desmontar
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}
