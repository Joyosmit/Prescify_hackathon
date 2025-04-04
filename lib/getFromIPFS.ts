import { pinata } from "./config";

export async function getFile(ipfsHash: string) {
  try {
    const file = await pinata.gateways.get(
      ipfsHash
    );
    console.log("This is IPFS data: ",file.data);
    return file.data;
  } catch (error) {
    console.log(error);
  }
}
