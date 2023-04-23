import Service from "@/service";

class SearchService extends Service {
  constructor() {
    super("users");
  }

  async search(searchQuery: string) {
    return await this.get(searchQuery);
  }
}

export default SearchService;
