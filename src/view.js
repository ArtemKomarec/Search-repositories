export class View {
    constructor() {
        this.app = document.getElementById('app');
        this.title = this.createElement('h1', 'title');
        this.title.textContent = 'Search repositories';

        this.searchWrapper = this.createElement('div', 'search-line');
        this.searchField = this.createElement('input', 'search-input');
        this.projectsCounter = this.createElement('span', 'counter');
        this.searchWrapper.append(this.searchField);
        this.searchWrapper.append(this.projectsCounter);

        
        this.projectsWrapper = this.createElement('div', 'projects-wrapper');
        this.projectsList = this.createElement('ul', 'projects');
        this.projectsWrapper.append(this.projectsList);

        this.main = this.createElement('div', 'main');
        this.main.append(this.projectsWrapper);

        this.loadBtn = this.createElement('button', 'btn');
        this.loadBtn.textContent = 'Load more';
        this.loadBtn.style.display = 'none';
        this.projectsWrapper.append(this.loadBtn);

        this.app.append(this.title);
        this.app.append(this.searchWrapper);
        this.app.append(this.main);
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
        projectData.innerHTML = `<h3> Project name: ${project.name}</h4>
                                 <span class="project-prev-name">Owner:${project.owner.login}</span>`;
        this.projectsList.append(projectData);
    }

    showLoadBtn(show) {
        this.loadBtn.style.display = show ? 'block' : 'none';
    }
}