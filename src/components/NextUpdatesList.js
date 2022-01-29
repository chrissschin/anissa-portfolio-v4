import * as React from "react";

const NextUpdatesList = class extends React.Component {
  render() {
    return (
      <ul className="next-updates">
        <li>
          <input type="checkbox" checked />
          <label className="documentation--label">Link Instagram</label>
        </li>
        <li>
          <input type="checkbox" disabled />
          <label className="documentation--label">Add Favicon</label>
        </li>
        <li>
          <input type="checkbox" disabled />
          <label className="documentation--label">
            Enable content editing for Services Page
          </label>
        </li>
        <li>
          <input type="checkbox" disabled />
          <label className="documentation--label">Switch url name</label>
        </li>

        <li>
          <input type="checkbox" disabled />
          <label className="documentation--label">
            Go over changes you want
          </label>
        </li>
      </ul>
    );
  }
};

export default NextUpdatesList;
