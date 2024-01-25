import { EncryptStorage } from "encrypt-storage";

const encryptedLocalStorage = new EncryptStorage("SET_YOUR_SECRET_KEY", {
	prefix: "enc",
	encAlgorithm: "AES",
	storageType: "localStorage",
});

export { encryptedLocalStorage };
