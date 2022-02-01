export default class CRUD {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async readAll(): Promise<any[]> {
    const request = await fetch(this.baseUrl);
    const response = await request.json();
    return response;
  }

  async readOne(id: number): Promise<any> {
    const request = await fetch(this.baseUrl + id);
    const response = await request.json();
    return response;
  }

  async create(payload: any): Promise<any> {
    const request = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const response = await request.json();
    return response;
  }

  async update(id: number, payload: any): Promise<void> {
    await fetch(this.baseUrl + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }

  async delete(id: number): Promise<void> {
    await fetch(this.baseUrl + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
