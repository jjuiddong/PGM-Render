
import PgmLoader from "./pgmloader"


function main() {
    let canvas: HTMLCanvasElement = document.createElement('canvas')
    document.body.appendChild(canvas)
    const rect = document.body.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    let ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
    let loader = new PgmLoader()
    loader.load('./map.pgm')
        .then((result: ImageData) => {
            const x: number = rect.width / 2 - result.width / 2
            const y: number = rect.height / 2 - result.height / 2
            ctx?.putImageData(result, x, y)
        })
        .catch(() => {
            console.log('error load map.pgm file')
        })
}

// start entry point
main()
