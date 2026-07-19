import Projects from '../components/Projects.jsx'

const projects = [
  {
    title: 'Portfolio Engine',
    hook: 'A component-driven site that renders its own data, instead of hardcoding markup.',
    tag: 'React · Vite',
    role: 'Sole developer — design, components, and deployment.',
    stack: 'React, React Router, Vite, plain CSS with custom properties.',
    outcome: 'A reusable, prop-driven multi-page site with client-side routing.',
  },
  {
    title: 'TaskFlow API',
    hook: 'A REST backend for a task manager, built on Node.js and Express with JWT auth.',
    tag: 'Node.js · MongoDB',
    role: 'Backend developer — API design and auth flow.',
    stack: 'Node.js, Express, MongoDB, JSON Web Tokens.',
    outcome: 'A documented REST API supporting create/read/update/delete task flows with per-user auth.',
  },
  {
    title: 'Churn Predictor',
    hook: 'A small ML model in Python that flags customers likely to churn, with a simple dashboard.',
    tag: 'Python · scikit-learn',
    role: 'Model author — data prep, training, and evaluation.',
    stack: 'Python, pandas, scikit-learn, a lightweight dashboard.',
    outcome: 'A classifier surfacing at-risk customers with an interpretable feature-importance view.',
  },
]

function ProjectsPage() {
  return <Projects items={projects} />
}

export default ProjectsPage
