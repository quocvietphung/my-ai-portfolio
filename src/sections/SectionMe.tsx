// src/sections/SectionMe.tsx
import Image from "next/image";
import { Box, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";

export default function SectionMe() {
    return (
        <Box p={6}>
            <Flex
                direction={{ base: "column", md: "row" }}
                align={{ md: "center" }}
                gap={6}
            >
                {/* Avatar square with next/image */}
                <Box
                    overflow="hidden"
                    boxSize="120px"
                    position="relative"
                    // Không bo tròn
                >
                    <Image
                        src="/assets/avatar-viet.png"
                        alt="Viet Phung"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </Box>

                {/* Info */}
                <Box>
                    <Text fontSize="2xl" fontWeight="bold">
                        Viet Phung
                    </Text>
                    <Text color="gray.600" mb={4}>
                        AI Consultant • Software Engineer
                    </Text>

                    <Wrap gap={2}>
                        {["AI", "Full-stack", "Entrepreneurship", "SaaS Builder"].map(
                            (label) => (
                                <WrapItem key={label}>
                                    <Text
                                        fontSize="sm"
                                        px={3}
                                        py={1}
                                        borderRadius="full"
                                        bg="teal.100"
                                        color="teal.800"
                                        fontWeight="medium"
                                    >
                                        {label}
                                    </Text>
                                </WrapItem>
                            )
                        )}
                    </Wrap>
                </Box>
            </Flex>

            {/* Short bio */}
            <Text mt={6} lineHeight={1.7}>
                I’m Viet – an enthusiastic software engineer who loves turning AI ideas
                into reliable products. Outside of coding, you'll find me exploring new
                SaaS business models and sharing knowledge with the community.
            </Text>
        </Box>
    );
}
