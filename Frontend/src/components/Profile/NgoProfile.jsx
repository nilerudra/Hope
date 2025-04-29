import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  ListItemText,
  Divider,
  IconButton,
  CircularProgress,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material"; // Import the icons
import axios from "axios";
import PostsSection from "./PostsSection";

const NgoProfile = () => {
  const [ngoInfo, setNgoInfo] = useState({});
  const [volunteerRequests, setVolunteerRequests] = useState([]);
  const [donationsData, setDonationsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const ngoId = localStorage.getItem("ngo_id");
  const [selectedTab, setSelectedTab] = useState(0);
  const [donationsDialogOpen, setDonationsDialogOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNgoData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://hope-v129.onrender.com/ngo/${ngoId}`
        );
        setNgoInfo(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching NGO data", err);
        setError("Failed to load NGO data.");
        setLoading(false);
      }
    };

    const fetchVolunteerRequests = async () => {
      try {
        const response = await axios.get(
          `https://hope-v129.onrender.com/ngo/${ngoId}/volunteer-requests`
        );
        setVolunteerRequests(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching volunteer requests", err);
        setError("Failed to load volunteer requests.");
      }
    };

    fetchNgoData();
    fetchVolunteerRequests();
  }, [ngoId]);

  const handleAcceptRequest = (requestId) => {
    // Make an API call to accept the request
    axios
      .post(`https://hope-v129.onrender.com/ngo/${ngoId}/accept-volunteer`, {
        requestId,
      })
      .then((response) => {
        alert("Volunteer request accepted!");
        window.location.reload();
        setVolunteerRequests((prevState) =>
          prevState.filter((req) => req.id !== requestId)
        );
      })
      .catch((err) => alert("Failed to accept request"));
  };

  const handleDenyRequest = (requestId) => {
    // Make an API call to deny the request
    axios
      .post(`https://hope-v129.onrender.com/ngo/${ngoId}/deny-volunteer`, {
        requestId,
      })
      .then((response) => {
        alert("Volunteer request denied!");
        window.location.reload();
        setVolunteerRequests((prevState) =>
          prevState.filter((req) => req.id !== requestId)
        );
      })
      .catch((err) => alert("Failed to deny request"));
  };

  const handleLearnMore = () => {
    if (ngoInfo.website) {
      window.open(ngoInfo.website, "_blank");
    } else {
      alert("No website available for this NGO.");
    }
  };

  const [volunteersDialogOpen, setVolunteersDialogOpen] = useState(false);
  const handleViewDonations = async () => {
    try {
      const response = await axios.get(
        `https://hope-v129.onrender.com/ngo/${ngoId}/ngodonations`
      );
      console.log(response.data);
      setDonationsData(response.data);
      setVolunteersDonationDialogOpen(true);
    } catch (error) {
      console.error("Error fetching donations", error);
      alert("Failed to fetch donations.");
    }
  };

  const handleCloseDonationsDialog = () => {
    setDonationsDialogOpen(false);
  };

  const [volunteers, setVolunteers] = useState([]);

  const [volunteersDonationDialogOpen, setVolunteersDonationDialogOpen] =
    useState(false);

  const handleVolunteer = async () => {
    try {
      const response = await axios.get(
        `https://hope-v129.onrender.com/ngo/${ngoId}/volunteers`
      );
      setVolunteers(response.data);
      setVolunteersDialogOpen(true); // Open the dialog
    } catch (error) {
      console.error("Error fetching volunteers:", error);
      alert("Failed to fetch volunteers.");
    }
  };

  const handleCloseVolunteersDialog = () => {
    setVolunteersDialogOpen(false); // Close the dialog
  };

  const handleCloseVolunteersDonationDialog = () => {
    setVolunteersDonationDialogOpen(false);
  };

  if (loading) {
    // Center the loading spinner while data is being fetched
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <p>{error}</p>;

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {ngoInfo.ngoName}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Registration Number:</strong>{" "}
                {ngoInfo.registrationNumber}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Year of Establishment:</strong>{" "}
                {new Date(ngoInfo.yearOfEstablishment).getFullYear()}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>NGO Type:</strong> {ngoInfo.typeOfNGO}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Location:</strong> {ngoInfo.city}, {ngoInfo.state},{" "}
                {ngoInfo.country}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>CEO:</strong> {ngoInfo.ceo}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Contact:</strong> {ngoInfo.contactNumber}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Email:</strong> {ngoInfo.email}
              </Typography>
              <Box mt={2} display="flex" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLearnMore}
                >
                  Website
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleViewDonations}
                >
                  View Donations
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right side: Volunteers Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Volunteers
              </Typography>
              <Container sx={{ mt: 4 }}>
                {/* Other content */}
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={handleVolunteer}
                >
                  View Volunteers
                </Button>

                {/* Dialog for Volunteers */}
                <Dialog
                  open={volunteersDialogOpen}
                  onClose={handleCloseVolunteersDialog}
                  fullWidth
                  maxWidth="sm"
                >
                  <DialogTitle>Volunteers</DialogTitle>
                  <DialogContent>
                    {volunteers.length > 0 ? (
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                Name
                              </TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                Email
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {volunteers.map((volunteer) => (
                              <TableRow key={volunteer._id}>
                                <TableCell>{volunteer.username}</TableCell>
                                <TableCell>{volunteer.email}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No volunteers available.
                      </Typography>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleCloseVolunteersDialog}
                      color="primary"
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </Container>
            </CardContent>
          </Card>

          <br />
          <Card sx={{ padding: 2, boxShadow: 3, mt: 1 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Volunteer Requests
              </Typography>
              <Grid container spacing={2}>
                {volunteerRequests.length > 0 ? (
                  volunteerRequests.map((request) => (
                    <Grid item xs={12} key={request.id}>
                      <Card sx={{ padding: 2, boxShadow: 1 }}>
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Grid item xs={8}>
                            <ListItemText
                              primary={request.userId.username}
                              secondary={`Requested on: ${new Date(
                                request.createdAt
                              ).toLocaleDateString()}`}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Box display="flex" justifyContent="flex-end">
                              <IconButton
                                color="primary"
                                onClick={() => handleAcceptRequest(request._id)}
                              >
                                <CheckCircle />
                              </IconButton>
                              <IconButton
                                color="secondary"
                                onClick={() => handleDenyRequest(request._id)}
                              >
                                <Cancel />
                              </IconButton>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                      <Divider />
                    </Grid>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary" mt={3}>
                    No pending volunteer requests.
                  </Typography>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <PostsSection ngoId={ngoId} />
      </Grid>

      {/* Donations Dialog */}

      <Dialog
        open={volunteersDonationDialogOpen}
        onClose={handleCloseVolunteersDonationDialog}
        fullWidth
        maxWidth="sm"
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Donations
          </Typography>

          {/* Display the donations in a more attractive format */}
          {donationsData.length > 0 ? (
            donationsData.map((donationGroup) => (
              <Card key={donationGroup.ngoId} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="body1">
                    <strong>Total Donations:</strong>{" "}
                    {donationGroup.totalDonations}
                  </Typography>

                  {donationGroup.donors && donationGroup.donors.length > 0 ? (
                    <TableContainer sx={{ mt: 2 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Volunteer Name
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Email
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Mobile
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Amount
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {donationGroup.donors.map((donor) => (
                            <TableRow key={donor.email}>
                              <TableCell>{donor.name}</TableCell>
                              <TableCell>{donor.email}</TableCell>
                              <TableCell>{donor.mobileNumber}</TableCell>
                              <TableCell>{donor.amount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No donors available for this NGO.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No donations available.
            </Typography>
          )}
        </CardContent>
        <DialogActions>
          <Button onClick={handleCloseVolunteersDonationDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default NgoProfile;
