import React, { createContext, useContext, useState } from "react";

// Create LoadingContext
const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const backdropStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const boxStyles = {
    textAlign: "center",
    color: "white",
  };

  const spinnerStyles = {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(255, 255, 255, 0.3)",
    borderTop: "4px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "10px",
  };

  //   const textStyles = {
  //     color: "white",
  //     fontSize: "1.2em",
  //     margin: 0,
  //   };

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <div style={backdropStyles}>
          <div style={boxStyles}>
            <div style={spinnerStyles}></div>
            {/* <p style={textStyles}>Please Wait...</p> */}
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}

// Keyframes for spin animation
const spinAnimation = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Append the keyframes to the document
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(spinAnimation, styleSheet.cssRules.length);

// Export the useContext hook for LoadingContext
export const useLoading = () => useContext(LoadingContext);
