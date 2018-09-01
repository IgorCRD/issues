import React from 'react';
import MainPage from 'components/main-page';
import IssuesList from 'components/issues-list';
import GitHubIssues from 'containers/github-issues';

const App = () => (
  <MainPage>
    <GitHubIssues repository="facebook/react">
      {({ issues }) => issues && <IssuesList issues={issues} />}
    </GitHubIssues>
  </MainPage>
);

export default App;
