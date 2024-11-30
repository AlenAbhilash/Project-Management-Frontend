import React, { createContext, useState } from 'react';

// Create the context
export const addProjectContextResponse = createContext();
export const editProjectResponseContext = createContext();

// Create the provider component
const ContextShare = ({ children }) => {
  const [addProjectResponse, setAddProjectResponse] = useState("");
  const [editProjectResponse, setEditProjectResponse] = useState("");
  return (
    <addProjectContextResponse.Provider value={[addProjectResponse, setAddProjectResponse]}>
      <editProjectResponseContext.Provider value={[editProjectResponse, setEditProjectResponse]}>
        {children}
      </editProjectResponseContext.Provider>
    </addProjectContextResponse.Provider>
  );
};

export default ContextShare;
