import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
    styles: {
        global: () => ({
            body: {
                bg: "",
            },
        }),
    },
    colors: {
        primary: "#1A3B4D",
    },
    textStyles: {
        h1: {
            fontSize: ['50px', '90px'],
            fontWeight: 'extrabold',
            lineHeight: '110%',
        },
        h2: {
            fontSize: ['14px'],
            fontWeight: 'semibold',
            lineHeight: '110%',
            letterSpacing: '-1%',
            color: 'rgba(26, 59, 77, 0.4)',
        },
        h3: {
            fontSize: ['50px'],
            fontWeight: 'bold',
            lineHeight: '110%',
            color: 'rgba(26, 59, 77, 0.4)',
        },
    },
});