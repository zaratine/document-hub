export type Document = {
    id: string;
    amount: number;
    date: string;
    status: 'pending' | 'completed' | 'exported';
    url_original: string;
    url_image: string;
    type: 'receipt' | 'billet' | 'other';
    extension: 'png' | 'pdf' | 'jpg';
    description: string;
    // category: chave_estrangeira;
    // supplier: chave_estrangeira;
};
