import React from 'react';
import PropTypes from 'prop-types';

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
    this.fetchData();
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
      || filters !== prevFilters
    ) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    this.issuesFetchController.abort();
  }

  fetchData = () => {
    const { repository, perPage } = this.props;
    const {
      currentPage, error, searchTitle, filters,
    } = this.state;

    if (error) return;

    fetch(GitHubIssues.issuesUrl(repository, perPage, currentPage, searchTitle, filters), {
      signal: this.issuesFetchController.signal,
    })
      .then(resp => resp.json())
      .then((resp) => {
        this.setState({
          issues: resp.items,
          total: resp.total_count,
          currentPage,
        });
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  };

  onPageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  onTitleSearch = (searchValue) => {
    this.setState({
      searchTitle: searchValue,
    });
  };

  onFilterChange = (filters) => {
    this.setState({
      filters,
    });
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
        error,
      })
    );
  }
}

export default GitHubIssues;
