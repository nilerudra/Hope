import React, { useState } from "react";
import CommunityList from "./CommunityList";
import ChatContainer from "./ChatContainer";
import { useMediaQuery, useTheme, Button } from "@mui/material";

export default function Community() {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is small (phone)

  const handleSelectCommunity = (userId) => {
    setSelectedCommunity(userId);
  };

  const handleBackToList = () => {
    setSelectedCommunity(null);
  };

  const styles = {
    communityContainerStyle: {
      display: "grid",
      gridTemplateColumns: isSmallScreen ? "100%" : "25% 75%", // Full width for small screens, side by side for larger screens
      margin: "10px",
      marginTop: "0px",
      color: "#2d3e54",
      height: "85vh",
      boxSizing: "border-box",
      overflow: "hidden",
    },
  };

  return (
    <div className="community-container" style={styles.communityContainerStyle}>
      {/* Show only the community list on small screens */}
      {isSmallScreen && !selectedCommunity && (
        <CommunityList onSelectCommunity={handleSelectCommunity} />
      )}

      {/* Show the back button and chat container if a community is selected */}
      {isSmallScreen && selectedCommunity && (
        <>
          <ChatContainer
            community={selectedCommunity}
            isOpen={true}
            onClose={handleBackToList}
          />
        </>
      )}

      {/* On larger screens, show both the community list and chat container side by side */}
      {!isSmallScreen && (
        <>
          <CommunityList onSelectCommunity={handleSelectCommunity} />
          <ChatContainer
            community={selectedCommunity}
            isOpen={!!selectedCommunity}
            onClose={handleBackToList}
          />
        </>
      )}
    </div>
  );
}
