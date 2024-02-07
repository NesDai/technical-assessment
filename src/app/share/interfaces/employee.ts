export interface EmployeeData {
    id?: number;
    first?: string;
    middle?: string;
    last?: string;
    pfp?: string;
    gender?: string;
    species?: string;
    homePlanet?: string;
    occupation?: string;
    age?: string;
    quotes?: string[];
}

export interface EmployeeDisplay {
    name: string;
    id: string;
    occupation: string;
    pfp: string; 
    gender: string;
    species: string;
}

