export class Document {
    // id, name, description, url, list of children
    public id: string;
    public name: string;
    public description?: string;
    public url: string;
    public children?: Document[]; // Add children property
  
    constructor(id: string, name: string, url: string, description?: string, children?: Document[]) {
      this.id = id;
      this.name = name;
      this.description = description || '';
      this.url = url;
      this.children = children || []; // Initialize children if not provided
    }
  }
  