import React from 'react';
import { Input } from 'antd';
import 'components/new-issue.less';

const { TextArea } = Input;

const NewIssue = () => (
  <div className="new-issue">
    <div className="flex flex-column">
      <div className="flex fields">
        <span>Title</span>
        <Input className="input-width80" placeholder="Issue title" />
      </div>
      <div className="flex fields">
        <span>Description</span>
        <TextArea
          className="input-width80"
          placeholder="Describe your problem here"
          autosize={{ minRows: 3, maxRows: 50 }}
        />
      </div>
    </div>
  </div>
);

export default NewIssue;
