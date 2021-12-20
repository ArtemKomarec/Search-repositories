import { View } from "./src/view.js";
import { Search } from "./src/search.js";
import { Request } from "./src/request.js";

const request = new Request();

new Search(new View(request), new Request());