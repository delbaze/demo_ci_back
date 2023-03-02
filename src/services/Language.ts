import { Repository } from "typeorm";
import Language from "../entity/Language";
import dataSource from "../lib/datasource";

interface ILanguageService {
  db: Repository<Language>
}
class LanguageService implements ILanguageService {
  db: Repository<Language>
  constructor() {
    this.db = dataSource.getRepository("Language");
  }

  async listLanguages() {
    return await this.db.find();
  }
  async createLanguage(label: string) {
    let language = this.db.create({ label });
    return await this.db.save(language);

  }
}

export default LanguageService;
