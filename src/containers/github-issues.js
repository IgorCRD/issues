import React from 'react';
import PropTypes from 'prop-types';

class GitHubIssues extends React.Component {
  static propTypes = {
    repository: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
  };

  static issuesUrl = repo => `https://api.github.com/repos/${repo}/issues?per_page=20`;

  state = {
    issues: null,
    error: null,
  };

  issuesFetchController = new AbortController();

  componentDidMount() {
    const { repository } = this.props;

    fetch(GitHubIssues.issuesUrl(repository), { signal: this.issuesFetchController.signal })
      .then(resp => resp.json())
      .then((issues) => {
        this.setState({ issues });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  componentWillUnmount() {
    this.issuesFetchController.abort();
  }

  render() {
    const { issues, error } = this.state;
    const { children } = this.props;
    return children && children({ issues, error });
  }
}

export default GitHubIssues;
