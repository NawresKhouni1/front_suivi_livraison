// Assurez-vous que le fichier JSON est dans le dossier src/assets
import contractData from './CustomerContract.json'; // Import du fichier JSON

export const contractConfig = {
  address: '0x875fcB2209dE508b4521aab603C6543008796005', // Adresse obtenue lors du déploiement
  abi: contractData.abi, // ABI du contrat
};
