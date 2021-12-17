class View {
    constructor() {
        this.app = document.getElementById('app');
        this.title = this.createElement('h1', 'title');
        this.title.textContent = 'Search repositories';

        this.searchWrapper = this.createElement('div', 'search-line');
        this.searchField = this.createElement('input', 'search-input');
        this.projectsCounter = this.createElement('span', 'counter');
        this.searchWrapper.appendChild(this.searchField);
        this.searchWrapper.appendChild(this.projectsCounter);

        this.main = this.createElement('div', 'main');
        this.projectsWrapper = this.createElement('div', 'projects-wrapper');
        this.projectsList = this.createElement('ul', 'projects');
        this.projectsWrapper.appendChild(this.projectsList);
        this.main.appendChild(this.projectsWrapper);

        this.app.appendChild(this.title);
        this.app.appendChild(this.searchWrapper);
        this.app.appendChild(this.main);
    }

    createElement(tagName, className) {
        const element = document.createElement(tagName);
        if (className) {
            element.classList.add(className)
        }
        return element;
    }

    createProject(project) {
        const projectData = this.createElement('li', 'project-prev');
        projectData.innerHTML = `<h1> Project name: ${project.name}</h1>
                                 <span class="project-prev-name">Owner:${project.owner.login}</span>`;
        this.projectsList.append(projectData);
    }
}

class Search {
    constructor(view) {
        this.view = view;
        this.view.searchField.addEventListener('keyup', this.seatchProjects.bind(this))
    }

    async seatchProjects() {
        return await fetch(`https://api.github.com/search/repositories?q=${this.view.searchField.value}`).then((response) => {
            if (response.ok) {
                response.json().then(response => {
                    response.items.forEach(project => {
                        console.log(response);
                        this.view.createProject(project);
                    });
                })
            } else {
                new Error('There are no projects');
            }
        })
    }


}
new Search(new View());