import { Box, Stack, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <Box bg="#dfd3ec" py={8} 
    bottom="0" 
    width="100%">
      <Stack direction="column" spacing={4} align="center">
        <Text fontSize="sm">
          RKSV Securities: SEBI Registration No. INZ000185137 | NSE Member Code:
          13942 | BSE Clrg Code: 6155 | CDSL: IN-DP-CDSL- 00282534 | NSDL:
          IN-DP-NSDL-11496819 | CDSL: IN-DP-CDSL- 00283831 | NSDL:
          IN-DP-NSDL-11497282 | RKSV Commodities MCX Member Code: 46510 | SEBI
          Regn. No. INZ000015837| Registered Address: 807, New Delhi House
          Barakhamba Road, Connaught Place, New Delhi- 110001. | Correspondence
          Address: RKSV/Upstox, 30th Floor, Sunshine Tower, Senapati Bapat
          Marg, Dadar (W), Mumbai, Maharashtra 400013. For any complaints email
          at complaints@rksv.in | Please ensure you carefully read the Risk
          Disclosure Document as prescribed by SEBI and our Terms of Use and
          Privacy Policy
        </Text>
        <Text fontSize="sm">
          Made with love in India | Copyrights © 2023, finservice
        </Text>
      </Stack>
    </Box>
  );
}

export default Footer;
