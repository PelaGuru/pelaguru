import { PlantDetails } from '../../../shared/models/plant-details';
import { DiseaseDetails } from '../../../shared/models/disease-details';
import { from } from 'rxjs';
export const DISEASE: DiseaseDetails = {
  diseaseName: 'Septoria leaf spot',
  symptoms: ['dark brown margins and tan to gray'],
  causativeAgent: 'Virus',
  additionalFeatures: 'features',
  chemicals: 'Chemical',
  commonPlants: ['Tomato'],
  image:
    'https://www.missouribotanicalgarden.org/Portals/0/Gardening/Gardening%20Help/images/Pests/Septoria_Leaf_Spot_of_Tomato2241.jpg',
  desc: 'Lycopersicon esculentum'
};
