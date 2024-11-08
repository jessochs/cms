export class Document {
    // id, name, description, url, list of children
    public id: string;
    public name: string;
    public description?: string;
    public url: string;

    constructor(id: string, name: string,  url: string, description?: string, ){
        this.id = id;
        this.name = name;
        this.description = description || '';
        this.url = url

    }
}