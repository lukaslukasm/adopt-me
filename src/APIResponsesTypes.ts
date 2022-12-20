export type Animal = "dog" | "cat" | "rabbit" | "bird" | "reptile";

export interface PetType {
  id: number;
  name: string;
  animal: Animal;
  breed: string;
  description: string;
  images: string[];
  city: string;
  state: string;
}

export interface PetAPIResponse {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: PetType[];
}

export interface BreedListAPIResponse {
  animal: Animal;
  breeds: string[];
}
