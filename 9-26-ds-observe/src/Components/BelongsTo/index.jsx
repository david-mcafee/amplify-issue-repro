import React, { useEffect, useState } from "react";
import "../../App.css";

import { DataStore, Predicates } from "aws-amplify";
import { Project, Company, CompanyProject, Status } from "../../models";

function BelongsToComponent() {
  const [projects, setProjects] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companyProjects, setCompanyProjects] = useState([]);
  const [projectSnapshots, setProjectSnapshots] = useState([]);
  const [companySnapshots, setCompanySnapshots] = useState([]);
  const [companyProjectSnapshots, setCompanyProjectSnapshots] = useState([]);

  function onCreateProject() {
    setProjectSnapshots([]);
    const result = DataStore.save(
      new Project({
        name: `Project`,
      })
    );

    console.log(result);
    setProjects([...projects, result]);
  }

  function onCreateCompany() {
    setCompanySnapshots([]);
    const result = DataStore.save(
      new Company({
        name: `Company`,
      })
    );

    console.log(result);
    setCompanies([...companies, result]);
  }

  async function onCreateCompanyProject() {
    const [_lastCompany] = await DataStore.query(Company);
    const [_lastProject] = await DataStore.query(Project);
    setCompanyProjectSnapshots([]);

    const result = DataStore.save(
      new CompanyProject({
        name: `CompanyProject`,
        company: _lastCompany,
        companyId: _lastCompany.id,
        project: _lastProject,
        projectId: _lastProject.id,
        status: Status.REVIEWING,
      })
    );

    console.log(result);
    setCompanyProjects([...companies, result]);
  }

  function onDeleteAllProjects() {
    setProjectSnapshots([]);
    DataStore.delete(Project, Predicates.ALL);
  }

  function onDeleteAllCompanies() {
    setCompanySnapshots([]);
    DataStore.delete(Company, Predicates.ALL);
  }

  function onDeleteAllCompanyProjects() {
    setCompanyProjectSnapshots([]);
    DataStore.delete(CompanyProject, Predicates.ALL);
  }

  async function getProjects() {
    const _projects = await DataStore.query(Project);
    setProjects(_projects);
    console.log("Projects", _projects);
  }

  async function getCompanies() {
    const _companies = await DataStore.query(Company);
    setCompanies(_companies);
    console.log("Companies", _companies);
  }

  async function getCompanyProjects() {
    const _companyProject = await DataStore.query(CompanyProject);
    setCompanyProjects(_companyProject);
    console.log("CompanyProject", _companyProject);
  }

  async function updateProject() {
    setProjectSnapshots([]);
    const [originalProject] = await DataStore.query(Project);
    console.log("Original Project:", originalProject);

    try {
      const project = await DataStore.save(
        Project.copyOf(originalProject, (updated) => {
          updated.name = `Company updated ${Date.now()}`;
        })
      );

      console.log("Project updated:", project);
    } catch (error) {
      console.error("Save failed:", error);
    }
  }

  async function updateCompany() {
    setCompanySnapshots([]);
    const [originalCompany] = await DataStore.query(Company);
    console.log("Original Company:", originalCompany);

    try {
      const company = await DataStore.save(
        Project.copyOf(originalCompany, (updated) => {
          updated.name = `name ${Date.now()}`;
        })
      );

      console.log("Company updated:", company);
    } catch (error) {
      console.error("Save failed:", error);
    }
  }

  async function deleteLastProject() {
    setProjectSnapshots([]);
    const [project] = await DataStore.query(Project);
    if (!project) return;
    await DataStore.delete(project);
  }

  async function deleteLastCompany() {
    setCompanySnapshots([]);
    const [company] = await DataStore.query(Company);
    if (!company) return;
    await DataStore.delete(company);
  }

  async function deleteLastCompanyProject() {
    setCompanyProjectSnapshots([]);
    const [companyProject] = await DataStore.query(CompanyProject);
    if (!companyProject) return;
    await DataStore.delete(companyProject);
  }

  useEffect(() => {
    setProjectSnapshots([]);
    getProjects();
    getCompanies();
    getCompanyProjects();
    const projectSubscription = DataStore.observeQuery(Project).subscribe(
      (data) => {
        console.log("DATA FROM OBSERVE:", data);
        setProjectSnapshots((prev) => [...prev, data]);
      }
    );

    const companySubscription = DataStore.observeQuery(Company).subscribe(
      (data) => {
        console.log("DATA FROM OBSERVE:", data);
        setCompanySnapshots((prev) => [...prev, data]);
      }
    );

    const companyProjectSubscription = DataStore.observeQuery(
      CompanyProject
    ).subscribe((data) => {
      console.log("DATA FROM OBSERVE:", data);
      setCompanyProjectSnapshots((prev) => [...prev, data]);
    });

    return () => {
      projectSubscription.unsubscribe();
      companySubscription.unsubscribe();
      companyProjectSubscription.unsubscribe();
    };
  }, []);

  return (
    <div className="column">
      <h1>`observeQuery` test 2</h1>
      <div className="container">
        <div className="section">
          <div>Projects</div>
          <div className="buttons">
            <button onClick={getProjects}>Query</button>
            <button onClick={onCreateProject}>New</button>
            <button onClick={updateProject}>Update Last</button>
            <button onClick={deleteLastProject}>Delete Last</button>
            <button onClick={onDeleteAllProjects}>Delete All</button>
          </div>
          <pre>projects: {JSON.stringify(projects, null, 2)}</pre>
        </div>
        <div className="section">
          <div>Projects</div>
          <div className="buttons">
            <button onClick={() => setProjectSnapshots([])}>
              Delete Snapshots
            </button>
          </div>
          <pre>snapshots: {JSON.stringify(projectSnapshots, null, 2)}</pre>
        </div>
        <div className="section">
          <div>Companies</div>
          <div className="buttons">
            <button onClick={getCompanies}>Query</button>
            <button onClick={onCreateCompany}>New</button>
            <button onClick={updateCompany}>Update Last</button>
            <button onClick={deleteLastCompany}>Delete Last</button>
            <button onClick={onDeleteAllCompanies}>Delete All</button>
          </div>
          <pre>companies: {JSON.stringify(companies, null, 2)}</pre>
        </div>
        <div className="section">
          <div>Companies</div>
          <div className="buttons">
            <button onClick={() => setCompanySnapshots([])}>
              Delete Snapshots
            </button>
          </div>
          <pre>snapshots: {JSON.stringify(companySnapshots, null, 2)}</pre>
        </div>
      </div>
      <div className="container">
        <div className="section">
          <div>CompanyProject</div>
          <div className="buttons">
            <button onClick={getCompanyProjects}>Query</button>
            <button onClick={onCreateCompanyProject}>New</button>
            {/* <button onClick={updateCompanyProject}>Update Last</button> */}
            <button onClick={deleteLastCompanyProject}>Delete Last</button>
            <button onClick={onDeleteAllCompanyProjects}>Delete All</button>
          </div>
          <pre>CompanyProjects: {JSON.stringify(companyProjects, null, 2)}</pre>
        </div>
        <div className="section">
          <div>CompanyProject</div>
          <div className="buttons">
            <button onClick={() => setCompanyProjectSnapshots([])}>
              Delete Snapshots
            </button>
          </div>
          <pre>
            snapshots: {JSON.stringify(companyProjectSnapshots, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default BelongsToComponent;
