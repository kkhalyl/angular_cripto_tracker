  export interface Investment {
    id: number;
    cryptoId: string;
    cryptoSymbol: string;
    quantity: number;
    purchasePrice: number;
    purchaseDate: Date;
    currentPrice?: number;
    profitOrLoss?: number;
}
