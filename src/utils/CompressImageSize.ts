import Compressor from "compressorjs";

const compressImage = async (file: File | Blob) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const compressor: any = await new Compressor(file, { quality: 0.6 })
    return compressor.file;

}

export {
    compressImage
}