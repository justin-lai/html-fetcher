import React, { PropTypes } from 'react';
import JobEntry from './JobEntry.jsx';

const JobTable = ({ jobs, updateStatus }) => (
  <table>
    <thead>
    <tr>
      <th>Job Id</th>
      <th>Action</th>
      <th>Url</th>
    </tr>
    </thead>

    <tbody>
    {
      jobs.map(job => <JobEntry key={job.jobId} job={job} updateStatus={updateStatus} />)
    }
    </tbody>
  </table>
); 

JobTable.propTypes = {
  jobs: PropTypes.array.isRequired,
  updateStatus: PropTypes.func.isRequired
}

export default JobTable;

