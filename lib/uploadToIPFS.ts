import { PinataSDK } from "pinata-web3";

async function upload(file: File) {
  try {
    const pinata = new PinataSDK({
      pinataJwt: `${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
    });

    const blob: any = new Blob([file]);
    const upload = await pinata.upload.file(blob);
    console.log(upload);
    return upload.IpfsHash;
  } catch (error) {
    console.log(error);
  }
}
export default upload;
