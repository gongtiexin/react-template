import React, { Component } from 'react';
import PDF from './Pdf';

export default class HlPdfViewer extends Component {
  state = {
    page: 1,
    pages: 0,
  };

  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  };

  onPageComplete = (page) => {
    this.setState({ page });
  };

  handlePrevious = (page) => {
    if (page === 1) {
      return;
    }
    this.setState({ page: page - 1 });
  };

  handleNext = (page, pages) => {
    if (page === pages) {
      return;
    }
    this.setState({ page: page + 1 });
  };

  render() {
    const { pages, page } = this.state;
    return (
      <div id="pdf-view">
        <div id="pdf-header">
          <a onClick={() => this.handlePrevious(page)}>上一页</a>
          <span>{`${page}/${pages}`}</span>
          <a onClick={() => this.handleNext(page, pages)}>下一页</a>
        </div>
        <div id="pdf-body">
          <PDF
            file="/Book/2016-zen-of-akka-lambda-days.pdf"
            onDocumentComplete={this.onDocumentComplete}
            onPageComplete={this.onPageComplete}
            page={page}
          />
        </div>
      </div>
    );
  }
}
