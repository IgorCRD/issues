import React from 'react';
import MainPage from 'components/main-page';
import IssuesList from 'components/issues-list';
import GitHubIssues from 'containers/github-issues';

const App = () => (
  <MainPage>
    <GitHubIssues repository="facebook/react" perPage={10}>
      {({
        issues,
        total,
        currentPage,
        onPageChange,
        onTitleSearch,
        onFilterChange,
        retry,
        error,
      }) => (
        <IssuesList
          issues={issues}
          total={total}
          currentPage={currentPage}
          onPageChange={onPageChange}
          onTitleSearch={onTitleSearch}
          onFilterChange={onFilterChange}
          retry={retry}
          error={error}
        />
      )}
    </GitHubIssues>
  </MainPage>
);

export default App;
