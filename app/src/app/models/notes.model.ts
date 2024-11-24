/**
 * Collection of all notes.
 * @example {
 * _____FranchCourceLevelA1 {
 * __________chapter1: ChapterNotes {
 * _______________page1: 'Some note for 1 page',
 * _______________page2: 'Some note for 2 page',
 * __________}
 * _____}
 * }
 */
export interface AllNotes {
    // key is a course name
    [key: string]: ChapterNotes;
}

export interface ChapterNotes {
    [key: string]: PageNotes;
}

export interface PageNotes {
    [key: string]: string;
}

export interface Book {
    name?: string
    level?: string
    storageName?: string
}