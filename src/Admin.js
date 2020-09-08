import React from "react";

const Admin = () => {
  return (
    <div className="admin">
      <div className="admin-header">Admin Settings</div>
      <div className="settings">
        <ul>
          <li>
            Healthwise Theme
            <div className="setting-radio">
              <input type="radio" id="theme-on" name="theme" value="on" />
              <label htmlFor="theme-on">On</label>
            </div>
            <div className="setting-radio">
              <input type="radio" id="theme-off" name="theme" value="off" />
              <label htmlFor="theme-off">Off</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Admin;
