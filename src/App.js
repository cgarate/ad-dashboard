import { useEffect, useState } from "react";
import { Box, Container, Flex, Heading, Select } from "@chakra-ui/react";
import { type } from "ramda";

import { ENDPOINT_CAMPAIGNS } from "./constants";

const App = () => {
  const [campaigns, setCampaigns] = useState([]);

  // Bring the campaign data
  useEffect(() => {
    fetch(ENDPOINT_CAMPAIGNS)
      .then((apiResponse) => {
        return apiResponse.json();
      })
      .then((data) => {
        setCampaigns(data.campaigns);
      })
      .catch((error) => {
        console.log("ERROR IN API CALL: ", error);
      });
  }, []);

  return (
    <Box as="main">
      <Flex flexDirection="column" margin="1rem 3rem">
        <Box maxWidth={["100%", "100%", "25%", "25%"]}>
          <Heading>Ad Campaign App</Heading>
          <Select
            marginTop="2rem"
            variant="flushed"
            placeholder="Select campaign"
          >
            {campaigns.map((campaign) => (
              <option
                key={`campaign-${campaign.name}-${campaign.id}`}
                value={campaign.id}
              >
                {campaign.name}
              </option>
            ))}
          </Select>
        </Box>
        <Container marginTop="3rem">Dashboard Goes here</Container>
      </Flex>
    </Box>
  );
};

export default App;
