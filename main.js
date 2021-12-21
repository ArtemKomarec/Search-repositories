import { View } from "./src/view.js";
import { Search } from "./src/search.js";
import { Request } from "./src/request.js";

const request = new Request();
const view = new View(request)

new Search(view, request);