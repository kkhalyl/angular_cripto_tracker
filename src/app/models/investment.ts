  export interface Investment {
    id: number;
    cryptoId: string;
    cryptoSymbol: string;
    cryptoName: string;
    quantity: number;
    purchasePrice: number;
    purchaseDate: Date;
    currentPrice?: number;
    profitOrLoss?: number;
}
