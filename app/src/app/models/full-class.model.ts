export interface FullClass {
    id: number;
    name: string;
    description?: string;
    baseUrl: string;
    answersUrl: string[];
    page: PageData[];
}

export interface PageData {
    id?: number;
    imageUrl?: string;
    audioUrl?: (string | number)[]; 
    answerUrl?: string[];
    notes?: string;
}
