export interface PlantCatalogueItem {
  image: string;
  id: string;
  plantName: string;
  scientificName:string;
  // commonDiseases: string[];
  commonDiseases: { diseasesId: string; diseasesName: string }[];
  uses: string[];
}
// id: string;
//   name: string;
//   scientificName: string;
//   commonDiseases: { disesId: string; disesName: string }[];
//   images: string;