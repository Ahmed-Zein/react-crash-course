import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AddJobPage from "./pages/AddJobPage";
import HomePage from "./pages/HomePage";
import { jobLoader, JobPage } from "./pages/JobPage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs/", {
      method: "Post",
      headers: {
        "content-typ": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    console.log(res.status);
  };
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "content-typ": "application/json",
      },
      body: JSON.stringify(job),
    });
    console.log(res.status);
  };
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    return res;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout></MainLayout>}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default App;
