export class CatalogListItemDto {
    public id: string;
    public name: string;
    public brand: string;
    public type: string;
    public size: string;
    public inStock: string;
    public deliveryDays: string;
    public price: string;

    constructor(init?: Partial<CatalogListItemDto>) {
        Object.assign(this, init);
    }
}

export class CatalogDetailsDto {
    public id: string;
    public name: string;
    public brand: string;
    public type: string;
    public width: number;
    public height: number;
    public inch: string;
    public season: string;
    public gripIndication: string;
    public fuelConsumption: string;
    public noiseLevel: string;
    public inStock: number;

    constructor(init?: Partial<CatalogDetailsDto>) {
        Object.assign(this, init);
    }
}
