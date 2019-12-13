export class MainMenuItemDto {
    public target: string;
    public text: string;
    public icon: string;

    constructor(init?: Partial<MainMenuItemDto>) {
        Object.assign(this, init);
    }
}
