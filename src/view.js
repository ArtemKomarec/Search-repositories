export class View {
    constructor(request) {
        this.app = document.getElementById('app');
        this.title = this.createElement('h1', 'title');
        this.title.textContent = 'Search repositories';

        this.request = request;

        this.searchWrapper = this.createElement('div', 'search-line');
        this.searchField = this.createElement('input', 'search-input');
        this.searchMessage = this.createElement('span');
        this.searchWrapper.append(this.searchField);
        this.searchWrapper.append(this.searchMessage);

        this.projectsWrapper = this.createElement('div', 'projects-wrapper');
        this.projectsList = this.createElement('ul', 'projects');
        this.projectWrapper = this.createElement('div', 'project-info')
        this.projectsWrapper.append(this.projectsList);

        this.main = this.createElement('div', 'main');
        this.main.append(this.projectsWrapper);
        this.main.append(this.projectWrapper);

        this.loadBtn = this.createElement('button', 'searchBtn');
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
        projectData.addEventListener('click', () => this.showProjectData(project));
        projectData.innerHTML = `<h3> Project name: ${project.name}</h4>
                                 <span class="project-prev-name">Owner:${project.owner.login}</span>`;
                                 
        this.projectsList.append(projectData);
    }

    showProjectData(project) {
        const projectDataWrap = this.createElement('div', 'project');
        this.projectWrapper.innerHTML = '';
        projectDataWrap.innerHTML = `<h2>Project name: ${project.name}</h2
                                     <p>Has downloads: ${project.has_downloads}</p>
                                     <p>Created at: ${project.created_at}</p>
                                     <p>Forks: ${project.forks}</p>
                                     <span>Size: ${project.size} KB</span>`;
        this.projectWrapper.append(projectDataWrap);
    }

    showLoadBtn(show) {
        this.loadBtn.style.display = show ? 'block' : 'none';
    }

    showError(error) {
        this.searchMessage.textContent = ' Error: ' + error;
    }

    setCounter(message) {
        this.searchMessage.textContent = 'There are: ' + message + ' repositories';
    }
}