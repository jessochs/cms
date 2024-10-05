export class Document {
    // id, name, description, url, list of children
    public id: number;
    public name: string;
    public description: string;
    public imageUrl: string;

    constructor(id: number, name: string, description: string, imageUrl: string, ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl

    }
}