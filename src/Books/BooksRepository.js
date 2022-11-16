import httpGateway from "../Shared/HttpGateway.js";
import Observable from "../Shared/Observable";

class BooksRepository {
  programmersModel = null;
  apiUrl = "https://api.logicroom.co/api/tommy.han.cs@gmail.com/";

  constructor() {
    this.programmersModel = new Observable([]);
  }

  getBooks = async (callback) => {
    this.programmersModel.subscribe(callback);
    await this.loadApiData();
    this.programmersModel.notify();
  };

  addBook = async (bookProgrammerModel) => {
    const requestDto = {
      name: bookProgrammerModel.name,
      author: bookProgrammerModel.author,
      ownerId: "tommy.han.cs@gmail.com"
    };
    await httpGateway.post(this.apiUrl + "books", requestDto);
    await this.loadApiData();
    this.programmersModel.notify();
  };

  loadApiData = async () => {
    const booksDto = await httpGateway.get(this.apiUrl + "books");
    this.programmersModel.value = booksDto.result.map((bookDto) => {
      return bookDto;
    });
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
