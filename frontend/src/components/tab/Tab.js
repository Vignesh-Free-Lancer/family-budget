import React, { useState } from "react";
import { Tabs } from "react-bootstrap";
import "./tab.scss";

const Tab = ({ tabCustomClass, tabActive, tabLists = [] }) => {
  // State Object For Active Tab Control
  const [activeTab, setActiveTab] = useState(tabActive);

  // Event For Handling Tab Selection
  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <div className={`budget-app-tab-component ${tabCustomClass}`}>
      <Tabs
        transition={true}
        id="budget-app-tab"
        activeKey={activeTab}
        onSelect={handleTabSelect}
      >
        {tabLists &&
          tabLists.map((tab) => (
            <Tab title={tab.title} eventKey={tab.eventKey} key={tab.eventKey}>
              {tab.content}
            </Tab>
          ))}
      </Tabs>
    </div>
  );
};

export default Tab;
