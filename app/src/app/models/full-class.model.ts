export interface FullClass {
    id: number;
    name: string; // Название главы
    description?: string; // Краткое описание главы
    data: ChapterSections; // Секции главы
}

export interface ChapterSections {
    communication: Exercise[];
    vocabulaire: Exercise[];
    grammaire: Exercise[];
    phonetique: Exercise[];
    culture: Exercise[];
}

export interface Exercise {
    id: number; // Уникальный идентификатор упражнения
    title: string; // Название упражнения
    description?: string; // Описание задания
    imageUrl?: string; // Путь к изображению (assets/images)
    audioUrl?: string; // Путь к аудиофайлу (assets/audio)
    answer?: string; // Правильный ответ
    script?: string; // Дополнительный текст (например, для диалога)
    notes?: string; // Поле для пользовательских заметок
}
