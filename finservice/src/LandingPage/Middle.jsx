import { Box, Heading, Text, Button,Stack, Image, Grid,Center,SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Slideshow from "./slid";
import React from 'react';

function Poster() {
    const assetData = [
        {
            title: 'Stocks',
            imageSrc: 'https://upstox.com/open-demat-account/assets/images/grow-stock.png',
    
            description: 'Invest in shares of companies and earn returns based on their performance.',
          },
          {
            title: 'IPOs',
            imageSrc: 'https://upstox.com/open-demat-account/assets/images/grow-IPOs.png',
    
            description: 'Get in on the ground floor of a company before it goes public and potentially see huge returns.',
          },
        {
            title: 'Mutual Funds',
            imageSrc: 'https://upstox.com/open-demat-account/assets/images/grow-mutual-fund.png',
            description: 'Pool your money with other investors and invest in a variety of securities.',
          },
      
      ];
    
return (
    <>
    {/* PART-1 */}

    <Box display={{base: "block", md: "flex"}} justifyContent={"center"} textAlign={"center"} m={"auto"}>
  <Box  p={10} rounded="md"  w={{base: "100%", md: "50%"}} mb={{base: 10, md: 0}}>
    <Heading as="h2" size="lg" mb={5}>
      OPEN A FREE DEMAT ACCOUNT
    </Heading>
    <Heading fontSize={{base: "xl", md: "2xl"}} mb={5}>
      Invest Right, Invest Now
    </Heading>
    <Heading mb={5}>
      Open an account today and enjoy ZERO brokerage* for 30 days
    </Heading>
    <Heading mb={5}>
      Zero commission* on Mutual Funds and IPO
    </Heading>
    <Heading mb={5}>
      ₹20* per order on Equity, F&O, Commodity and Currency
    </Heading>

    <Heading mb={5}>
     Finance Service.pvt.lmt
    </Heading>
    <Button colorScheme="teal"><Link to="/signup">Sign Up Now</Link></Button>
  </Box>
  <Box   w="50%" flex="1">
    <Image src="https://png.pngtree.com/template/20190905/ourmid/pngtree-return-of-investment-growth-investing-stock-market-golden-coin-dollar-and-image_301813.jpg" alt="error" w="100%"></Image>
  </Box>
</Box>
<br />

 {/* PART-2 */}
<Box py={10} bg="gray.50">
<Heading textAlign="center" mb={8}>BENEFITS</Heading>
<Box>
    <Text fontWeight="bold" fontSize="xl">#KhaataKholaKya - Single account for all your investing and trading needs</Text>
  </Box>
  <br/>
  <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap" >
  <Image src="https://upstox.com/open-demat-account/assets/images/benefit-2.png" alt="error" boxSize={{ base: "150px", md: "300px" }} mb={5} mr={{ base: 0, md: 5 }} />
  <Image src="https://upstox.com/open-demat-account/assets/images/benefit-1.png" alt="error" boxSize={{ base: "150px", md: "300px" }} mb={5} mr={{ base: 0, md: 5 }} />
  <Image src="https://upstox.com/open-demat-account/assets/images/benefit-3.png" alt="error" boxSize={{ base: "150px", md: "300px" }} mb={5} mr={{ base: 0, md: 5 }} />
  <Slideshow/>
  </Box>
<Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
  

  <Box>
    <Text fontWeight="bold" fontSize="xl">Quick Onboarding</Text>
    <Text>Secure onboarding process. Set up a Demat account with just PAN, Aadhaar and eKYC.</Text>
  </Box>

  <Box>
    <Text fontWeight="bold" fontSize="xl">Easy Accessibility</Text>
    <Text>Login with biometrics or mobile number and buy/sell stocks from our web, Android or iOS platforms in one click.</Text>
  </Box>

  <Box>
    <Text fontWeight="bold" fontSize="xl">Smooth Orders</Text>
    <Text>With just a toggle switch, switch between intraday or delivery orders. Enjoy GTT and AMO on Stocks and F&O orders.</Text>
  </Box>

  <Box>
    <Text fontWeight="bold" fontSize="xl">Informed Decisions</Text>
    <Text>Search stocks easily using smart lists and smart filters. Get latest news, analyse charts and find in-depth company information to make informed decisions.</Text>
  </Box>
</Grid>

</Box>


 {/* PART-3 */}
    <Box bg="gray.50" py={16}>
      <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
        <Box textAlign={{ lg: 'center' }}>
          <Heading fontSize={{ base: '4xl', sm: '5xl', lg: '6xl' }} fontWeight="extrabold" letterSpacing="tight">
            Our Pricing
          </Heading>
          <Text mt={{ base: 3, sm: 5 }} fontSize={{ base: 'lg', lg: 'xl' }} maxW={{ lg: 'xl' }} mx={{ lg: 'auto' }}>
            Flat fees, no hidden charges.
          </Text>
        </Box>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          textAlign="center"
          justify="center"
          spacing={{ base: 8, lg: 12 }}
          py={{ base: 20, md: 28 }}
        >
          <Box w={{ base: 'full', md: '2xl' }} bg="white" boxShadow={{ base: 'base', md: 'lg' }} rounded={{ md: 'xl' }}>
            <Box px={{ base: 6, lg: 10 }} py={{ base: 10, md: 16 }}>
              <Text fontWeight="bold" fontSize={{ base: 'xl', md: '2xl' }} mb={4}>
                Commissions
              </Text>
              <Text fontSize={{ base: '2xl', md: '3xl' }} color="green.500" fontWeight="semibold">
                ₹0
              </Text>
              <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.500" mt={2}>
                On investing in Mutual Funds and IPOs
              </Text>
            </Box>
          </Box>

          <Box w={{ base: 'full', md: '2xl' }} bg="white" boxShadow={{ base: 'base', md: 'lg' }} rounded={{ md: 'xl' }}>
            <Box px={{ base: 6, lg: 10 }} py={{ base: 10, md: 16 }}>
              <Text fontWeight="bold" fontSize={{ base: 'xl', md: '2xl' }} mb={4}>
                Account Maintenance
              </Text>
              <Text fontSize={{ base: '2xl', md: '3xl' }} color="green.500" fontWeight="semibold">
                ₹20
              </Text>
              <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.500" mt={2}>
                To maintain your Demat Account*
              </Text>
            </Box>
          </Box>

          <Box w={{ base: 'full', md: '2xl' }} bg="white" boxShadow={{ base: 'base', md: 'lg' }} rounded={{ md: 'xl' }}>
            <Box px={{ base: 6, lg: 10 }} py={{ base: 10, md: 16 }}>
              <Text fontWeight="bold" fontSize={{ base: 'xl', md: '2xl' }} mb={4}>
                Brokerage
              </Text>
              <Text fontSize={{ base: '2xl', md: '3xl' }} color="green.500" fontWeight="semibold">
              ₹0
              </Text>
              <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.500" mt={2}>
              On Equity, F&O, Commodity and Currency orders
              </Text>
              </Box>
              </Box>
              <Box w={{ base: 'full', md: '2xl' }} bg="white" boxShadow={{ base: 'base', md: 'lg' }} rounded={{ md: 'xl' }}>
        <Box px={{ base: 6, lg: 10 }} py={{ base: 10, md: 16 }}>
          <Text fontWeight="bold" fontSize={{ base: 'xl', md: '2xl' }} mb={4}>
            Account Opening
          </Text>
          <Text fontSize={{ base: '2xl', md: '3xl' }} color="green.500" fontWeight="semibold">
            View Pricing
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.500" mt={2}>
            To open a Demat + Trading account
          </Text>
        </Box>
      </Box>
    </Stack>
  </Box>
</Box>
   {/* PART-4 */}
<Box>
<Box py={16} bg="gray.50">
      <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
        <Box textAlign={{ lg: 'center' }}>
          <Heading fontSize={{ base: '4xl', sm: '5xl', lg: '6xl' }} fontWeight="extrabold" letterSpacing="tight">
            Asset Classes
          </Heading>
          <Text mt={{ base: 3, sm: 5 }} fontSize={{ base: 'lg', lg: 'xl' }} maxW={{ lg: 'xl' }} mx={{ lg: 'auto' }}>
            Diversify your portfolio by investing in different asset classes.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={16}>
          {assetData.map((data) => (
            <Box key={data.title} bg="white" borderRadius="xl" boxShadow="base" overflow="hidden">
              <Center py={8} bg="gray.100">
                <Image src={data.imageSrc} alt={data.title} />
              </Center>
              <Box p={8}>
                <Heading fontSize="2xl" fontWeight="bold" mb={4}>
                  {data.title}
                </Heading>
                <Text fontSize="lg" color="gray.600">
                  {data.description}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
</Box>
   {/* PART-5 */}


<Box py={6} bg="gray.50">
<Box textAlign="center">
<Button  color="white" fontSize={"26px"} bg={"#39305d"} > <Link to="/invest">Start Investing</Link> </Button>
<br />
<br />
<Text fontSize="lg">Open an account today and enjoy ZERO brokerage* for 30 days</Text>
<Text fontSize="lg">Zero commission* on Mutual Funds and IPO</Text>
<Text fontSize="lg">₹20* per order on Equity, F&O, Commodity and Currency</Text>
</Box>
</Box>






</>
);
}

export default Poster;