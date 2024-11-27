export interface FullDB {
    [key: string]: FullClass
}

export interface FullClass {
    id: number;
    name: string;
    description?: string;
    baseUrl: string;
    answersUrl: string[];
    page: PageData[];
    isIdHidden?: boolean
}

export interface PageData {
    id?: number;
    imageUrl?: string;
    audioUrl?: (string | number)[]; 
    answerUrl?: string[];
    notes?: string;
}
