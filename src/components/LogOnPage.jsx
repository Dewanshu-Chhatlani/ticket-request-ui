import React, { useState } from "react";
import { Tabs, Tab, Box, Container, Card, CardContent } from "@mui/material";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const LogOnPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Tabs value={tabIndex} onChange={handleChange} centered>
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>
      <Box sx={{ py: 2 }}>
        <Card variant="outlined">
          <CardContent>
            {tabIndex === 0 && (
              <TabPanel value={tabIndex} index={0}>
                <SignIn />
              </TabPanel>
            )}
            {tabIndex === 1 && (
              <TabPanel value={tabIndex} index={1}>
                <SignUp />
              </TabPanel>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default LogOnPage;
