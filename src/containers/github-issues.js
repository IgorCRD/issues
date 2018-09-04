import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

class GitHubIssues extends React.Component {
  static propTypes = {
    repository: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    perPage: PropTypes.number,
  };

  static defaultProps = {
    perPage: 10,
  };

  static issuesUrl = (repo, perPage, page, searchTitle, filters) => {
    const state = filters && filters.state;
    return `https://api.github.com/search/issues?q=${
      searchTitle ? `${searchTitle}+` : ''
    }repo:${repo}+type:issue${searchTitle ? '+in:title' : ''}${
      state && state.length === 1 ? `+state:${state[0]}` : ''
    }&per_page=${perPage}&page=${page}`;
  };

  state = {
    issues: null,
    total: null,
    currentPage: 1,
    error: null,
    searchTitle: null,
    filters: null,
  };

  issuesFetchController = new AbortController();

  componentDidMount() {
    this.fetchIssues();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, searchTitle, filters } = this.state;
    const {
      currentPage: prevCurrentPage,
      searchTitle: prevsearchTitle,
      filters: prevFilters,
    } = prevState;

    if (
      currentPage !== prevCurrentPage
      || searchTitle !== prevsearchTitle
      || !isEqual(filters, prevFilters) // deep comparison
    ) {
      this.fetchIssues();
    }
  }

  componentWillUnmount() {
    this.issuesFetchController.abort();
  }

  fetchIssues = () => {
    const { repository, perPage } = this.props;
    const { currentPage, searchTitle, filters } = this.state;

    this.setState({
      issues: null,
      error: null,
    });

    fetch(GitHubIssues.issuesUrl(repository, perPage, currentPage, searchTitle, filters), {
      signal: this.issuesFetchController.signal,
    })
      .then((resp) => {
        if (resp.status < 200 || resp.status > 299) throw resp;
        return resp.json();
      })
      .then((resp) => {
        this.setState({
          issues: resp.items,
          total: resp.total_count,
          currentPage,
        });
      })
      .catch((err) => {
        err.json().then((error) => {
          this.setState({ error });
        });
      });
  };

  onPageChange = (page) => {
    this.setState({
      error: null,
      currentPage: page,
    });
  };

  onTitleSearch = (searchValue) => {
    this.setState({
      error: null,
      searchTitle: searchValue,
    });
  };

  onFilterChange = (filters) => {
    this.setState({
      error: null,
      filters,
    });
  };

  retry = () => {
    this.fetchIssues();
  };

  render() {
    const {
      issues, total, currentPage, error,
    } = this.state;
    const { children } = this.props;
    return (
      children
      && children({
        issues,
        total,
        currentPage,
        onPageChange: this.onPageChange,
        onTitleSearch: this.onTitleSearch,
        onFilterChange: this.onFilterChange,
        retry: this.retry,
        error,
      })
    );
  }
}

export default GitHubIssues;
